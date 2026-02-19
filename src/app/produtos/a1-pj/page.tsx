'use client';

import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Shield, Zap, Lock, Clock, Award, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CertificadoA1PJ() {
  const [quantity, setQuantity] = useState(1);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://altuscertificados.com.br';

  useEffect(() => {
    // Google Ads - View Item (Product Page)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_item', {
        'items': [
          {
            'item_id': 'a1-pj',
            'item_name': 'Certificado Digital A1 PJ',
            'item_category': 'Certificado Digital',
            'price': 89.90,
            'currency': 'BRL'
          }
        ]
      });
    }
  }, []);

  return (
    <PageLayout title="Certificado A1 PJ">
      {/* Seção Superior - Nome do Produto e Botão - 100% Width */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-12 mb-8 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-blue-400 transition">Início</Link>
            <span> / </span>
            <Link href="/#produtos" className="hover:text-blue-400 transition">Produtos</Link>
            <span> / </span>
            <span className="font-semibold text-blue-400">Certificado Digital A1 PJ</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <CheckCircle size={18} />
                  Em Estoque
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
                Certificado Digital A1
              </h1>
              <p className="text-xl text-blue-400 font-semibold mb-6">Pessoa Jurídica (PJ)</p>
              <Link href="/checkout?tipo=a1-pj" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-lg font-bold transition text-center whitespace-nowrap shadow-lg hover:shadow-xl inline-block">
                COMPRE AGORA
              </Link>
            </div>
            <div className="w-full md:w-64 flex-shrink-0">
              <Image
                src="/img/certificadopj.webp"
                alt="Certificado Digital A1 PJ"
                width={300}
                height={300}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Informações Principais */}
          <div className="grid md:grid-cols-3 gap-8 mt-10 pt-8 border-t border-gray-700">
            {/* Emissão */}
            <div className="group">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Emissão</p>
              <p className="text-lg text-white font-semibold group-hover:text-blue-400 transition">Online por Vídeo Conferência</p>
            </div>
            {/* Validade */}
            <div className="group">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Validade</p>
              <p className="text-lg text-white font-semibold group-hover:text-blue-400 transition">12 meses</p>
            </div>
            {/* Preço */}
            <div className="group">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Preço</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-200 transition">R$ 89,90</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Aviso Importante - Documentos Obrigatórios */}
        <div className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-500 text-white font-bold">!</div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-3">Documentos Necessários para Emissão</h3>
              <div className="text-amber-800 leading-relaxed space-y-3">
                <div>
                  <p className="font-semibold mb-1">📋 Identificação (obrigatório):</p>
                  <p><strong>CNH (Carteira Nacional de Habilitação) válida</strong> - Único documento aceito para identificação</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🏢 Comprovante de Empresa (obrigatório - escolha uma opção):</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Contrato Social</strong> da empresa</li>
                    <li><strong>Requerimento de Empresário</strong> (para MEI)</li>
                    <li><strong>QSA2</strong> emitido pelo <a href="https://www.gov.br/empresas-e-negocios/pt-br/redesim/comprovantes/emitir-comprovante-autenticado" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">gov.br</a> (Comprovante de Sócio/Administrador)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Produto</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            O Certificado Digital A1 para Pessoa Jurídica garante a autenticidade, integridade e validade jurídica das transações eletrônicas. 
            Ideal para empresas que precisam assinar documentos digitalmente e realizar transações seguras.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Após a videoconferência, você recebe um protocolo para fazer a emissão e gerar o arquivo A1 no seu equipamento.
          </p>
        </div>

        {/* Passo a Passo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Como Funciona</h2>
          {/* Desktop - Imagem PC */}
          <div className="hidden md:block">
            <Image
              src="/img/passopc.jpeg"
              alt="Passo a passo - Desktop"
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg"
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
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Benefícios */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Principais Benefícios</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Assinatura Digital</h3>
                <p className="text-gray-700">Assine documentos digitalmente com validade jurídica</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="text-blue-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Segurança Garantida</h3>
                <p className="text-gray-700">Criptografia de nível militar para proteger seus dados</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="text-yellow-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Emissão por Videoconferência</h3>
                <p className="text-gray-700">Agende sua videoconferência, receba o protocolo e faça a emissão no seu equipamento</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Lock className="text-purple-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Conformidade Legal</h3>
                <p className="text-gray-700">Atende todas as exigências legais e regulatórias</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-red-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Validade 12 Meses</h3>
                <p className="text-gray-700">Certificado válido por um ano completo</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Award className="text-indigo-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Suporte 24/7</h3>
                <p className="text-gray-700">Atendimento profissional via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Características Técnicas</h2>
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span className="text-gray-700"><strong>Tipo:</strong> Certificado Digital A1</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span className="text-gray-700"><strong>Validade:</strong> 12 meses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span className="text-gray-700"><strong>Aplicação:</strong> Pessoa Jurídica (CNPJ)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span className="text-gray-700"><strong>Formato:</strong> Arquivo digital (.pfx ou .p12)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span className="text-gray-700"><strong>Criptografia:</strong> AES-256</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span className="text-gray-700"><strong>Compatibilidade:</strong> Windows, Mac, Linux</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Para quem é */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Para Quem é?</h2>
          <div className="bg-yellow-50 p-8 rounded-lg border border-yellow-200">
            <p className="text-gray-700 mb-4">O Certificado A1 PJ é ideal para:</p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Emissão de NFe (Nota Fiscal Eletrônica)</strong> - Obrigatório para empresas que emitem notas fiscais</li>
              <li>• Empresas que precisam assinar documentos digitalmente</li>
              <li>• Organizações que realizam transações eletrônicas</li>
              <li>• Empresas que precisam cumprir obrigações fiscais digitais</li>
              <li>• Negócios que buscam segurança nas comunicações eletrônicas</li>
              <li>• Qualquer empresa que necessite de identidade digital</li>
            </ul>
          </div>
        </div>

        {/* Tempo de Processamento */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tempo de Processamento</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <Clock className="text-blue-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Agendamento</h3>
              <p className="text-gray-700 text-sm">Agende sua videoconferência em até 24 horas</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <Zap className="text-green-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Videoconferência</h3>
              <p className="text-gray-700 text-sm">Sessão de 10-15 minutos para validação</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <CheckCircle className="text-purple-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Emissão</h3>
              <p className="text-gray-700 text-sm">Receba o protocolo e emita em até 24h</p>
            </div>
          </div>
        </div>

        {/* Requisitos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Requisitos Necessários</h2>
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Documentos Obrigatórios:</h3>
            <ul className="space-y-3 mb-6 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>CNH (Carteira Nacional de Habilitação) válida</strong> - Único documento aceito para identificação</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Comprovante de Empresa</strong> (escolha uma opção):</span>
              </li>
            </ul>
            <ul className="space-y-2 mb-6 text-gray-700 ml-8">
              <li className="flex gap-3 bg-green-50 p-2 rounded border border-green-200">
                <span className="text-green-600 font-bold">★</span>
                <span><strong>QSA2 emitido pelo <a href="https://www.gov.br/empresas-e-negocios/pt-br/redesim/comprovantes/emitir-comprovante-autenticado" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">gov.br</a></strong> (Comprovante de Sócio/Administrador) - <span className="text-green-600 font-semibold">PREFERÊNCIA</span></span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>Contrato Social da empresa</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>Requerimento de Empresário (para MEI)</span>
              </li>
            </ul>
            <h3 className="font-semibold text-gray-900 mb-4">Para a Videoconferência:</h3>
            <ul className="space-y-3 mb-6 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Câmera e microfone funcionando</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Conexão de internet estável</span>
              </li>
            </ul>
            <h3 className="font-semibold text-gray-900 mb-4">Para a Emissão:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Computador com Windows, Mac ou Linux</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Protocolo fornecido após videoconferência</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Acesso à internet para download do certificado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-900 text-white p-8 rounded-lg text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-blue-100 mb-6">Clique no botão abaixo para agendar sua videoconferência</p>
          <Link href="/checkout?tipo=a1-pj" className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Comprar Agora - R$ 89,90
          </Link>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Qual é a validade do certificado?</h3>
              <p className="text-gray-700">O certificado A1 PJ tem validade de 12 meses (1 ano) a partir da data de emissão.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Como recebo o certificado?</h3>
              <p className="text-gray-700">Após a compra, você receberá um email com instruções para agendar sua videoconferência. Durante a videoconferência, validaremos seus dados e geraremos um protocolo. Com este protocolo, você faz a emissão no seu equipamento, cria sua própria senha e gera o arquivo A1 localmente.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Posso renovar o certificado?</h3>
              <p className="text-gray-700">Sim! Você pode renovar o certificado antes da data de expiração. Consulte nossa página de renovação para mais informações.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Preciso de suporte?</h3>
              <p className="text-gray-700">Sim! Nossa equipe está disponível 24/7 via WhatsApp para ajudar com qualquer dúvida.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Flutuante de Compra - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
        <Link href="/checkout?tipo=a1-pj" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-bold transition text-center block">
          COMPRE AGORA - R$ 89,90
        </Link>
      </div>

      {/* Espaço para o botão flutuante no mobile */}
      <div className="md:hidden h-24"></div>
    </PageLayout>
  );
}
