import Image from 'next/image';
import Link from 'next/link';

const featured = [
  { img: '/assets/images/cr.webp', title: 'Crash Team Racing', desc: 'Naughty Dog, 1999', href: '/play/crash' },
  { img: '/assets/images/te.webp', title: 'Tekken 3',          desc: 'Namco, 1997',       href: '/play/tekken' },
  { img: '/assets/images/ms.jpg',  title: 'Metal Slug',        desc: 'SNK, 1996',          href: '/play/metal' },
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
];

export default function GamesPage() {
  return (
    <div className="space-y-12">
      {/* ═══ FEATURED ═══ */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Games <span className="heading-em">em Destaque</span></h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((g) => (
            <Link key={g.title} href={g.href} className="card-srfv group overflow-hidden">
              <Image src={g.img} alt={g.title} width={400} height={250} className="w-full h-48 object-cover rounded-xl" />
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
          <h2 className="text-xl font-bold mb-6">Todos os <span className="heading-em">Games</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {allGames.map((g) => (
              <Link key={g.title} href={g.href} className="card-srfv group overflow-hidden">
                <div className="relative">
                  <Image src={g.img} alt={g.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-xl">
                    <span className="bg-srfv-primary text-white text-xs font-bold px-4 py-2 rounded-full">JOGAR</span>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{g.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ SIDEBAR ═══ */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="section-box">
            <h3 className="font-bold mb-4">Top <span className="heading-em">Arts</span></h3>
            <div className="space-y-3">
              {sidebarArts.map((a, i) => (
                <a key={a.title} href={a.img} download className="flex items-center gap-3 p-2 rounded-lg hover:bg-srfv-bg-dark transition-colors group">
                  <span className="text-srfv-primary font-bold text-lg w-6">{i + 1}</span>
                  <Image src={a.img} alt={a.title} width={48} height={48} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="text-sm font-medium group-hover:text-srfv-primary transition-colors">{a.title}</p>
                    <p className="text-xs text-srfv-text-muted">{a.downloads.toLocaleString()} downloads</p>
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
