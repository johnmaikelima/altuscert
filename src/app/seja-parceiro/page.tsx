'use client';

import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import { CheckCircle, TrendingUp, Shield, Zap, Users, Award, MessageCircle } from 'lucide-react';

export default function SejaParceiro() {
  const whatsappNumber = '5511992177044';
  const whatsappMessage = 'Olá! Tenho interesse em ser parceiro da Altus Certificados.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <PageLayout title="Seja Parceiro">
      {/* Seção Superior - 100% Width */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-12 mb-8 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-6">
            <span>Início / </span>
            <span className="font-semibold text-blue-400">Seja Parceiro</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
                Programa Altus Parceiro Digital
              </h1>
              <p className="text-xl text-blue-400 font-semibold">Uma excelente oportunidade de crescimento profissional e financeiro</p>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 rounded-lg font-bold transition text-center whitespace-nowrap shadow-lg hover:shadow-xl flex items-center gap-2">
              <MessageCircle size={20} />
              SEJA PARCEIRO
            </a>
          </div>

          {/* Descrição Principal */}
          <div className="grid md:grid-cols-3 gap-8 mt-10 pt-8 border-t border-gray-700">
            <div className="group">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Oportunidade</p>
              <p className="text-lg text-white font-semibold group-hover:text-blue-400 transition">Revenda de Certificados Digitais</p>
            </div>
            <div className="group">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Lucratividade</p>
              <p className="text-lg text-white font-semibold group-hover:text-blue-400 transition">Renda Recorrente e Crescente</p>
            </div>
            <div className="group">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Suporte</p>
              <p className="text-lg text-white font-semibold group-hover:text-blue-400 transition">Equipe Especializada 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sobre o Programa */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre o Programa</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Revender Certificados Digitais no Programa Altus Parceiro Digital é uma excelente oportunidade para empreendedores, inclusive empresas que desejam ampliar seus serviços e obter altos retornos financeiros em um mercado cada vez mais digital.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ao se tornar um parceiro da Altus, você conta com uma estrutura robusta, suporte especializado e um produto de alta demanda, essencial para empresas, contadores, advogados e profissionais que precisam de identidade digital segura.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Se você já atua com contabilidade, TI, assessoria empresarial ou vendas de produtos digitais, adicionar os certificados da Altus ao seu portfólio é um diferencial estratégico, aumentando sua oferta de serviços e atraindo novos clientes.
          </p>
        </div>

        {/* Vantagens do Programa */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Vantagens do Programa</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <TrendingUp className="text-blue-600 flex-shrink-0" size={28} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Alta Lucratividade e Rentabilidade</h3>
                <p className="text-gray-700">A revenda de certificados digitais pode se tornar uma fonte de renda recorrente, já que empresas e profissionais precisam renová-los periodicamente.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
              <Shield className="text-green-600 flex-shrink-0" size={28} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Credibilidade e Confiança</h3>
                <p className="text-gray-700">A Altus Certificadora segue rigorosamente as normas de acordo com o ICP-Brasil, garantindo a segurança e confiabilidade dos certificados.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-purple-50 rounded-lg border border-purple-200">
              <Zap className="text-purple-600 flex-shrink-0" size={28} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Facilidade na Emissão e Renovação</h3>
                <p className="text-gray-700">O Programa Altus Parceiro Digital possui uma plataforma intuitiva e eficiente, permitindo que os certificados sejam emitidos rapidamente por videoconferência.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <Users className="text-yellow-600 flex-shrink-0" size={28} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Suporte Comercial Especializado</h3>
                <p className="text-gray-700">Nosso time especializado está disponível para oferecer um atendimento ágil e eficiente em todas as etapas da parceria.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Características do Serviço */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Características do Serviço</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                Emissão por Videoconferência
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Todo o processo ocorre online, ainda assim a validação dos documentos e identidade do solicitante é feito por meio de uma chamada de vídeo com um agente autorizado.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                Certificados SERPRO
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Os certificados SERPRO ID e Syn ID seguem os padrões da Infraestrutura de Chaves Públicas Brasileira (ICP-Brasil).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                Compra e Renovação
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Processo 100% online, dependendo do tipo de certificado, ou presencialmente, de acordo com as normas da ICP-Brasil.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                Qualidade e Segurança
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Todos os certificados são emitidos seguindo rigorosamente as normas e padrões de segurança da ICP-Brasil.
              </p>
            </div>
          </div>
        </div>

        {/* Público-Alvo */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Para Quem é Ideal?</h2>
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              O Programa Altus Parceiro Digital é ideal para:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <strong>Contadores e Escritórios Contábeis</strong> - Agregue valor aos seus serviços
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <strong>Advogados e Escritórios de Advocacia</strong> - Ofereça soluções digitais aos clientes
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <strong>Empresas de TI e Consultoria</strong> - Expanda seu portfólio de serviços
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <strong>Profissionais Autônomos</strong> - Crie uma nova fonte de renda
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <strong>Empresas de Assessoria Empresarial</strong> - Agregue certificados ao portfólio
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <strong>Vendedores de Produtos Digitais</strong> - Complemente sua oferta
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-12 rounded-lg text-center mb-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Pronto para Crescer com a Gente?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Entre em contato conosco e saiba como se tornar um parceiro de sucesso da Altus Certificados!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-900 px-12 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Fale Conosco via WhatsApp
          </a>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Como funciona a parceria?</h3>
              <p className="text-gray-700">Você revende os certificados digitais da Altus aos seus clientes. Nós fornecemos o suporte técnico, a plataforma de emissão e todo o suporte comercial necessário.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Qual é a margem de lucro?</h3>
              <p className="text-gray-700">Oferecemos margens competitivas e atrativas. Entre em contato conosco para discutir as melhores condições para sua parceria.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Preciso de conhecimento técnico?</h3>
              <p className="text-gray-700">Não! Nós fornecemos toda a capacitação e suporte necessário. Nossa plataforma é intuitiva e fácil de usar.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Como é o suporte?</h3>
              <p className="text-gray-700">Oferecemos suporte especializado 24/7 via WhatsApp, email e telefone. Nossa equipe está sempre disponível para ajudar.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Posso começar imediatamente?</h3>
              <p className="text-gray-700">Sim! Após o contato inicial e aprovação, você pode começar a revender certificados em poucos dias.</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
