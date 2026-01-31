'use client';

import Link from 'next/link';
import { Clock, MessageCircle, ArrowRight } from 'lucide-react';

export default function PendingPage() {
  const whatsappNumber = '5511987756034';
  const whatsappMessage = 'Olá! Meu pagamento está pendente e gostaria de acompanhar.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/50 animate-spin" style={{ animationDuration: '3s' }}>
            <Clock size={48} className="text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black">Pagamento Pendente</h1>
          <p className="text-slate-300 text-lg">
            Seu pagamento está sendo processado. Isso pode levar alguns minutos. Você receberá uma confirmação por email em breve.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-2xl p-6 text-left space-y-3">
          <p className="font-bold text-white flex items-center gap-2">
            <Clock size={20} className="text-amber-400" />
            Informações
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-xs font-bold text-amber-400">⏱</span>
              Aguarde a confirmação por email
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-xs font-bold text-amber-400">⏱</span>
              Pode levar até 24 horas
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-xs font-bold text-amber-400">⏱</span>
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
