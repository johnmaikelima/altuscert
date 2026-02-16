'use client';

import PageLayout from '@/components/PageLayout';
import { CheckCircle } from 'lucide-react';

export default function Renovacao() {
  return (
    <PageLayout title="Renovação de Certificados">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Renovação de Certificados</h1>
        <p className="text-lg text-gray-600 mb-8">Mantenha seu certificado digital sempre ativo e atualizado</p>

        <div className="space-y-8">
          <section className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Por que renovar seu certificado?</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <span className="text-gray-700">Certificados expiram e precisam ser renovados para continuar válidos</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <span className="text-gray-700">Renovação é mais rápida e barata que emissão de novo certificado</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <span className="text-gray-700">Mantenha sua identidade digital segura e reconhecida</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quando renovar?</h2>
            <p className="text-gray-700 mb-4">
              Recomendamos renovar seu certificado com antecedência de 30 dias antes da data de expiração. Isso garante que você não fique sem certificado válido.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-gray-700">
                <strong>Dica:</strong> Você receberá um email de notificação quando seu certificado estiver próximo de expirar.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como renovar?</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Entre em contato conosco</h3>
                  <p className="text-gray-700">Via WhatsApp ou email informando que deseja renovar</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Forneça seus dados</h3>
                  <p className="text-gray-700">Confirme seus dados pessoais e documentação</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Realize o pagamento</h3>
                  <p className="text-gray-700">Pague a taxa de renovação via Mercado Pago</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Agende sua videoconferência</h3>
                  <p className="text-gray-700">Receba o protocolo e faça a emissão renovada no seu equipamento</p>
                </div>
              </li>
            </ol>
          </section>

          <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Preços de Renovação</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg border-2 border-gray-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Certificado A1 PF</h3>
                <p className="text-3xl font-bold text-blue-900 mb-4">R$ 85,00</p>
                <p className="text-gray-700 text-sm">Renovação para Pessoa Física</p>
              </div>
              <div className="p-6 bg-white rounded-lg border-2 border-blue-400">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Certificado A1 PJ</h3>
                <p className="text-3xl font-bold text-blue-900 mb-4">R$ 89,90</p>
                <p className="text-gray-700 text-sm">Renovação para Pessoa Jurídica</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dúvidas?</h2>
            <p className="text-gray-700 mb-6">
              Entre em contato conosco via WhatsApp ou email. Nossa equipe está pronta para ajudar com sua renovação!
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
