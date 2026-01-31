'use client';

import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, CheckCircle, Zap, Lock, Shield, Rocket, Award, ArrowRight, FileCheck } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://altuscertificados.com.br';
  const whatsappNumber = '5511987756034';
  const whatsappMessage = 'Olá! Gostaria de saber mais sobre os certificados digitais.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Altus Certificados',
      'url': baseUrl,
      'logo': `${baseUrl}/img/logo4.png`,
      'description': 'Emissão de certificados digitais A1 com segurança, transparência e profissionalismo.',
      'sameAs': [
        'https://www.facebook.com/altuscertificados',
        'https://www.instagram.com/altuscertificados',
        'https://www.linkedin.com/company/altuscertificados'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Service',
        'telephone': '+55-11-98775-6034',
        'email': 'altuscertificados@gmail.com',
        'areaServed': 'BR',
        'availableLanguage': 'pt-BR'
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Estrada dos Vados, 551',
        'addressLocality': 'Guarulhos',
        'addressRegion': 'SP',
        'postalCode': '',
        'addressCountry': 'BR'
      }
    };

    // Add Organization Schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.innerHTML = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    return () => {
      if (document.head.contains(orgScript)) {
        document.head.removeChild(orgScript);
      }
    };
  }, [baseUrl]);

  return (
    <PageLayout title="Home">

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Certificados Digitais A1 com Segurança e Confiança
                </h1>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Certificado digital A1 emitido por videoconferência. Agende sua sessão, valide seus dados e receba o certificado. Segurança de nível empresarial, preços justos e suporte profissional 24/7 via WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="#produtos" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 text-center">
                  Ver Certificados
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Fale Conosco
                </a>
              </div>
            </div>
            <div className="relative h-96 md:h-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/img/img.png"
                alt="Certificado Digital"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher Altus Certificados?</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">Transparência, honestidade e profissionalismo em cada etapa</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Emissão por Videoconferência', desc: 'Agende sua videoconferência e receba o protocolo para emissão' },
              { icon: Lock, title: 'Segurança Garantida', desc: 'Criptografia de nível militar AES-256' },
              { icon: Award, title: 'Suporte Profissional', desc: 'Atendimento via WhatsApp 24/7' },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-lg bg-white border-2 border-blue-200 hover:shadow-xl hover:border-blue-400 transition duration-300">
                <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="relative w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-gray-700 text-lg">Veja o passo a passo para obter seu certificado digital</p>
          </div>
          
          {/* Desktop - Imagem PC */}
          <div className="hidden md:block">
            <Image
              src="/img/passopc.jpeg"
              alt="Passo a passo - Desktop"
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
          
          {/* Mobile - Imagem Celular */}
          <div className="md:hidden">
            <Image
              src="/img/passocel.jpeg"
              alt="Passo a passo - Mobile"
              width={600}
              height={1000}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="relative w-full py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossos Certificados</h2>
            <p className="text-gray-700 text-lg">Escolha o certificado ideal para suas necessidades</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* A1 PJ */}
            <div className="p-8 rounded-lg bg-white border-2 border-gray-300 hover:shadow-xl hover:border-blue-400 transition duration-300">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Certificado A1 PJ</h3>
                  <p className="text-gray-700">Para Pessoas Jurídicas</p>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl font-bold text-blue-900">R$ 115,00</span>
                  <p className="text-gray-700 text-sm">Válido por 1 ano</p>
                </div>
                <ul className="space-y-3">
                  {['Válido para assinatura digital', 'Acesso a sistemas governamentais', 'Emissão em minutos', 'Suporte técnico incluído'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link href="/checkout?tipo=a1-pj" className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-bold transition duration-300 text-center block shadow-md">
                    Comprar Agora
                  </Link>
                  <Link href="/produtos/a1-pj" className="flex-1 border-2 border-blue-900 text-blue-900 hover:bg-blue-50 py-3 rounded-lg font-bold transition duration-300 text-center block">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>

            {/* A1 PF */}
            <div className="relative p-8 rounded-lg bg-blue-100 border-2 border-blue-400 hover:shadow-xl transition duration-300">
              <div className="absolute -top-4 left-8 bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                ⭐ Mais Popular
              </div>
              <div className="relative space-y-6 pt-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Certificado A1 PF</h3>
                  <p className="text-gray-700">Para Pessoas Físicas</p>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl font-bold text-blue-900">R$ 99,00</span>
                  <p className="text-gray-700 text-sm">Válido por 1 ano</p>
                </div>
                <ul className="space-y-3">
                  {['Válido para assinatura digital', 'Acesso a sistemas governamentais', 'Emissão em minutos', 'Suporte técnico incluído'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link href="/checkout?tipo=a1-pf" className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-bold transition duration-300 text-center block shadow-md">
                    Comprar Agora
                  </Link>
                  <Link href="/produtos/a1-pf" className="flex-1 border-2 border-blue-900 text-blue-900 hover:bg-blue-50 py-3 rounded-lg font-bold transition duration-300 text-center block">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Pronto para emitir seu certificado?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">Fale com nosso time via WhatsApp e tire todas as suas dúvidas. Estamos aqui para ajudar!</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-bold transition duration-300 text-lg shadow-md">
              <MessageCircle size={24} />
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </section>

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
                <Link href="/rastrear" className="text-gray-400 hover:text-blue-400 transition block">
                  Rastrear Pedido
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
    </PageLayout>
  );
}
