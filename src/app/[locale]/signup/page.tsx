'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/AuthContext';
import type { OAuthProvider } from '@/lib/AuthContext';
import { useTranslations } from 'next-intl';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
      <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
    </svg>
  );
}

export default function SignupPage() {
  const t = useTranslations('Signup');
  const { signUp, signInWithProvider } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

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

  const handleOAuth = async (provider: OAuthProvider) => {
    setError('');
    setOauthLoading(provider);
    const { error } = await signInWithProvider(provider);
    if (error) {
      setError(error);
      setOauthLoading(null);
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

        {/* OAuth Providers */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            disabled={!!oauthLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-white/10 backdrop-blur-sm transition-all duration-200 text-sm font-medium text-white disabled:opacity-50 group"
          >
            {oauthLoading === 'google' ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {t('continueWith', { provider: 'Google' })}
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('azure')}
            disabled={!!oauthLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00a4ef]/10 to-[#00a4ef]/5 hover:from-[#00a4ef]/20 hover:to-[#00a4ef]/10 border border-[#00a4ef]/20 backdrop-blur-sm transition-all duration-200 text-sm font-medium text-white disabled:opacity-50 group"
          >
            {oauthLoading === 'azure' ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <MicrosoftIcon />
            )}
            {t('continueWith', { provider: 'Microsoft' })}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-xs text-srfv-text-muted uppercase tracking-wider">{t('orEmail')}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

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
