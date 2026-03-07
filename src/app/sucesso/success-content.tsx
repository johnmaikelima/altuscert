'use client';

import Link from 'next/link';
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const [codigoPedido, setCodigoPedido] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const whatsappNumber = '5511987756034';
  const getWhatsappMessage = () => {
    if (codigoPedido) {
      return `Olá! Meu pagamento do pedido #${codigoPedido} foi confirmado. Gostaria de dar continuidade ao processo do certificado digital.`;
    }
    return 'Olá! Meu pagamento foi confirmado. Gostaria de dar continuidade ao processo do certificado digital.';
  };
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getWhatsappMessage())}`;

  useEffect(() => {
    // Recuperar dados da sessão ou localStorage
    let pedidoId = '';
    let valorPedido = 85.00;
    let tipoPedido = 'a1-pf';
    let nomeProduto = 'Certificado Digital A1 PF';
    
    const pedidoData = localStorage.getItem('pedidoAtual');
    if (pedidoData) {
      const pedido = JSON.parse(pedidoData);
      pedidoId = pedido.id;
      valorPedido = pedido.preco || 85.00;
      tipoPedido = pedido.tipo || 'a1-pf';
      nomeProduto = pedido.tipo === 'a1-pj' ? 'Certificado Digital A1 PJ' : 'Certificado Digital A1 PF';
      
      setCodigoPedido(pedido.id);
      localStorage.removeItem('pedidoAtual');
    }
    setLoading(false);

    // Google Analytics Conversion Tracking
    const trackConversion = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        const conversionData = {
          'event': 'purchase',
          'value': valorPedido,
          'currency': 'BRL',
          'transaction_id': pedidoId || 'direct_access',
          'items': [
            {
              'item_id': tipoPedido,
              'item_name': nomeProduto,
              'price': valorPedido,
              'quantity': 1,
            }
          ]
        };
        
        console.log('📊 Enviando evento de conversão para Google Analytics:', conversionData);
        (window as any).gtag('event', 'purchase', conversionData);
        
        // Também disparar para dataLayer (GTM)
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push(conversionData);
          console.log('📊 Evento enviado para dataLayer (GTM)');
        }
        
        console.log('✅ Evento de compra disparado com sucesso');
      } else {
        console.warn('⚠️ gtag não disponível ainda, tentando novamente em 1000ms');
        setTimeout(trackConversion, 1000);
      }
    };

    // Disparar conversão após um pequeno delay para garantir que gtag está pronto
    setTimeout(trackConversion, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 animate-pulse">
            <CheckCircle size={48} className="text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black">Pagamento Confirmado!</h1>
          <p className="text-slate-300 text-lg">
            Seu pagamento foi processado com sucesso! 🎉
          </p>
          
          {codigoPedido && (
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 mt-4">
              <p className="text-slate-400 text-sm mb-2">Seu Código de Pedido:</p>
              <code className="text-cyan-400 font-mono font-bold text-lg">{codigoPedido}</code>
              <p className="text-slate-400 text-xs mt-2">Guarde este código para acompanhar seu pedido</p>
            </div>
          )}
        </div>

        {/* Destaque para WhatsApp */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <MessageCircle size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">Importante!</p>
              <p className="text-yellow-200 text-sm">Ação necessária</p>
            </div>
          </div>
          <p className="text-slate-200 text-base leading-relaxed">
            Para dar continuidade ao processo de emissão do seu certificado digital, é <strong className="text-yellow-300">necessário entrar em contato conosco pelo WhatsApp</strong>.
          </p>
          <p className="text-slate-300 text-sm">
            Se você ainda não entrou em contato, clique no botão abaixo para iniciar a conversa:
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-500/30 rounded-2xl p-6 text-left space-y-3">
          <p className="font-bold text-white flex items-center gap-2">
            <CheckCircle size={20} className="text-emerald-400" />
            Próximos passos
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0 mt-0.5">1</span>
              <span>Entre em contato pelo WhatsApp (botão abaixo)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0 mt-0.5">2</span>
              <span>Verifique seu email com os detalhes do pedido</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0 mt-0.5">3</span>
              <span>Siga as instruções da nossa equipe para emitir o certificado</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50"
          >
            <MessageCircle size={20} />
            Falar no WhatsApp
          </a>

          <Link
            href="/"
            className="w-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 py-4 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2"
          >
            Voltar ao Início
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
