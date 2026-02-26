import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

const featured = [
  { img: '/assets/images/cr.webp', title: 'Crash Team Racing', desc: 'Naughty Dog, 1999', href: '/play/crash' },
  { img: '/assets/images/te.webp', title: 'Tekken 3',          desc: 'Namco, 1997',       href: '/play/tekken' },
  { img: '/assets/images/re33.png',  title: 'Metal Gear Solid',  desc: 'Konami, 1998',       href: '/play/mgs1' },
];

const sidebarArts = [
  { img: '/assets/arts/a.png',  title: 'Bumblebee',  downloads: 242 },
  { img: '/assets/arts/b.webp', title: 'Bomberman',  downloads: 1132 },
  { img: '/assets/arts/c.webp', title: 'Polygoth',   downloads: 738 },
];

const allGames = [
  { img: '/assets/images/cr.webp',   title: 'Crash Team Racing', href: '/play/crash' },
  { img: '/assets/images/ms.jpg',    title: 'Metal Slug 1',      href: '/play/metal' },
  { img: '/assets/images/te.webp',   title: 'Tekken 3',          href: '/play/tekken' },
  { img: '/assets/images/boob.png',  title: 'Bubsy 3D',          href: '/play/bubsy' },
  { img: '/assets/images/re33.png',  title: 'Resident Evil 3',   href: '/play/resident' },
  { img: '/assets/images/tom.png',   title: 'Tomb Raider II',    href: '/play/tomb' },
  { img: '/assets/images/stree.webp',title: 'Street Fighter 2',  href: '/play/street' },
  { img: '/assets/images/fif.png',   title: 'FIFA 2000',         href: '/play/fifa' },
  { img: '/assets/images/ff7.webp',  title: 'Final Fantasy 7',   href: '/play/ff7' },
  { img: '/assets/images/gran.jfif', title: 'Gran Turismo',      href: '/play/gt' },
  { img: '/assets/images/cs3.webp',  title: 'Crash Bandicoot 3', href: '/play/cb3' },
  { img: '/assets/images/tn3.jpg',   title: 'Tony Hawk 2',       href: '/play/tn2' },
  { img: '/assets/images/re33.png',  title: 'Metal Gear Solid',  href: '/play/mgs1' },
  { img: '/assets/images/ra.png',    title: 'Medal of Honor: Underground', href: '/play/mohu' },
  { img: '/assets/images/silvio.jfif', title: 'Legacy of Kain: Soul Reaver', href: '/play/soulreaver' },
];

export default async function GamesPage() {
  const t = await getTranslations('Games');

  return (
    <div className="space-y-14">
      {/* ═══ FEATURED ═══ */}
      <section>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{t('featured')} <span className="heading-em">{t('featuredHighlight')}</span></h1>
          <div className="gradient-line mt-2 w-20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((g) => (
            <Link key={g.title} href={g.href} className="card-srfv group overflow-hidden">
              <div className="relative overflow-hidden rounded-srfv-xs">
                <Image src={g.img} alt={g.title} width={400} height={250} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="bg-srfv-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-glow-sm">{t('play')}</span>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-semibold group-hover:text-srfv-primary transition-colors">{g.title}</h3>
                <p className="text-xs text-srfv-text-muted">{g.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ═══ ALL GAMES GRID ═══ */}
        <section className="flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-bold">{t('allGames')} <span className="heading-em">{t('allGamesHighlight')}</span></h2>
            <div className="gradient-line mt-2 w-16" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {allGames.map((g) => (
              <Link key={g.title} href={g.href} className="card-srfv group overflow-hidden">
                <div className="relative overflow-hidden rounded-srfv-xs">
                  <Image src={g.img} alt={g.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{g.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ SIDEBAR ═══ */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="section-box lg:sticky lg:top-24">
            <h3 className="font-bold mb-4">{t('topArts')} <span className="heading-em">{t('topArtsHighlight')}</span></h3>
            <div className="space-y-3">
              {sidebarArts.map((a, i) => (
                <a key={a.title} href={a.img} download className="flex items-center gap-3 p-2.5 rounded-srfv-xs hover:bg-white/5 border border-transparent hover:border-srfv-border transition-all duration-200 group">
                  <span className="text-srfv-primary font-bold text-lg w-6 text-center">{i + 1}</span>
                  <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                    <Image src={a.img} alt={a.title} width={48} height={48} className="w-12 h-12 object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-srfv-primary transition-colors">{a.title}</p>
                    <p className="text-xs text-srfv-text-muted">{a.downloads.toLocaleString()} {t('downloads')}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
