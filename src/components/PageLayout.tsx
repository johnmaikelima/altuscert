'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const whatsappNumber = '5511992177044';
  const whatsappMessage = 'Olá! Gostaria de saber mais sobre os certificados digitais.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M380.9 97.1C339 55.2 283.2 32 224.1 32c-113.7 0-206 92.3-206 206 0 36.2 9.5 71.5 27.6 102.8L4 480l142.3-40.1c29 15.9 61.7 24.8 97.7 24.8h.1c113.6 0 206-92.3 206-206 0-59-23.2-114.9-65.2-156.5zM224.1 383.5c-28.7 0-56.7-7.6-81-22.1l-5.8-3.6-84.3 23.7 22.5-81.3-3.7-5.9C80 273.4 72 245.6 72 215.7c0-83.3 67.6-150.9 150.9-150.9 40.3 0 78.1 15.7 106.6 44.2 28.4 28.4 44.1 66.2 44.1 106.5 0 83.3-67.6 150.9-150.9 150.9zm81.5-111.4c-4.5-2.3-26.7-13.2-30.9-14.7-4.2-1.5-7.3-2.3-10.4 2.3-3 4.5-11.7 14.7-14.4 17.7-2.7 3-5.5 3.4-10 1.1-4.5-2.3-19-7-36.2-22.2-13.4-12-22.4-26.8-25-31.4-2.6-4.5-.3-6.9 1.9-9.1 1.9-1.9 4.2-5 6.3-7.5 2.1-2.4 2.8-4.5 4.2-7.4 1.3-3 0.7-5.6-.4-7.9-1.1-2.3-10.4-25.1-14.3-34.4-3.7-8.9-7.5-7.7-10.4-7.8-2.7-.1-5.8-.1-8.9-.1-3 0-7.9 1.1-12 5.6-4.2 4.5-16.1 15.7-16.1 38.3 0 22.6 16.5 44.5 18.8 47.5 2.3 3 32.5 49.7 78.8 68.4 53.6 22.2 53.6 14.8 63.2 13.8 9.7-1 30.9-12.6 35.3-24.8 4.4-12.2 4.4-22.6 3.1-24.8-1.3-2.3-4.7-3.7-9.1-6z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white text-gray-900 border-b border-slate-200 backdrop-blur">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="hover:opacity-90 transition">
            <div className="h-14 flex items-center justify-center">
              <Image
                src="/img/novologo.png"
                alt="Altus Certificados Logo"
                width={280}
                height={110}
                className="h-12 w-auto"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex gap-2 items-center">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
            >
              Home
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => setProductDropdownOpen(true)}
              onMouseLeave={() => setProductDropdownOpen(false)}
            >
              <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition flex items-center gap-1">
                Produtos
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div className={`absolute mt-0 w-48 rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-150 z-50 pt-2 ${productDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <Link href="/produtos/a1-pj" className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-100">
                  Certificado A1 PJ
                </Link>
                <Link href="/produtos/a1-pf" className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-100">
                  Certificado A1 PF
                </Link>
              </div>
            </div>
            <Link
              href="/seja-parceiro"
              className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
            >
              Seja Parceiro
            </Link>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-lg shadow-emerald-300/70"
            >
              WhatsApp
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-white/80 hover:bg-white rounded-full border border-slate-200 shadow transition">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-lg shadow-emerald-300/70"
            >
              WhatsApp
            </a>
          </div>
        </nav>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <div className="space-y-2">
                <p className="px-4 py-2 text-gray-700 font-semibold">Produtos</p>
                <Link href="/produtos/a1-pj" className="block px-8 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>
                  Certificado A1 PJ
                </Link>
                <Link href="/produtos/a1-pf" className="block px-8 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>
                  Certificado A1 PF
                </Link>
              </div>
              <Link href="/seja-parceiro" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>
                Seja Parceiro
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold text-center">
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Floating WhatsApp Button - Desktop Only */}
      <div className="hidden md:fixed md:bottom-6 md:right-6 md:z-50 md:flex flex-col items-center gap-3 text-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-20 w-20 overflow-hidden rounded-full bg-white shadow-[0_15px_30px_rgba(15,23,42,0.25)] transition-transform duration-300 hover:scale-105"
        >
          <Image src="/img/mascote.webp" alt="Mascote" fill sizes="80px" className="object-cover" />
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full rounded-full bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-3 text-white font-semibold tracking-wide shadow-[0_20px_35px_rgba(16,185,129,0.35)] transition hover:translate-y-0.5 hover:brightness-110"
        >
          Comprar pelo WhatsApp
        </a>
      </div>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Altus Certificados</h3>
              <p className="text-sm text-gray-400">Emissão de certificados digitais A1 com segurança, transparência e profissionalismo.</p>
              <div className="space-y-2 text-sm">
                <p><strong>ALTUSTEC LTDA</strong></p>
                <p>CNPJ: 27.111.744/0001-30</p>
                <p>Estrada dos Vados, 551</p>
                <p>JD Alamo - Guarulhos, SP</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-white">Contato</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong><br />
                  <a href="mailto:altuscertificados@gmail.com" className="text-blue-400 hover:text-blue-300 transition">
                    altuscertificados@gmail.com
                  </a>
                </p>
                <p>
                  <strong>WhatsApp:</strong><br />
                  <a href="https://wa.me/5511987756034" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                    (11) 98775-6034
                  </a>
                  <br />
                  <a href="https://wa.me/5511992177044" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                    (11) 99217-7044
                  </a>
                </p>
                <p>
                  <strong>Horário:</strong><br />
                  Seg-Sex: 09h às 17h<br />
                  Sab-Dom: Fechado
                </p>
              </div>
            </div>

            {/* Other Information */}
            <div className="space-y-4">
              <h3 className="font-bold text-white">Outras Informações</h3>
              <div className="space-y-2 text-sm">
                <Link href="/renovacao" className="text-gray-400 hover:text-blue-400 transition block">
                  Renovação
                </Link>
                <Link href="/formas-pagamento" className="text-gray-400 hover:text-blue-400 transition block">
                  Formas de Pagamento
                </Link>
                <Link href="/minha-conta" className="text-gray-400 hover:text-blue-400 transition block">
                  Minha Conta
                </Link>
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <h3 className="font-bold text-white">Políticas</h3>
              <div className="space-y-2 text-sm">
                <Link href="/politica-trocas-devolucoes" className="text-gray-400 hover:text-blue-400 transition block">
                  Política de Trocas e Devoluções
                </Link>
                <Link href="/politica-privacidade" className="text-gray-400 hover:text-blue-400 transition block">
                  Política de Privacidade
                </Link>
                <Link href="/politica-cookies" className="text-gray-400 hover:text-blue-400 transition block">
                  Política de Cookies
                </Link>
              </div>
            </div>
          </div>

          {/* Security Seals */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <p className="text-sm text-gray-400 mb-4 font-semibold">Segurança e Confiança</p>
            <div className="flex flex-wrap gap-6 items-center">
              <Image
                src="/img/selos/1692213060824-e1740152155914-1-400x144.jpg"
                alt="Selo de Segurança"
                width={80}
                height={80}
                className="h-16 w-auto"
              />
              <Image
                src="/img/selos/Selo-SiteSeguro-Vidaecasa.png-400x177.webp"
                alt="Site Seguro"
                width={80}
                height={80}
                className="h-16 w-auto"
              />
              <Image
                src="/img/selos/download-e1765035077631.png"
                alt="Selo de Confiança"
                width={80}
                height={80}
                className="h-16 w-auto"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 Altus Certificados - ALTUSTEC LTDA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
