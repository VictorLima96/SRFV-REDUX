'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useTranslations } from 'next-intl';

export default function SignupPage() {
  const t = useTranslations('Signup');
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
      setError(t('mustAgree'));
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
    <div className="flex items-center justify-center min-h-[60vh] relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-srfv-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-box w-full max-w-md relative animate-fade-in">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-srfv-primary to-transparent rounded-full" />

        <div className="flex justify-center mb-4 pt-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-srfv-primary to-red-600 flex items-center justify-center shadow-glow-sm">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg>
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
            <label className="block text-sm text-srfv-text-secondary mb-1.5 font-medium">{t('name')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
              placeholder={t('namePlaceholder')}
            />
          </div>
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
              minLength={6}
              className="form-input"
              placeholder={t('passwordPlaceholder')}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-srfv-primary rounded"
            />
            <span className="text-xs text-srfv-text-muted group-hover:text-srfv-text-secondary transition-colors">
              {t('agreeWith')}{' '}
              <a href="https://policies.google.com/terms?hl=pt-BR" target="_blank" rel="noopener noreferrer" className="text-srfv-primary hover:underline">
                {t('termsOfService')}
              </a>
            </span>
          </label>

          <button type="submit" disabled={loading} className="btn-primary-srfv w-full disabled:opacity-50 !py-3 text-base font-semibold">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('submitting')}
              </span>
            ) : t('submit')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="gradient-line w-full mb-3" />
          <p className="text-sm text-srfv-text-muted">
            {t('hasAccount')}{' '}
            <Link href="/login" className="text-srfv-primary hover:underline font-medium">{t('loginLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
