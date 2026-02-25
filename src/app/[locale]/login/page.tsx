'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('Login');
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="section-box w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          <span className="heading-em">{t('title')}</span>
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 mb-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder={t('emailPlaceholder')}
            />
          </div>
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary-srfv w-full disabled:opacity-50">
            {loading ? t('submitting') : t('submit')}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link href="/alterarsenha" className="text-sm text-srfv-text-muted hover:text-srfv-primary transition-colors">
            {t('forgotPassword')}
          </Link>
          <p className="text-sm text-srfv-text-muted">
            {t('noAccount')}{' '}
            <Link href="/signup" className="text-srfv-primary hover:underline">{t('signupLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
