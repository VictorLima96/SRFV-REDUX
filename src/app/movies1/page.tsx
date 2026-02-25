import Image from 'next/image';
import Link from 'next/link';

const featured = [
  { img: '/assets/movies/d.png', title: 'Donnie Darko',   href: '/play/donnie' },
  { img: '/assets/movies/p.png', title: 'Jogador nº 1',   href: '/play/jogador' },
  { img: '/assets/movies/c.png', title: 'Crash: o Filme',  href: '/play/crash-movie' },
  { img: '/assets/movies/s.webp',title: 'Sonic 2: o Filme', href: '/play/sonic' },
];

const creators = [
  { img: '/assets/images/vic.png',    name: 'Victor',  role: 'Fundador',    href: 'https://br.linkedin.com/in/victor-lima-da-silva-1a374b236' },
  { img: '/assets/images/ra.png',     name: 'Rafael',  role: 'Co-Fundador', href: 'https://www.youtube.com/@manoloeditsbr' },
  { img: '/assets/images/avatar-03.jpg', name: 'Knox', role: 'Editor',      href: 'https://www.youtube.com/@knoxmindovermatter' },
  { img: '/assets/images/sa.jfif',    name: 'Samuel',  role: 'Artista',     href: 'https://www.youtube.com/@anjoaguiel6933' },
  { img: '/assets/images/silvio.jfif',name: 'Silvio',  role: 'Dev',         href: 'https://br.linkedin.com/in/silvio-florentino-90a8861b9' },
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

export default function MoviesPage() {
  return (
    <div className="space-y-12">
      {/* ═══ FEATURED ═══ */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Filmes <span className="heading-em">em Destaque</span></h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((m) => (
            <Link key={m.title + m.href} href={m.href} className="card-srfv group overflow-hidden">
              <Image src={m.img} alt={m.title} width={300} height={200} className="w-full h-44 object-cover rounded-xl" />
              <p className="mt-2 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{m.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ═══ ALL MOVIES GRID ═══ */}
        <section className="flex-1">
          <h2 className="text-xl font-bold mb-6">Todos os <span className="heading-em">Filmes</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {allMovies.map((m) => (
              <Link key={m.title + m.href} href={m.href} className="card-srfv group overflow-hidden">
                <div className="relative">
                  <Image src={m.img} alt={m.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-xl">
                    <span className="text-4xl text-white">&#9654;</span>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{m.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ CREATORS SIDEBAR ═══ */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="section-box">
            <h3 className="font-bold mb-4">Criadores do <span className="heading-em">Site</span></h3>
            <div className="space-y-3">
              {creators.map((c) => (
                <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-srfv-bg-dark transition-colors group">
                  <Image src={c.img} alt={c.name} width={48} height={48} className="w-12 h-12 object-cover rounded-full" />
                  <div>
                    <p className="text-sm font-medium group-hover:text-srfv-primary transition-colors">{c.name}</p>
                    <p className="text-xs text-srfv-text-muted">{c.role}</p>
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
