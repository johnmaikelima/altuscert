'use client';

import PageLayout from '@/components/PageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function TutorialQSA2() {
  return (
    <PageLayout title="Tutorial QSA2 - Como Emitir">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/produtos/a1-pj" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Voltar aos Produtos
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Como Emitir o QSA2
          </h1>
          <p className="text-lg text-gray-600">
            Guia passo a passo para emitir o Comprovante de Sócio/Administrador (QSA2) no site do Governo
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <div className="flex gap-3">
            <CheckCircle className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <p className="text-blue-900 font-semibold">O QSA2 é a forma mais rápida e segura</p>
              <p className="text-blue-800 text-sm mt-1">
                O QSA2 é um comprovante oficial emitido pelo governo que substitui o Contrato Social ou Requerimento de Empresário. É a nossa opção preferida!
              </p>
            </div>
          </div>
        </div>

        {/* Passos */}
        <div className="space-y-12">
          {/* Passo 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">1</span>
                Acesse o site do Governo
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Clique no link abaixo para acessar o portal de comprovantes do Governo:
              </p>
              <a
                href="https://www.gov.br/empresas-e-negocios/pt-br/redesim/comprovantes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Acessar Portal de Comprovantes
                <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">2</span>
                Clique em "Emitir Comprovante"
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Procure pelo botão <strong>"Emitir Comprovante de Inscrição com Código de Autenticidade"</strong> e clique nele.
              </p>
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/passo1.png"
                  alt="Passo 1 - Emitir Comprovante"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">3</span>
                Faça Login com os dados do Titular
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Você será redirecionado para o login do GOV.BR. Faça o login com os dados do <strong>titular da empresa</strong> (sócio ou administrador) e clique em <strong>"Continuar"</strong>.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Importante:</strong> Use os dados de login do titular da empresa, não de outra pessoa.
                </p>
              </div>
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/passo2.png"
                  alt="Passo 2 - Login GOV.BR"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Passo 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">4</span>
                Preencha o CNPJ e Emita
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Preencha o <strong>CNPJ da empresa</strong> no campo indicado e clique em <strong>"Emitir"</strong>.
              </p>
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/passo3.png"
                  alt="Passo 3 - Preencher CNPJ"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Passo 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">5</span>
                Imprima e Salve em PDF
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Role a página até o final e clique em <strong>"Imprimir"</strong>. Salve o documento como <strong>PDF</strong> e nos envie por email ou WhatsApp.
              </p>
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/passo4.png"
                  alt="Passo 4 - Imprimir e Salvar"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Próximos Passos */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" size={24} />
              Pronto! Agora envie o documento
            </h3>
            <div className="space-y-3 text-green-800">
              <p>
                Após salvar o QSA2 em PDF, envie o documento para nós através de:
              </p>
              <div className="bg-white rounded-lg p-4 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-lg">📧</span>
                  <strong>Email:</strong> altuscertificados@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <strong>WhatsApp:</strong> (11) 92321-3475
                </p>
              </div>
              <p className="text-sm italic">
                Mencione seu código de pedido para que possamos processar sua solicitação mais rapidamente.
              </p>
            </div>
          </div>

          {/* Dúvidas */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Ficou com dúvidas?</h3>
            <p className="text-gray-700 mb-4">
              Entre em contato conosco via WhatsApp. Estamos aqui para ajudar!
            </p>
            <a
              href="https://wa.me/5511923213475?text=Olá! Tenho dúvidas sobre como emitir o QSA2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              💬 Falar no WhatsApp
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

        {/* Voltar */}
        <div className="mt-12 text-center">
          <Link
            href="/produtos/a1-pj"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Voltar ao Certificado A1 PJ
          </Link>
        </div>
      </div>
      </div>
    </PageLayout>
  );
}
