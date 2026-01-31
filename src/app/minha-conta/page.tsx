'use client';

import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';

export default function MinhaConta() {
  return (
    <PageLayout title="Minha Conta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Minha Conta</h1>
        <p className="text-lg text-gray-600 mb-8">Gerencie seus certificados e informações</p>

        <div className="space-y-8">
          <section className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bem-vindo à sua Conta</h2>
            <p className="text-gray-700 mb-6">
              Aqui você pode acompanhar seus certificados, fazer renovações e gerenciar suas informações pessoais.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Rastrear Pedido */}
            <Link href="/rastrear" className="p-6 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-400 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-blue-900" size={32} />
                <h3 className="text-xl font-bold text-gray-900">Rastrear Pedido</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Acompanhe o status do seu pedido em tempo real. Digite o código do pedido para ver os detalhes.
              </p>
              <span className="text-blue-900 font-semibold hover:underline">Acessar →</span>
            </Link>

            {/* Renovar Certificado */}
            <Link href="/renovacao" className="p-6 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-400 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <Download className="text-green-600" size={32} />
                <h3 className="text-xl font-bold text-gray-900">Renovar Certificado</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Renove seu certificado antes que expire. Processo rápido e seguro.
              </p>
              <span className="text-blue-900 font-semibold hover:underline">Acessar →</span>
            </Link>
          </div>

          <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações da Conta</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-gray-900 font-semibold">Você receberá confirmações em seu email</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Código do Pedido</p>
                <p className="text-gray-900 font-semibold">Use o código para rastrear seu pedido</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Status do Certificado</p>
                <p className="text-gray-900 font-semibold">Acompanhe o status na página de rastreamento</p>
              </div>
            </div>
          </section>

          <section className="bg-yellow-50 p-8 rounded-lg border border-yellow-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Usar sua Conta</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Faça sua Compra</h3>
                  <p className="text-gray-700">Escolha o certificado desejado e complete o pagamento</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Receba o Código</h3>
                  <p className="text-gray-700">Você receberá um código de pedido por email</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Rastreie seu Pedido</h3>
                  <p className="text-gray-700">Use o código para acompanhar o status</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Agende sua Videoconferência</h3>
                  <p className="text-gray-700">Receba instruções para agendar e fazer a emissão do seu certificado</p>
                </div>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Precisa de Ajuda?</h2>
            <p className="text-gray-700 mb-6">
              Nossa equipe está disponível para responder suas dúvidas sobre sua conta e certificados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5511987756034" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center">
                WhatsApp: (11) 98775-6034
              </a>
              <a href="mailto:altuscertificados@gmail.com" className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition text-center">
                Email: altuscertificados@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
