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
    <header className="sticky top-0 z-50 bg-srfv-bg-darkest/70 backdrop-blur-xl border-b border-srfv-border shadow-lg shadow-black/20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <Image src="/assets/images/srfv-logo.png" alt="SRFV Games" width={70} height={58} priority
            className="transition-transform duration-300 group-hover:scale-105 drop-shadow-lg" />
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-srfv-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder={t('search')} value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.04] border border-srfv-border rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-srfv-text-dim focus:outline-none focus:border-srfv-primary/50 focus:bg-white/[0.07] focus:shadow-glow-sm transition-all duration-300" />
          </div>
        </form>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {[
            { href: '/', label: t('home') },
            { href: '/games1', label: t('games') },
            { href: '/movies1', label: t('movies') },
            { href: '/art1', label: t('art') },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="relative px-3.5 py-2 text-sm text-srfv-text-secondary hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language Switcher */}
        <div className="relative hidden lg:block">
          <button onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 text-sm text-srfv-text-secondary hover:text-white transition-all duration-200 px-2.5 py-1.5 rounded-lg hover:bg-white/5">
            <span>{currentLocale?.flag}</span>
            <span className="text-xs">{currentLocale?.label}</span>
            <svg className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute right-0 mt-2 bg-srfv-bg-darker/95 backdrop-blur-xl border border-srfv-border rounded-srfv-xs shadow-2xl z-50 py-1.5 min-w-[130px] animate-fade-in">
                {localeOptions.map((l) => (
                  <button key={l.code} onClick={() => switchLocale(l.code)}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm hover:bg-white/5 transition-all duration-200 ${
                      l.code === locale ? 'text-srfv-primary' : 'text-srfv-text-secondary hover:text-white'}`}>
                    <span>{l.flag}</span><span>{l.label}</span>
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
              <Link href="/update" className="flex items-center gap-2 text-sm text-srfv-text-secondary hover:text-white transition-colors group">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-srfv-primary/50 group-hover:ring-srfv-primary transition-all" />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-srfv-primary to-red-600 text-white flex items-center justify-center text-xs font-bold shadow-glow-sm">{userName.charAt(0).toUpperCase()}</span>
                )}
                <span className="group-hover:text-srfv-primary transition-colors">{userName}</span>
              </Link>
              <button onClick={handleLogout} className="btn-outline-srfv text-xs px-4 py-1.5">{t('logout')}</button>
            </>
          ) : (
            <>
              <Link href="/signup" className="btn-outline-srfv text-xs px-4 py-1.5">{t('signup')}</Link>
              <Link href="/login" className="btn-primary-srfv text-xs px-5 py-1.5">{t('login')}</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden ml-auto text-white p-2 hover:bg-white/5 rounded-lg transition-colors" aria-label="Menu">
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
        <div className="lg:hidden bg-srfv-bg-darker/95 backdrop-blur-xl border-t border-srfv-border px-4 sm:px-6 py-4 space-y-3 animate-fade-in">
          <form onSubmit={handleSearch} className="md:hidden mb-3">
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-srfv-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder={t('search')} value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.04] border border-srfv-border rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-srfv-text-dim focus:outline-none focus:border-srfv-primary/50" />
            </div>
          </form>
          {[
            { href: '/', label: t('home') },
            { href: '/games1', label: t('games') },
            { href: '/movies1', label: t('movies') },
            { href: '/art1', label: t('art') },
          ].map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className="block text-sm text-srfv-text-secondary hover:text-white py-1.5 transition-colors">{item.label}</Link>
          ))}

          <div className="flex items-center gap-2 pt-3 border-t border-srfv-border">
            <span className="text-xs text-srfv-text-muted">{t('language')}:</span>
            <div className="flex gap-1.5">
              {localeOptions.map((l) => (
                <button key={l.code} onClick={() => { switchLocale(l.code); setMenuOpen(false); }}
                  className={`text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200 ${
                    l.code === locale ? 'bg-srfv-primary text-white shadow-glow-sm' : 'bg-white/5 text-srfv-text-secondary hover:text-white'}`}>
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-srfv-border flex gap-3">
            {user ? (
              <>
                <Link href="/update" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm text-srfv-text-secondary hover:text-white">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-srfv-primary/50" />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-srfv-primary to-red-600 text-white flex items-center justify-center text-xs font-bold">{userName.charAt(0).toUpperCase()}</span>
                  )}
                  {userName}
                </Link>
                <button onClick={handleLogout} className="btn-outline-srfv text-xs px-4 py-1.5">{t('logout')}</button>
              </>
            ) : (
              <>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="btn-outline-srfv text-xs px-4 py-1.5">{t('signup')}</Link>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-primary-srfv text-xs px-5 py-1.5">{t('login')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
