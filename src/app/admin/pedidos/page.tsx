'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Copy, Check, LogOut } from 'lucide-react';

interface Pedido {
  id: string;
  tipo: string;
  preco: number;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
    cpf_cnpj: string;
  };
  status: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export default function PedidosAdminPage() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const fetchPedidos = async () => {
    try {
      const response = await fetch('/api/pedidos');
      const data = await response.json();
      setPedidos(data.reverse());
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const atualizarStatus = async (id: string, novoStatus: string) => {
    try {
      const response = await fetch(`/api/pedidos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus }),
      });
      const updated = await response.json();
      setPedidos(pedidos.map(p => p.id === id ? updated : p));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
      case 'pendente':
        return 'bg-amber-500/20 border-amber-500/50 text-amber-400';
      case 'cancelado':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      default:
        return 'bg-slate-500/20 border-slate-500/50 text-slate-400';
    }
  };

  const getTipoCertificado = (tipo: string) => {
    return tipo === 'a1-pj' ? 'Certificado A1 PJ' : 'Certificado A1 PF';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition">
            <ArrowLeft size={20} />
            Voltar
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition font-semibold"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">Painel de Pedidos</h1>
          <p className="text-slate-400">Total de pedidos: {pedidos.length}</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Carregando pedidos...</p>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl">
            <p className="text-slate-400 text-lg">Nenhum pedido registrado ainda</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Informações do Pedido */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Código do Pedido</p>
                      <div className="flex items-center gap-2">
                        <code className="bg-slate-900/50 px-3 py-2 rounded-lg text-cyan-400 font-mono text-sm">{pedido.id}</code>
                        <button
                          onClick={() => copyToClipboard(pedido.id, pedido.id)}
                          className="p-2 hover:bg-slate-700/50 rounded-lg transition"
                        >
                          {copiedId === pedido.id ? (
                            <Check size={18} className="text-emerald-400" />
                          ) : (
                            <Copy size={18} className="text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-1">Tipo de Certificado</p>
                      <p className="font-semibold">{getTipoCertificado(pedido.tipo)}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-1">Valor</p>
                      <p className="text-lg font-bold text-cyan-400">R$ {pedido.preco.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Informações do Cliente */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Cliente</p>
                      <p className="font-semibold">{pedido.cliente.nome}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-1">Email</p>
                      <p className="text-sm">{pedido.cliente.email}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-1">Telefone</p>
                      <p className="text-sm">{pedido.cliente.telefone}</p>
                    </div>
                  </div>
                </div>

                {/* Status e Data */}
                <div className="mt-6 pt-6 border-t border-slate-700/50 grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Status</p>
                    <select
                      value={pedido.status}
                      onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm font-semibold transition ${getStatusColor(pedido.status)} bg-transparent`}
                    >
                      <option value="pendente">Pendente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Data de Criação</p>
                    <p className="text-sm">{new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Última Atualização</p>
                    <p className="text-sm">{new Date(pedido.dataAtualizacao).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
