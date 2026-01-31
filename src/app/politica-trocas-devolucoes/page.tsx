'use client';

import PageLayout from '@/components/PageLayout';

export default function PoliticaTrocasDevolucoes() {
  return (
    <PageLayout title="Política de Trocas e Devoluções">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Política de Trocas e Devoluções</h1>
        <p className="text-gray-600 mb-8">Última atualização: Janeiro de 2024</p>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Direito de Arrependimento</h2>
            <p>
              De acordo com o Código de Defesa do Consumidor (Lei nº 8.078/1990), o cliente tem o direito de se arrepender da compra de certificados digitais no prazo de 7 (sete) dias corridos, contados a partir do recebimento do produto ou da confirmação do serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Condições para Devolução</h2>
            <p>Para que a devolução seja aceita, é necessário que:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>O pedido esteja dentro do prazo de 7 dias</li>
              <li>O certificado não tenha sido utilizado ou ativado</li>
              <li>O cliente entre em contato conosco informando o motivo da devolução</li>
              <li>Todos os dados e documentação fornecidos estejam íntegros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Processo de Devolução</h2>
            <p>Para solicitar uma devolução, o cliente deve:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Entrar em contato conosco via WhatsApp ou email</li>
              <li>Informar o código do pedido e o motivo da devolução</li>
              <li>Aguardar a confirmação de nossa equipe</li>
              <li>Seguir as instruções para devolver o certificado</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Reembolso</h2>
            <p>
              Após recebermos a devolução e verificarmos que atende aos critérios estabelecidos, o reembolso será processado em até 10 (dez) dias úteis para a conta bancária ou cartão de crédito utilizado na compra.
            </p>
            <p className="mt-4">
              O valor do reembolso será integral, incluindo todas as taxas de processamento, exceto as taxas bancárias de transferência, que serão de responsabilidade do cliente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Trocas</h2>
            <p>
              Caso o cliente deseje trocar o certificado por outro tipo (ex: de A1 PF para A1 PJ), a troca será realizada mediante análise da solicitação. A diferença de valor, se houver, será cobrada ou reembolsada conforme o caso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Certificados Utilizados</h2>
            <p>
              Certificados digitais que já foram utilizados, ativados ou instalados não poderão ser devolvidos ou trocados, pois perdem sua validade e não podem ser reutilizados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Contato</h2>
            <p>Para solicitar uma devolução ou troca, entre em contato conosco:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>
                <strong>WhatsApp:</strong> (11) 98775-6034 ou (11) 99217-7044
              </li>
              <li>
                <strong>Email:</strong> altuscertificados@gmail.com
              </li>
              <li>
                <strong>Horário de atendimento:</strong> Segunda a sexta, das 09h às 17h
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Alterações na Política</h2>
            <p>
              Esta política pode ser alterada a qualquer momento, sem aviso prévio. As alterações entram em vigor imediatamente após a publicação neste site.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-gray-700">
            <strong>Dúvidas?</strong> Entre em contato conosco via WhatsApp ou email. Nossa equipe está pronta para ajudar!
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
