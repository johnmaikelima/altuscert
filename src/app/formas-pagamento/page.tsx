'use client';

import PageLayout from '@/components/PageLayout';
import { CreditCard, Smartphone, DollarSign } from 'lucide-react';

export default function FormasPagamento() {
  return (
    <PageLayout title="Formas de Pagamento">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Formas de Pagamento</h1>
        <p className="text-lg text-gray-600 mb-8">Múltiplas opções seguras para sua compra</p>

        <div className="space-y-8">
          <section className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Métodos Disponíveis</h2>
            <p className="text-gray-700 mb-6">
              Aceitamos diversos métodos de pagamento para sua comodidade. Todos os pagamentos são processados de forma segura através do Mercado Pago.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Cartão de Crédito */}
            <div className="p-6 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-400 transition">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="text-blue-900" size={32} />
                <h3 className="text-xl font-bold text-gray-900">Cartão de Crédito</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Visa, Mastercard, Elo, American Express</li>
                <li>✓ Parcelamento em até 12x</li>
                <li>✓ Processamento imediato</li>
                <li>✓ Segurança SSL 256-bit</li>
              </ul>
            </div>

            {/* Débito */}
            <div className="p-6 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-400 transition">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="text-green-600" size={32} />
                <h3 className="text-xl font-bold text-gray-900">Cartão de Débito</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Visa Débito, Mastercard Débito</li>
                <li>✓ Débito imediato na conta</li>
                <li>✓ Sem juros</li>
                <li>✓ Confirmação instantânea</li>
              </ul>
            </div>

            {/* PIX */}
            <div className="p-6 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-400 transition">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="text-purple-600" size={32} />
                <h3 className="text-xl font-bold text-gray-900">PIX</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Transferência bancária instantânea</li>
                <li>✓ Disponível 24/7</li>
                <li>✓ Sem taxas adicionais</li>
                <li>✓ Confirmação em segundos</li>
              </ul>
            </div>

            {/* Boleto */}
            <div className="p-6 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-400 transition">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="text-orange-600" size={32} />
                <h3 className="text-xl font-bold text-gray-900">Boleto Bancário</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Pagamento em qualquer banco</li>
                <li>✓ Vencimento em 3 dias úteis</li>
                <li>✓ Sem juros</li>
                <li>✓ Comprovante de pagamento</li>
              </ul>
            </div>
          </div>

          <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Segurança de Pagamento</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span>Todos os pagamentos são processados pelo Mercado Pago, uma das maiores plataformas de pagamento do Brasil</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span>Criptografia SSL 256-bit para proteção de dados</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span>Seus dados de cartão nunca são armazenados em nossos servidores</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span>Proteção contra fraude e chargebacks</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-900 font-bold">✓</span>
                <span>Certificado de segurança válido</span>
              </li>
            </ul>
          </section>

          <section className="bg-yellow-50 p-8 rounded-lg border border-yellow-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Informações Importantes</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Após o pagamento, você receberá um email de confirmação</li>
              <li>• Você receberá instruções para agendar sua videoconferência de emissão</li>
              <li>• Você pode acompanhar o status do seu pedido em nossa página de rastreamento</li>
              <li>• Em caso de dúvidas, entre em contato conosco via WhatsApp ou email</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dúvidas sobre Pagamento?</h2>
            <p className="text-gray-700 mb-6">
              Nossa equipe está disponível para ajudar com qualquer dúvida sobre formas de pagamento.
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
