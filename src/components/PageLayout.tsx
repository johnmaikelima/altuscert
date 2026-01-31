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
  const whatsappNumber = '5511987756034';
  const whatsappMessage = 'Olá! Gostaria de saber mais sobre os certificados digitais.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-100 text-gray-900 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition">
            <div className="h-12 flex items-center justify-center">
              <Image
                src="/img/logo4.png"
                alt="Altus Certificados Logo"
                width={669}
                height={223}
                className="h-12 w-auto"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            <Link href="/" className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-300 font-medium rounded-lg">
              Home
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-300 font-medium rounded-lg flex items-center gap-1">
                Produtos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-10">
                <Link href="/produtos/a1-pj" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-t-lg first:rounded-t-lg">
                  Certificado A1 PJ
                </Link>
                <Link href="/produtos/a1-pf" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-b-lg last:rounded-b-lg">
                  Certificado A1 PF
                </Link>
              </div>
            </div>
            <Link href="/seja-parceiro" className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-300 font-medium rounded-lg">
              Seja Parceiro
            </Link>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-300 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg">
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-gray-200 rounded-lg transition">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition duration-300 flex items-center gap-1 font-semibold shadow-md">
              <MessageCircle size={18} />
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
