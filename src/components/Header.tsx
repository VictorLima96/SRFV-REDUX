'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useTranslations, useLocale } from 'next-intl';

const localeOptions = [
  { code: 'pt-BR', flag: '🇧🇷', label: 'PT' },
  { code: 'en',    flag: '🇺🇸', label: 'EN' },
  { code: 'es',    flag: '🇪🇸', label: 'ES' },
  { code: 'zh',    flag: '🇨🇳', label: '中文' },
];

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [langOpen, setLangOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/?q=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname || '/', { locale: newLocale as any });
    setLangOpen(false);
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url || '';
  const currentLocale = localeOptions.find((l) => l.code === locale);

  return (
    <header className="sticky top-0 z-50 bg-srfv-bg-darkest/95 backdrop-blur border-b border-srfv-border">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/assets/images/logoz1.png" alt="SRFV Games" width={70} height={58} priority />
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-srfv-bg-dark border border-srfv-border rounded-full px-4 py-2 text-sm text-white placeholder-srfv-text-muted focus:outline-none focus:border-srfv-primary transition-colors"
          />
        </form>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 ml-auto">
          <Link href="/" className="text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors">{t('home')}</Link>
          <Link href="/games1" className="text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors">{t('games')}</Link>
          <Link href="/movies1" className="text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors">{t('movies')}</Link>
          <Link href="/art1" className="text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors">{t('art')}</Link>
        </nav>

        {/* Language Switcher */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors px-2 py-1 rounded-lg hover:bg-srfv-bg-dark"
          >
            <span>{currentLocale?.flag}</span>
            <span>{currentLocale?.label}</span>
            <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute right-0 mt-2 bg-srfv-bg-darker border border-srfv-border rounded-lg shadow-xl z-50 py-1 min-w-[120px]">
                {localeOptions.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-srfv-bg-dark transition-colors ${
                      l.code === locale ? 'text-srfv-primary' : 'text-srfv-text-secondary'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Auth */}
        <div className="hidden lg:flex items-center gap-3 ml-2">
          {user ? (
            <>
              <Link href="/alterarsenha" className="flex items-center gap-2 text-sm text-srfv-primary hover:underline">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-7 h-7 rounded-full object-cover border border-srfv-primary" />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-srfv-primary text-white flex items-center justify-center text-xs font-bold">{userName.charAt(0).toUpperCase()}</span>
                )}
                {userName}
              </Link>
              <button onClick={handleLogout} className="btn-outline-srfv text-xs px-4 py-1.5">{t('logout')}</button>
            </>
          ) : (
            <>
              <Link href="/signup" className="btn-outline-srfv text-xs px-4 py-1.5">{t('signup')}</Link>
              <Link href="/login" className="btn-primary-srfv text-xs px-4 py-1.5">{t('login')}</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden ml-auto text-white p-2"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-srfv-bg-darker border-t border-srfv-border px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="md:hidden mb-3">
            <input
              type="text"
              placeholder={t('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-srfv-bg-dark border border-srfv-border rounded-full px-4 py-2 text-sm text-white placeholder-srfv-text-muted focus:outline-none focus:border-srfv-primary"
            />
          </form>
          <Link href="/" onClick={() => setMenuOpen(false)} className="block text-sm text-srfv-text-secondary hover:text-srfv-primary">{t('home')}</Link>
          <Link href="/games1" onClick={() => setMenuOpen(false)} className="block text-sm text-srfv-text-secondary hover:text-srfv-primary">{t('games')}</Link>
          <Link href="/movies1" onClick={() => setMenuOpen(false)} className="block text-sm text-srfv-text-secondary hover:text-srfv-primary">{t('movies')}</Link>
          <Link href="/art1" onClick={() => setMenuOpen(false)} className="block text-sm text-srfv-text-secondary hover:text-srfv-primary">{t('art')}</Link>

          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-2 pt-2 border-t border-srfv-border">
            <span className="text-xs text-srfv-text-muted">{t('language')}:</span>
            <div className="flex gap-1">
              {localeOptions.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { switchLocale(l.code); setMenuOpen(false); }}
                  className={`text-xs px-2 py-1 rounded ${
                    l.code === locale ? 'bg-srfv-primary text-white' : 'bg-srfv-bg-dark text-srfv-text-secondary hover:text-white'
                  }`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-srfv-border flex gap-3">
            {user ? (
              <>
                <Link href="/alterarsenha" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm text-srfv-primary">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-7 h-7 rounded-full object-cover border border-srfv-primary" />
                  ) : (
                    <span className="w-7 h-7 rounded-full bg-srfv-primary text-white flex items-center justify-center text-xs font-bold">{userName.charAt(0).toUpperCase()}</span>
                  )}
                  {userName}
                </Link>
                <button onClick={handleLogout} className="btn-outline-srfv text-xs px-4 py-1.5">{t('logout')}</button>
              </>
            ) : (
              <>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="btn-outline-srfv text-xs px-4 py-1.5">{t('signup')}</Link>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-primary-srfv text-xs px-4 py-1.5">{t('login')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
