'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/?q=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url || '';

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
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-srfv-bg-dark border border-srfv-border rounded-full px-4 py-2 text-sm text-white placeholder-srfv-text-muted focus:outline-none focus:border-srfv-primary transition-colors"
          />
        </form>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 ml-auto">
          <Link href="/" className="text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors">Home</Link>
          <Link href="/games1" className="text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors">Games</Link>
          <Link href="/movies1" className="text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors">Movies</Link>
          <Link href="/art1" className="text-sm text-srfv-text-secondary hover:text-srfv-primary transition-colors">Art</Link>
        </nav>

        {/* Auth */}
        <div className="hidden lg:flex items-center gap-3 ml-4">
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
              <button onClick={handleLogout} className="btn-outline-srfv text-xs px-4 py-1.5">Sair</button>
            </>
          ) : (
            <>
              <Link href="/signup" className="btn-outline-srfv text-xs px-4 py-1.5">Cadastrar</Link>
              <Link href="/login" className="btn-primary-srfv text-xs px-4 py-1.5">Login</Link>
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
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-srfv-bg-dark border border-srfv-border rounded-full px-4 py-2 text-sm text-white placeholder-srfv-text-muted focus:outline-none focus:border-srfv-primary"
            />
          </form>
          <Link href="/" onClick={() => setMenuOpen(false)} className="block text-sm text-srfv-text-secondary hover:text-srfv-primary">Home</Link>
          <Link href="/games1" onClick={() => setMenuOpen(false)} className="block text-sm text-srfv-text-secondary hover:text-srfv-primary">Games</Link>
          <Link href="/movies1" onClick={() => setMenuOpen(false)} className="block text-sm text-srfv-text-secondary hover:text-srfv-primary">Movies</Link>
          <Link href="/art1" onClick={() => setMenuOpen(false)} className="block text-sm text-srfv-text-secondary hover:text-srfv-primary">Art</Link>
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
                <button onClick={handleLogout} className="btn-outline-srfv text-xs px-4 py-1.5">Sair</button>
              </>
            ) : (
              <>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="btn-outline-srfv text-xs px-4 py-1.5">Cadastrar</Link>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-primary-srfv text-xs px-4 py-1.5">Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
