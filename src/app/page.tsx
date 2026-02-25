import Image from 'next/image';
import Link from 'next/link';

/* ── static data ─────────────────────────────────────────────── */

const arts = [
  { img: '/assets/arts/a.png',    title: 'Bumblebee',  href: '/assets/arts/a.png' },
  { img: '/assets/arts/b.webp',   title: 'Bomberman',  href: '/assets/arts/b.webp' },
  { img: '/assets/arts/e.webp',   title: 'Bob Esponja',href: '/assets/arts/e.webp' },
  { img: '/assets/arts/c.webp',   title: 'Polygoth',   href: '/assets/arts/c.webp' },
  { img: '/assets/arts/k.webp',   title: 'Knuckles',   href: '/assets/arts/k.webp' },
  { img: '/assets/arts/m.webp',   title: 'Luigi',      href: '/assets/arts/m.webp' },
  { img: '/assets/arts/n.webp',   title: 'Pizza Tower', href: '/assets/arts/n.webp' },
  { img: '/assets/arts/s.webp',   title: 'Shadow',     href: '/assets/arts/s.webp' },
];

const libraryGames = [
  { img: '/assets/images/ms.jpg',  title: 'Metal Slug',     desc: 'Super Vehicle-001 — SNK, 1996', href: '/play/metal' },
  { img: '/assets/images/cr.webp', title: 'Crash Team Racing', desc: 'Naughty Dog, 1999',           href: '/play/crash' },
  { img: '/assets/images/te.webp', title: 'Tekken 3',       desc: 'Namco, 1997',                    href: '/play/tekken' },
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
  { img: '/assets/images/service-01.jpg', title: 'Jogue Grátis',   desc: 'Jogos clássicos de PS1, Arcade e mais rodando direto no navegador.' },
  { img: '/assets/images/service-02.jpg', title: 'Filmes Online',  desc: 'Assista filmes completos sobre games e cultura pop.' },
  { img: '/assets/images/service-03.jpg', title: 'Arte da Comunidade', desc: 'Baixe e envie artes feitas pela comunidade SRFV.' },
];

/* ── page ─────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* ═══ BANNER ═══ */}
      <section className="section-box flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Bem-Vindo ao <span className="heading-em">SRFV Games</span>
          </h1>
          <p className="text-srfv-text-secondary mb-6 max-w-lg">
            Jogue clássicos do PS1, assista filmes icônicos e baixe artes da comunidade — tudo grátis, direto no navegador.
          </p>
          <Link href="/play/resident" className="btn-primary-srfv inline-block">
            Jogar Resident Evil 3
          </Link>
        </div>
        <div className="w-full md:w-1/2 max-w-md">
          <Image
            src="/assets/images/re33.png"
            alt="Resident Evil 3 - Nemesis"
            width={480}
            height={320}
            className="rounded-srfv w-full h-auto object-cover"
            priority
          />
        </div>
      </section>

      {/* ═══ POPULAR ARTS ═══ */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Artes <span className="heading-em">Populares</span></h2>
          <Link href="/art1" className="text-sm text-srfv-primary hover:underline">Ver todas &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {arts.map((a) => (
            <a key={a.title} href={a.href} download className="card-srfv group overflow-hidden">
              <Image src={a.img} alt={a.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover rounded-xl" />
              <p className="mt-2 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{a.title}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ GAMING LIBRARY ═══ */}
      <section className="section-box">
        <h2 className="text-xl font-bold mb-6">Biblioteca de <span className="heading-em">Games</span></h2>
        <div className="space-y-4">
          {libraryGames.map((g) => (
            <Link key={g.title} href={g.href} className="flex items-center gap-4 p-3 rounded-srfv-sm bg-srfv-bg-dark hover:bg-srfv-bg-darker transition-colors group">
              <Image src={g.img} alt={g.title} width={100} height={70} className="w-24 h-16 object-cover rounded-xl flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold group-hover:text-srfv-primary transition-colors">{g.title}</h3>
                <p className="text-xs text-srfv-text-muted">{g.desc}</p>
              </div>
              <span className="ml-auto text-srfv-primary text-lg">&#9654;</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/games1" className="btn-outline-srfv inline-block">Ver todos os games</Link>
        </div>
      </section>

      {/* ═══ FEATURED MOVIES ═══ */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filmes <span className="heading-em">em Destaque</span></h2>
          <Link href="/movies1" className="text-sm text-srfv-primary hover:underline">Ver todos &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((m) => (
            <Link key={m.title} href={m.href} className="card-srfv group overflow-hidden">
              <div className="relative">
                <Image src={m.img} alt={m.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-xl">
                  <span className="text-3xl text-white">&#9654;</span>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-center group-hover:text-srfv-primary transition-colors">{m.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-center">Como <span className="heading-em">Funciona</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card-srfv text-center">
              <Image src={s.img} alt={s.title} width={400} height={250} className="w-full h-44 object-cover rounded-xl mb-4" />
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-xs text-srfv-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/login" className="btn-primary-srfv inline-block">Login / Cadastrar</Link>
        </div>
      </section>
    </div>
  );
}
