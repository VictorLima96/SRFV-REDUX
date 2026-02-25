'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Você deve concordar com os Termos de Serviço.');
      return;
    }
    setError('');
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="section-box w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          <span className="heading-em">Cadastrar</span>
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 mb-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="form-input"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 accent-srfv-primary"
            />
            <span className="text-xs text-srfv-text-muted">
              Concordo com os{' '}
              <a href="https://policies.google.com/terms?hl=pt-BR" target="_blank" rel="noopener noreferrer" className="text-srfv-primary hover:underline">
                Termos de Serviço
              </a>
            </span>
          </label>

          <button type="submit" disabled={loading} className="btn-primary-srfv w-full disabled:opacity-50">
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-srfv-text-muted">
          Já possui uma conta?{' '}
          <Link href="/login" className="text-srfv-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
