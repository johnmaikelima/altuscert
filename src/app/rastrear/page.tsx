'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Pedido {
  id: string;
  tipo: string;
  preco: number;
  cliente: {
    nome: string;
    email: string;
  };
  status: string;
  dataCriacao: string;
}

export default function RastrearPage() {
  const [codigoPedido, setCodigoPedido] = useState('');
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setPedido(null);

    try {
      const response = await fetch(`/api/pedidos/${codigoPedido}`);
      
      if (!response.ok) {
        setErro('Pedido não encontrado. Verifique o código e tente novamente.');
        return;
      }

      const data = await response.json();
      setPedido(data);
    } catch (error) {
      setErro('Erro ao buscar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <CheckCircle size={24} className="text-emerald-400" />;
      case 'pendente':
        return <Clock size={24} className="text-amber-400" />;
      case 'cancelado':
        return <AlertCircle size={24} className="text-red-400" />;
      default:
        return <Clock size={24} className="text-slate-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'pendente':
        return 'Pendente';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const getTipoCertificado = (tipo: string) => {
    return tipo === 'a1-pj' ? 'Certificado A1 PJ' : 'Certificado A1 PF';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition">
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-2">Rastrear Pedido</h1>
          <p className="text-slate-400">Digite o código do seu pedido para acompanhar o status</p>
        </div>

        {/* Formulário de Busca */}
        <form onSubmit={handleBuscar} className="mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              value={codigoPedido}
              onChange={(e) => setCodigoPedido(e.target.value.toUpperCase())}
              placeholder="Ex: CERT-XXXXXX-XXXXXX"
              className="flex-1 px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition font-mono"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-4 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50"
            >
              <Search size={20} />
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {/* Erro */}
        {erro && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
            <p className="text-red-400 flex items-center gap-2">
              <AlertCircle size={20} />
              {erro}
            </p>
          </div>
        )}

        {/* Resultado */}
        {pedido && (
          <div className="space-y-6">
            {/* Card Principal */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Código do Pedido</p>
                  <p className="text-2xl font-black text-cyan-400 font-mono">{pedido.id}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  {getStatusIcon(pedido.status)}
                  <span className="text-sm font-semibold">{getStatusText(pedido.status)}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-slate-700/50">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Tipo de Certificado</p>
                  <p className="text-lg font-semibold">{getTipoCertificado(pedido.tipo)}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Valor</p>
                  <p className="text-lg font-semibold text-cyan-400">R$ {pedido.preco.toFixed(2)}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Cliente</p>
                  <p className="text-lg font-semibold">{pedido.cliente.nome}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Email</p>
                  <p className="text-sm">{pedido.cliente.email}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-2">Data do Pedido</p>
                <p className="text-sm">{new Date(pedido.dataCriacao).toLocaleDateString('pt-BR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-6">Status do Pedido</h3>
              
              <div className="space-y-4">
                {pedido.status === 'confirmado' && (
                  <>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                          <CheckCircle size={20} className="text-emerald-400" />
                        </div>
                        <div className="w-1 h-12 bg-emerald-500/20 mt-2"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-400">Pagamento Confirmado</p>
                        <p className="text-slate-400 text-sm">Seu pagamento foi processado com sucesso</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center">
                          <CheckCircle size={20} className="text-cyan-400" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-cyan-400">Pedido Processado</p>
                        <p className="text-slate-400 text-sm">Em breve você receberá instruções por email</p>
                      </div>
                    </div>
                  </>
                )}

                {pedido.status === 'pendente' && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center animate-pulse">
                        <Clock size={20} className="text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-400">Aguardando Confirmação</p>
                      <p className="text-slate-400 text-sm">Seu pedido está sendo processado. Isso pode levar alguns minutos.</p>
                    </div>
                  </div>
                )}

                {pedido.status === 'cancelado' && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                        <AlertCircle size={20} className="text-red-400" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-red-400">Pedido Cancelado</p>
                      <p className="text-slate-400 text-sm">Entre em contato conosco via WhatsApp para mais informações</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <p className="text-slate-300 mb-4">Dúvidas sobre seu pedido?</p>
              <a
                href="https://wa.me/5511987756034?text=Olá! Tenho dúvidas sobre meu pedido"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Fale Conosco no WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Sem Resultado */}
        {!pedido && !erro && !loading && (
          <div className="text-center py-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl">
            <Search size={48} className="mx-auto mb-4 text-slate-500" />
            <p className="text-slate-400 text-lg">Digite o código do seu pedido acima para rastrear</p>
          </div>
        )}
      </div>
    </div>
  );
}
