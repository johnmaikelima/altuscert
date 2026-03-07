'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from '@/lib/constants';

export function Header() {
  const whatsappUrl = `https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os certificados digitais.')}`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          CertDigital
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#produtos" className="text-gray-700 hover:text-blue-600 transition">Produtos</Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition flex items-center gap-2">
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </nav>
    </header>
  );
}
