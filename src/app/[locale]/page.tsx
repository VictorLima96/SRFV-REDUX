import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

/* ── static data (titles are proper nouns, not translated) ── */

const arts = [
  { img: '/assets/arts/a.png',    title: 'Bumblebee',   href: '/assets/arts/a.png' },
  { img: '/assets/arts/b.webp',   title: 'Bomberman',   href: '/assets/arts/b.webp' },
  { img: '/assets/arts/e.webp',   title: 'Bob Esponja', href: '/assets/arts/e.webp' },
  { img: '/assets/arts/c.webp',   title: 'Polygoth',    href: '/assets/arts/c.webp' },
  { img: '/assets/arts/k.webp',   title: 'Knuckles',    href: '/assets/arts/k.webp' },
  { img: '/assets/arts/m.webp',   title: 'Luigi',       href: '/assets/arts/m.webp' },
  { img: '/assets/arts/n.webp',   title: 'Pizza Tower',  href: '/assets/arts/n.webp' },
  { img: '/assets/arts/s.webp',   title: 'Shadow',      href: '/assets/arts/s.webp' },
];

const libraryGames = [
  { img: '/assets/images/ms.jpg',  title: 'Metal Slug',       desc: 'Super Vehicle-001 — SNK, 1996', href: '/play/metal' },
  { img: '/assets/images/cr.webp', title: 'Crash Team Racing', desc: 'Naughty Dog, 1999',             href: '/play/crash' },
  { img: '/assets/images/te.webp', title: 'Tekken 3',         desc: 'Namco, 1997',                   href: '/play/tekken' },
];

const movies = [
  { img: '/assets/movies/d.png',  title: 'Donnie Darko',         href: '/play/donnie' },
  { img: '/assets/movies/c.png',  title: 'Crash: o Filme',       href: '/play/crash-movie' },
  { img: '/assets/movies/t.jpg',  title: 'Tekken',               href: '/play/tekken-movie' },
  { img: '/assets/movies/s.jpg',  title: 'Homem Aranha: Lótus',  href: '/play/spider' },
  { img: '/assets/movies/p.png',  title: 'Jogador nº 1',         href: '/play/jogador' },
  { img: '/assets/movies/r.jpg',  title: 'Resident Evil',        href: '/play/resident-movie' },
  { img: '/assets/movies/m.webp', title: 'Super Mario Bros',     href: '/play/mario' },
  { img: '/assets/movies/s.webp', title: 'Sonic 2: o Filme',     href: '/play/sonic' },
];

const services = [
  { img: '/assets/images/gato-buxa.jpg', titleKey: 'serviceFreePlay' as const,    descKey: 'serviceFreePlayDesc' as const, icon: '🎮' },
  { img: '/assets/images/bolsonaro.jpg', titleKey: 'serviceMovies' as const,      descKey: 'serviceMoviesDesc' as const, icon: '🎬' },
  { img: '/assets/images/coisas.jpg', titleKey: 'serviceCommunityArt' as const, descKey: 'serviceCommunityArtDesc' as const, icon: '🎨' },
];

/* ── page ─────────────────────────────────────────────────── */

export default async function HomePage() {
  const t = await getTranslations('Home');

  return (
    <div className="space-y-16">
      {/* ═══ HERO BANNER ═══ */}
      <section className="relative overflow-hidden rounded-srfv">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-srfv-bg-darker via-srfv-bg-darkest to-srfv-bg-darker" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-srfv-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-srfv-primary/10 border border-srfv-primary/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-srfv-primary animate-pulse" />
              <span className="text-xs text-srfv-primary font-medium">SRFV Games — Free to Play</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
              {t('welcomeTo')}{' '}
              <span className="heading-em">SRFV Games</span>
            </h1>
            <p className="text-srfv-text-secondary mb-8 max-w-lg text-base leading-relaxed">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link href="/play/resident" className="btn-primary-srfv">
                {t('playCTA')}
              </Link>
              <Link href="/games1" className="btn-outline-srfv">
                {t('viewAllGames')}
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 max-w-md">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-srfv-primary/30 to-red-600/30 rounded-srfv blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <Image
                src="/assets/images/re33.png"
                alt="Resident Evil 3 - Nemesis"
                width={480}
                height={320}
                className="relative rounded-srfv w-full h-auto object-cover shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ POPULAR ARTS ═══ */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">{t('popularArts')} <span className="heading-em">{t('popularArtsHighlight')}</span></h2>
            <div className="gradient-line mt-2 w-20" />
          </div>
          <Link href="/art1" className="text-sm text-srfv-text-muted hover:text-srfv-primary transition-colors flex items-center gap-1">
            {t('viewAll')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {arts.map((a) => (
            <a key={a.title} href={a.href} download className="card-srfv group overflow-hidden">
              <div className="relative overflow-hidden rounded-srfv-xs">
                <Image src={a.img} alt={a.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-white">⬇ Download</span>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{a.title}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ GAMING LIBRARY ═══ */}
      <section className="section-box">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{t('gameLibrary')} <span className="heading-em">{t('gameLibraryHighlight')}</span></h2>
          <div className="gradient-line mt-2 w-20" />
        </div>
        <div className="space-y-3">
          {libraryGames.map((g, i) => (
            <Link key={g.title} href={g.href}
              className="flex items-center gap-4 p-4 rounded-srfv-sm bg-white/[0.03] border border-srfv-border hover:border-srfv-primary/30 hover:bg-white/[0.06] transition-all duration-300 group"
              style={{ animationDelay: `${i * 100}ms` }}>
              <div className="relative overflow-hidden rounded-srfv-xs flex-shrink-0">
                <Image src={g.img} alt={g.title} width={100} height={70} className="w-24 h-16 object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-srfv-primary transition-colors">{g.title}</h3>
                <p className="text-xs text-srfv-text-muted truncate">{g.desc}</p>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-srfv-primary/10 flex items-center justify-center group-hover:bg-srfv-primary/20 group-hover:shadow-glow-sm transition-all duration-300">
                <svg className="w-4 h-4 text-srfv-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/games1" className="btn-outline-srfv">{t('viewAllGames')}</Link>
        </div>
      </section>

      {/* ═══ FEATURED MOVIES ═══ */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">{t('featuredMovies')} <span className="heading-em">{t('featuredMoviesHighlight')}</span></h2>
            <div className="gradient-line mt-2 w-20" />
          </div>
          <Link href="/movies1" className="text-sm text-srfv-text-muted hover:text-srfv-primary transition-colors flex items-center gap-1">
            {t('viewAllMovies')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((m) => (
            <Link key={m.title} href={m.href} className="card-srfv group overflow-hidden">
              <div className="relative overflow-hidden rounded-srfv-xs">
                <Image src={m.img} alt={m.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{m.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">{t('howItWorks')} <span className="heading-em">{t('howItWorksHighlight')}</span></h2>
          <div className="gradient-line mx-auto mt-3 w-20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.titleKey} className="card-srfv text-center group" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="relative overflow-hidden rounded-srfv-xs mb-4">
                <Image src={s.img} alt={t(s.titleKey)} width={400} height={250} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-srfv-bg-darkest/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-2xl drop-shadow-lg">{s.icon}</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-srfv-primary transition-colors">{t(s.titleKey)}</h3>
              <p className="text-xs text-srfv-text-secondary leading-relaxed">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/login" className="btn-primary-srfv">{t('loginCTA')}</Link>
        </div>
      </section>
    </div>
  );
}
