'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function AlterarSenhaPage() {
  const { user, loading: authLoading, updateProfile } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      setEmail(user.email || '');
      setName(user.user_metadata?.name || '');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const updates: { email?: string; password?: string; name?: string } = {};
    if (email && email !== user?.email) updates.email = email;
    if (password) updates.password = password;
    if (name && name !== user?.user_metadata?.name) updates.name = name;

    if (Object.keys(updates).length === 0) {
      setError('Nenhuma alteração detectada.');
      setLoading(false);
      return;
    }

    const { error } = await updateProfile(updates);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setSuccess('Dados alterados com sucesso!');
      setPassword('');
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-srfv-text-muted">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="section-box w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Alterar <span className="heading-em">Dados</span>
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 mb-4 text-sm text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg px-4 py-3 mb-4 text-sm text-green-300">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1">Novo Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1">Nova Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Deixe vazio para manter"
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary-srfv w-full disabled:opacity-50">
            {loading ? 'Salvando...' : 'Alterar'}
          </button>
        </form>
      </div>
    </div>
  );
}
