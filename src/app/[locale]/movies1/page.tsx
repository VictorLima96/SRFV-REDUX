import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

const featured = [
  { img: '/assets/movies/d.png', title: 'Donnie Darko',   href: '/play/donnie' },
  { img: '/assets/movies/p.png', title: 'Jogador nº 1',   href: '/play/jogador' },
  { img: '/assets/movies/c.png', title: 'Crash: o Filme',  href: '/play/crash-movie' },
  { img: '/assets/movies/s.webp',title: 'Sonic 2: o Filme', href: '/play/sonic' },
];

const creators = [
  { img: '/assets/images/vic.png',    name: 'Victor',  roleKey: 'roleFounder' as const,   href: 'https://br.linkedin.com/in/victor-lima-da-silva-1a374b236' },
  { img: '/assets/images/ra.png',     name: 'Rafael',  roleKey: 'roleCofounder' as const, href: 'https://www.youtube.com/@manoloeditsbr' },
  { img: '/assets/images/avatar-03.jpg', name: 'Knox', roleKey: 'roleEditor' as const,    href: 'https://www.youtube.com/@knoxmindovermatter' },
  { img: '/assets/images/sa.jfif',    name: 'Samuel',  roleKey: 'roleArtist' as const,    href: 'https://www.youtube.com/@anjoaguiel6933' },
  { img: '/assets/images/silvio.jfif',name: 'Silvio',  roleKey: 'roleDev' as const,       href: 'https://br.linkedin.com/in/silvio-florentino-90a8861b9' },
];

const allMovies = [
  { img: '/assets/movies/d.png',  title: 'Donnie Darko',         href: '/play/donnie' },
  { img: '/assets/movies/c.png',  title: 'Crash: o Filme',       href: '/play/crash-movie' },
  { img: '/assets/movies/t.jpg',  title: 'Tekken',               href: '/play/tekken-movie' },
  { img: '/assets/movies/s.jpg',  title: 'Homem Aranha: Lótus',  href: '/play/spider' },
  { img: '/assets/movies/p.png',  title: 'Jogador nº 1',         href: '/play/jogador' },
  { img: '/assets/movies/r.jpg',  title: 'Resident Evil',        href: '/play/resident-movie' },
  { img: '/assets/movies/m.webp', title: 'Super Mario Bros',     href: '/play/mario' },
  { img: '/assets/movies/s.webp', title: 'Sonic 2: o Filme',     href: '/play/sonic' },
];

export default async function MoviesPage() {
  const t = await getTranslations('Movies');

  return (
    <div className="space-y-14">
      {/* ═══ FEATURED ═══ */}
      <section>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{t('featured')} <span className="heading-em">{t('featuredHighlight')}</span></h1>
          <div className="gradient-line mt-2 w-20" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((m) => (
            <Link key={m.title + m.href} href={m.href} className="card-srfv group overflow-hidden">
              <div className="relative overflow-hidden rounded-srfv-xs">
                <Image src={m.img} alt={m.title} width={300} height={200} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{m.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ═══ ALL MOVIES GRID ═══ */}
        <section className="flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-bold">{t('allMovies')} <span className="heading-em">{t('allMoviesHighlight')}</span></h2>
            <div className="gradient-line mt-2 w-16" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {allMovies.map((m) => (
              <Link key={m.title + m.href} href={m.href} className="card-srfv group overflow-hidden">
                <div className="relative overflow-hidden rounded-srfv-xs">
                  <Image src={m.img} alt={m.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{m.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ CREATORS SIDEBAR ═══ */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="section-box lg:sticky lg:top-24">
            <h3 className="font-bold mb-4">{t('creators')} <span className="heading-em">{t('creatorsHighlight')}</span></h3>
            <div className="space-y-3">
              {creators.map((c) => (
                <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-srfv-xs hover:bg-white/5 border border-transparent hover:border-srfv-border transition-all duration-200 group">
                  <div className="relative flex-shrink-0">
                    <Image src={c.img} alt={c.name} width={48} height={48} className="w-12 h-12 object-cover rounded-full ring-2 ring-srfv-border group-hover:ring-srfv-primary/50 transition-all" />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-srfv-primary transition-colors">{c.name}</p>
                    <p className="text-xs text-srfv-text-muted">{t(c.roleKey)}</p>
                  </div>
                  <svg className="w-4 h-4 text-srfv-text-dim ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
