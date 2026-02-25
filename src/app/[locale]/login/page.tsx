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
    <div className="flex items-center justify-center min-h-[60vh] relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-srfv-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-box w-full max-w-md relative animate-fade-in">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-srfv-primary to-transparent rounded-full" />

        <div className="flex justify-center mb-4 pt-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-srfv-primary to-red-600 flex items-center justify-center shadow-glow-sm">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" /></svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          <span className="heading-em">{t('title')}</span>
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 backdrop-blur-sm rounded-srfv-xs px-4 py-3 mb-4 text-sm text-red-300 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-srfv-text-secondary mb-1.5 font-medium">{t('email')}</label>
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
            <label className="block text-sm text-srfv-text-secondary mb-1.5 font-medium">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary-srfv w-full disabled:opacity-50 !py-3 text-base font-semibold">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('submitting')}
              </span>
            ) : t('submit')}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <div className="gradient-line w-full" />
          <Link href="/update" className="text-sm text-srfv-text-muted hover:text-srfv-primary transition-colors">
            {t('forgotPassword')}
          </Link>
          <p className="text-sm text-srfv-text-muted">
            {t('noAccount')}{' '}
            <Link href="/signup" className="text-srfv-primary hover:underline font-medium">{t('signupLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
