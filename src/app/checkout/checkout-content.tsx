'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Shield, CheckCircle } from 'lucide-react';

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get('tipo') || 'a1-pf';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf_cnpj: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      // 4. Criar preferência no Mercado Pago
      const mpResponse = await fetch('/api/mercado-pago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          preco: cert.preco,
          cliente: formData,
          codigoPedido: pedido.id,
        }),
      });

      const data = await mpResponse.json();

      if (data.init_point) {
        const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

        if (!publicKey) {
          console.error('Chave pública do Mercado Pago não configurada');
          window.location.href = data.init_point;
          return;
        }

        const waitForMercadoPago = () => {
          return new Promise((resolve) => {
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

        const mpLoaded = await waitForMercadoPago();

        if (mpLoaded) {
          try {
            const mp = new (window as any).MercadoPago(publicKey);

            mp.checkout({
              preference: {
                id: data.id,
              },
              autoOpen: true,
            });
          } catch (mpError) {
            console.error('Erro ao inicializar Mercado Pago:', mpError);
            window.location.href = data.init_point;
          }
        } else {
          console.warn('Mercado Pago não carregou, redirecionando para init_point');
          window.location.href = data.init_point;
        }
      } else {
        alert('Erro ao processar pagamento. Tente novamente.');
      }
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
          {/* Form */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-black mb-2">Finalizar Compra</h1>
            <p className="text-slate-400 mb-8">Preencha seus dados para continuar</p>

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
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white py-4 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50"
              >
                {loading && <Loader2 size={20} className="animate-spin" />}
                {loading ? 'Processando...' : 'Ir para Pagamento'}
              </button>
            </form>
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
