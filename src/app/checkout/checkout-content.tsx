'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Shield, CheckCircle, QrCode, CreditCard } from 'lucide-react';

interface ClienteData {
  nome: string;
  email: string;
  telefone: string;
  cpf_cnpj: string;
}

// Função para traduzir motivos de rejeição do Mercado Pago
const getRejectReason = (statusDetail: string): string => {
  const reasons: { [key: string]: string } = {
    'cc_rejected_bad_filled_card_number': 'Número do cartão inválido. Verifique os dados.',
    'cc_rejected_bad_filled_date': 'Data de validade inválida.',
    'cc_rejected_bad_filled_other': 'Dados do cartão incorretos. Verifique e tente novamente.',
    'cc_rejected_bad_filled_security_code': 'Código de segurança (CVV) inválido.',
    'cc_rejected_blacklist': 'Cartão não autorizado. Entre em contato com seu banco.',
    'cc_rejected_call_for_authorize': 'Pagamento não autorizado. Entre em contato com seu banco.',
    'cc_rejected_card_disabled': 'Cartão desabilitado. Entre em contato com seu banco.',
    'cc_rejected_card_error': 'Erro no cartão. Tente outro cartão.',
    'cc_rejected_duplicated_payment': 'Pagamento duplicado. Aguarde alguns minutos.',
    'cc_rejected_high_risk': 'Pagamento recusado por segurança. Tente outro cartão ou use PIX.',
    'cc_rejected_insufficient_amount': 'Saldo insuficiente. Tente outro cartão.',
    'cc_rejected_invalid_installments': 'Número de parcelas inválido.',
    'cc_rejected_max_attempts': 'Limite de tentativas excedido. Tente novamente mais tarde.',
    'cc_rejected_other_reason': 'Pagamento não autorizado. Tente outro cartão ou use PIX.',
  };
  
  return reasons[statusDetail] || 'Pagamento recusado. Tente outro cartão ou use PIX.';
};

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get('tipo') || 'a1-pf';
  const [loading, setLoading] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'payment'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [pedidoId, setPedidoId] = useState<string | null>(null);
  const [clienteSnapshot, setClienteSnapshot] = useState<ClienteData | null>(null);
  const [pixData, setPixData] = useState<{ qr_code: string; qr_code_base64: string } | null>(null);
  const [pixLoading, setPixLoading] = useState(false);
  const cardPaymentBrickRef = useRef<any>(null);
  const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || '';
  const [formData, setFormData] = useState<ClienteData>({
    nome: '',
    email: '',
    telefone: '',
    cpf_cnpj: '',
  });

  // Debug: verificar se a chave pública está configurada
  useEffect(() => {
    console.log('🔑 Public Key configurada:', publicKey ? `Sim (${publicKey.substring(0, 15)}...)` : 'NÃO');
  }, [publicKey]);

  const certificados = {
    'a1-pj': {
      nome: 'Certificado A1 PJ',
      preco: 89.90,
      descricao: 'Para Pessoas Jurídicas',
    },
    'a1-pf': {
      nome: 'Certificado A1 PF',
      preco: 85.00,
      descricao: 'Para Pessoas Físicas',
    },
  };

  const cert = certificados[tipo as keyof typeof certificados] || certificados['a1-pf'];

  useEffect(() => {
    return () => {
      if (cardPaymentBrickRef.current) {
        cardPaymentBrickRef.current.unmount();
      }
    };
  }, []);

  useEffect(() => {
    const loadPayment = async () => {
      if (checkoutStep === 'payment' && paymentMethod === 'card' && clienteSnapshot && pedidoId) {
        await renderCardPaymentBrick(cert.preco, clienteSnapshot, pedidoId);
      }
    };
    loadPayment();
  }, [checkoutStep, paymentMethod, clienteSnapshot, cert.preco, pedidoId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const waitForMercadoPago = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window !== 'undefined' && (window as any).MercadoPago) {
        resolve(true);
      } else {
        const checkInterval = setInterval(() => {
          if ((window as any).MercadoPago) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          resolve(false);
        }, 5000);
      }
    });
  };

  const generatePixPayment = async () => {
    if (!pedidoId || !clienteSnapshot) return;

    setPixLoading(true);
    setPaymentMessage('Gerando código PIX...');

    try {
      const response = await fetch('/api/mercado-pago/create-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pedidoId,
          email: clienteSnapshot.email,
          nome: clienteSnapshot.nome,
          cpf_cnpj: clienteSnapshot.cpf_cnpj,
          amount: cert.preco,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setPaymentMessage('Erro ao gerar PIX. Tente novamente.');
        return;
      }

      setPixData({
        qr_code: data.qr_code,
        qr_code_base64: data.qr_code_base64,
      });
      setPaymentMessage('Escaneie o QR Code ou copie o código PIX abaixo');

      // Iniciar polling para verificar status do pagamento
      startPaymentPolling();
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      setPaymentMessage('Erro ao gerar PIX. Tente novamente.');
    } finally {
      setPixLoading(false);
    }
  };

  const startPaymentPolling = () => {
    const pollingInterval = setInterval(async () => {
      if (!pedidoId) return;

      try {
        const response = await fetch(`/api/pedidos/${pedidoId}`);
        if (response.ok) {
          const pedido = await response.json();
          
          if (pedido.status === 'confirmado') {
            clearInterval(pollingInterval);
            setPaymentMessage('Pagamento confirmado! Redirecionando...');
            setTimeout(() => {
              window.location.href = '/sucesso';
            }, 1500);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar status do pedido:', error);
      }
    }, 3000); // Verificar a cada 3 segundos

    // Limpar polling após 10 minutos
    setTimeout(() => {
      clearInterval(pollingInterval);
    }, 600000);
  };

  const renderCardPaymentBrick = async (
    amount: number,
    clienteData: ClienteData,
    currentPedidoId: string
  ) => {
    if (!publicKey) {
      alert('Chave pública do Mercado Pago não configurada.');
      return;
    }

    const mpLoaded = await waitForMercadoPago();
    if (!mpLoaded) {
      setPaymentMessage('Erro ao carregar Mercado Pago. Tente novamente.');
      return;
    }

    try {
      const mp = new (window as any).MercadoPago(publicKey, { locale: 'pt-BR' });
      const bricksBuilder = mp.bricks();

      if (cardPaymentBrickRef.current) {
        cardPaymentBrickRef.current.unmount();
      }

      cardPaymentBrickRef.current = await bricksBuilder.create('cardPayment', 'card-payment-brick-container', {
        initialization: {
          amount,
        },
        callbacks: {
          onReady: () => {
            setPaymentMessage('Preencha os dados do cartão abaixo');
          },
          onSubmit: (cardFormData: any) => {
            setPaymentMessage('Processando pagamento...');
            return new Promise(async (resolve, reject) => {
              try {
                const response = await fetch('/api/mercado-pago/process-payment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    ...cardFormData,
                    pedidoId: currentPedidoId,
                    tipo,
                    payer: {
                      email: clienteData.email,
                      identification: {
                        type: tipo === 'a1-pj' ? 'CNPJ' : 'CPF',
                        number: clienteData.cpf_cnpj,
                      },
                    },
                  }),
                });

                const paymentResult = await response.json();

                if (!response.ok) {
                  setPaymentMessage('❌ Pagamento não autorizado. Verifique os dados do cartão ou tente outra forma de pagamento.');
                  reject(paymentResult);
                  return;
                }

                if (paymentResult.status === 'approved') {
                  setPaymentMessage('✅ Pagamento aprovado! Redirecionando...');
                  resolve(paymentResult);
                  setTimeout(() => {
                    window.location.href = '/sucesso';
                  }, 1500);
                } else if (paymentResult.status === 'pending' || paymentResult.status === 'in_process') {
                  setPaymentMessage('⏳ Pagamento em análise. Você receberá um email com a confirmação.');
                  resolve(paymentResult);
                } else if (paymentResult.status === 'rejected') {
                  // Pagamento rejeitado - mostrar mensagem e sugerir PIX
                  const rejectionReason = getRejectReason(paymentResult.status_detail);
                  setPaymentMessage(`❌ ${rejectionReason}`);
                  reject(paymentResult);
                  
                  // Mostrar alerta com opção de usar PIX
                  setTimeout(() => {
                    if (confirm('Deseja tentar pagar com PIX? O pagamento é instantâneo e mais seguro.')) {
                      setPaymentMethod('pix');
                      generatePixPayment();
                    }
                  }, 1000);
                } else {
                  setPaymentMessage('❌ Pagamento recusado. Tente outro cartão ou use PIX.');
                  reject(paymentResult);
                }
              } catch (error) {
                console.error('Erro ao processar pagamento:', error);
                setPaymentMessage('Erro ao processar pagamento. Tente novamente.');
                reject(error);
              }
            });
          },
          onError: (error: any) => {
            console.error('Erro no Card Payment Brick:', error);
            setPaymentMessage('Erro ao carregar formulário de cartão.');
          },
        },
      });
    } catch (error) {
      console.error('Erro ao renderizar Card Payment Brick:', error);
      setPaymentMessage('Erro ao carregar formulário de cartão.');
    }
  };

  const selectPaymentMethod = (method: 'pix' | 'card') => {
    setPaymentMethod(method);
    setPaymentMessage(null);
    
    if (method === 'pix' && !pixData) {
      generatePixPayment();
    }
  };

  const copyPixCode = () => {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      alert('Código PIX copiado!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Google Ads - Begin Checkout
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        'items': [
          {
            'item_id': tipo,
            'item_name': cert.nome,
            'item_category': 'Certificado Digital',
            'price': cert.preco,
            'currency': 'BRL',
            'quantity': 1
          }
        ],
        'value': cert.preco,
        'currency': 'BRL'
      });
    }

    try {
      // 1. Criar pedido no sistema
      const pedidoResponse = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          preco: cert.preco,
          cliente: formData,
          status: 'pendente',
        }),
      });

      const pedido = await pedidoResponse.json();
      setPedidoId(pedido.id);

      // 2. Enviar email com código do pedido
      await fetch('/api/email/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          nome: formData.nome,
          codigoPedido: pedido.id,
          tipo,
          preco: cert.preco,
        }),
      });

      // 3. Salvar código do pedido no localStorage para exibir na página de sucesso
      localStorage.setItem('pedidoAtual', JSON.stringify({ id: pedido.id }));

      // 4. Ir para seleção de pagamento
      setClienteSnapshot(formData);
      setCheckoutStep('payment');
      setPaymentMessage('Escolha a forma de pagamento');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition">
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form / Payment */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-black mb-2">Finalizar Compra</h1>
            <p className="text-slate-400 mb-8">
              {checkoutStep === 'form'
                ? 'Preencha seus dados para continuar'
                : 'Revise os dados e conclua o pagamento abaixo'}
            </p>

            {checkoutStep === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Info */}
                <div className="bg-blue-900/20 border border-blue-500/50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">Pagamento seguro no próprio site</p>
                      <p className="text-xs text-slate-400">Google Pay, Cartão, PIX, Boleto e mais</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition"
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {tipo === 'a1-pj' ? 'CNPJ' : 'CPF'}
                  </label>
                  <input
                    type="text"
                    name="cpf_cnpj"
                    value={formData.cpf_cnpj}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition"
                    placeholder={tipo === 'a1-pj' ? '00.000.000/0000-00' : '000.000.000-00'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white py-4 rounded-xl font-bold transition duração-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50"
                >
                  {loading && <Loader2 size={20} className="animate-spin" />}
                  {loading ? 'Processando...' : 'Ir para Pagamento'}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-blue-900/20 border border-blue-500/50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">Pedido #{pedidoId}</p>
                      <p className="text-xs text-slate-400">Escolha a forma de pagamento</p>
                    </div>
                  </div>
                </div>

                {/* Seleção de Método de Pagamento */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => selectPaymentMethod('pix')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50'
                    }`}
                  >
                    <QrCode size={48} className="mx-auto mb-3 text-cyan-400" />
                    <div className="font-bold text-lg">PIX</div>
                  </button>

                  <button
                    onClick={() => selectPaymentMethod('card')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50'
                    }`}
                  >
                    <CreditCard size={48} className="mx-auto mb-3 text-cyan-400" />
                    <div className="font-bold text-lg">Cartão</div>
                  </button>
                </div>

                {paymentMessage && (
                  <p className="text-sm text-slate-300 text-center">{paymentMessage}</p>
                )}

                {/* Container PIX */}
                {paymentMethod === 'pix' && (
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                    {pixLoading ? (
                      <div className="text-center py-12">
                        <Loader2 size={48} className="animate-spin mx-auto mb-4 text-cyan-400" />
                        <p className="text-slate-300">Gerando código PIX...</p>
                      </div>
                    ) : pixData ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <p className="text-slate-300 mb-4">Escaneie o QR Code com o app do seu banco</p>
                          <div className="bg-white p-4 rounded-xl inline-block">
                            <img
                              src={`data:image/png;base64,${pixData.qr_code_base64}`}
                              alt="QR Code PIX"
                              className="w-64 h-64"
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <strong className="text-white">OU</strong>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Copie o código PIX
                          </label>
                          <textarea
                            value={pixData.qr_code}
                            readOnly
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white font-mono text-xs"
                          />
                          <button
                            onClick={copyPixCode}
                            className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-bold transition"
                          >
                            Copiar Código PIX
                          </button>
                        </div>

                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                          <p className="text-sm text-emerald-300">
                            <CheckCircle size={16} className="inline mr-2" />
                            Após confirmar o PIX, você será redirecionado automaticamente.
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Container Cartão */}
                {paymentMethod === 'card' && (
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                    <div
                      id="card-payment-brick-container"
                      className="min-h-[400px]"
                    />
                  </div>
                )}

                <p className="text-xs text-slate-400 text-center">
                  Pagamento 100% seguro via Mercado Pago
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-700/50">
                <div>
                  <p className="text-slate-400 text-sm">{cert.descricao}</p>
                  <p className="text-lg font-semibold text-white">{cert.nome}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-semibold text-white">R$ {cert.preco.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">R$ {cert.preco.toFixed(2)}</span>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 space-y-3">
                <p className="font-semibold text-white flex items-center gap-2">
                  <Shield size={18} className="text-cyan-400" />
                  Informações importantes
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-400" />
                    Pagamento seguro via Mercado Pago
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-400" />
                    Válido por 1 ano
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-400" />
                    Suporte técnico incluído
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
