'use client';

import Link from 'next/link';
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const [codigoPedido, setCodigoPedido] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const whatsappNumber = '5511992177044';
  const whatsappMessage = 'Olá! Realizei uma compra e gostaria de acompanhar meu certificado.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    // Recuperar dados da sessão ou localStorage
    let pedidoId = '';
    const pedidoData = localStorage.getItem('pedidoAtual');
    if (pedidoData) {
      const { id } = JSON.parse(pedidoData);
      pedidoId = id;
      setCodigoPedido(id);
      localStorage.removeItem('pedidoAtual');
    }
    setLoading(false);

    // Google Ads Conversion Tracking - Dispara imediatamente ao carregar a página
    if (typeof window !== 'undefined' && (window as any).gtag) {
      console.log('📊 Enviando evento de conversão para Google Ads:', {
        'send_to': 'AW-17921729189/OwcTCMvx5vkbEKXF3-FC',
        'value': 1.0,
        'currency': 'BRL',
        'transaction_id': pedidoId || 'direct_access',
      });
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17921729189/OwcTCMvx5vkbEKXF3-FC',
        'value': 1.0,
        'currency': 'BRL',
        'transaction_id': pedidoId || 'direct_access',
      });
    } else {
      console.warn('⚠️ gtag não disponível ou window undefined');
    }
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
            Seu pagamento foi processado com sucesso. Você receberá um email com instruções para agendar sua videoconferência de emissão do certificado digital.
          </p>
          
          {codigoPedido && (
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 mt-4">
              <p className="text-slate-400 text-sm mb-2">Seu Código de Pedido:</p>
              <code className="text-cyan-400 font-mono font-bold text-lg">{codigoPedido}</code>
              <p className="text-slate-400 text-xs mt-2">Guarde este código para acompanhar seu pedido</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-500/30 rounded-2xl p-6 text-left space-y-3">
          <p className="font-bold text-white flex items-center gap-2">
            <CheckCircle size={20} className="text-emerald-400" />
            Próximos passos
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400">1</span>
              Verifique seu email (inclusive spam)
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400">2</span>
              Siga as instruções para emitir o certificado
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400">3</span>
              Dúvidas? Fale conosco via WhatsApp
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
