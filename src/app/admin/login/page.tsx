'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || 'Senha incorreta');
        return;
      }

      // Login bem-sucedido, redirecionar para painel
      router.push('/admin/pedidos');
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4 shadow-lg shadow-cyan-500/50">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black mb-2">Painel Admin</h1>
          <p className="text-slate-400">Digite sua senha para acessar</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Erro */}
          {erro && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{erro}</p>
            </div>
          )}

          {/* Input de Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-semibold mb-2">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition"
              required
              disabled={loading}
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white py-3 rounded-xl font-bold transition duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            {loading ? 'Autenticando...' : 'Acessar Painel'}
          </button>
        </form>

        {/* Informações */}
        <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl text-center">
          <p className="text-slate-400 text-sm">
            Esqueceu a senha? Entre em contato com o administrador.
          </p>
        </div>
      </div>
    </div>
  );
}
