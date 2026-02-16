'use client';

import Link from 'next/link';
import { AlertCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function ErrorPage() {
  const whatsappNumber = '5511987756034';
  const whatsappMessage = 'Olá! Tive um problema ao tentar realizar meu pagamento.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    // Google Ads - Purchase Error
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase_error', {
        'currency': 'BRL',
        'value': 0
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50">
            <AlertCircle size={48} className="text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black">Pagamento Não Processado</h1>
          <p className="text-slate-300 text-lg">
            Desculpe, houve um problema ao processar seu pagamento. Por favor, tente novamente ou entre em contato conosco.
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-rose-600/10 border border-red-500/30 rounded-2xl p-6 text-left space-y-3">
          <p className="font-bold text-white flex items-center gap-2">
            <AlertCircle size={20} className="text-red-400" />
            O que fazer agora
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs font-bold text-red-400">!</span>
              Verifique seus dados de pagamento
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs font-bold text-red-400">!</span>
              Tente novamente
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs font-bold text-red-400">!</span>
              Ou fale conosco via WhatsApp
            </li>
          </ul>
        </div>

        <div className="space-y-3 pt-4">
          <Link
            href="/checkout?tipo=a1-pf"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50"
          >
            Tentar Novamente
            <ArrowRight size={20} />
          </Link>

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
            className="w-full border-2 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50 py-4 rounded-xl font-bold transition duration-300"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
