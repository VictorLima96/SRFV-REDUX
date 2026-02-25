import Image from 'next/image';

const popularArts = [
  { img: '/assets/arts/a.png',  title: 'Bumblebee',  views: '10,495' },
  { img: '/assets/arts/b.webp', title: 'Bomberman',  views: '9,345' },
  { img: '/assets/arts/k.webp', title: 'Knuckles',   views: '7,141' },
  { img: '/assets/arts/s.webp', title: 'Shadow',     views: '5,398' },
];

const allArts = [
  { img: '/assets/arts/a.png',           title: 'Bumblebee',    author: 'Fallen',      rating: 4.1, downloads: 242 },
  { img: '/assets/arts/b.webp',          title: 'Bomberman',    author: 'Victor',      rating: 4.4, downloads: 1132 },
  { img: '/assets/arts/e.webp',          title: 'Bob Esponja',  author: 'Steam-X',     rating: 4.8, downloads: 346 },
  { img: '/assets/arts/m.webp',          title: 'Luigi',        author: 'ElTopoGira',  rating: 4.2, downloads: 9471 },
  { img: '/assets/arts/n.webp',          title: 'Pizza Tower',  author: 'Max 3D',      rating: 3.1, downloads: 1120 },
  { img: '/assets/arts/s.webp',          title: 'Shadow',       author: 'FonSekito',   rating: 4.1, downloads: 329 },
  { img: '/assets/arts/k.webp',          title: 'Knuckles',     author: 'CrashGamis',  rating: 3.9, downloads: 2323 },
  { img: '/assets/arts/c.webp',          title: 'Polygoth',     author: 'Legendary',   rating: 4.9, downloads: 738 },
  { img: '/assets/images/game-03.jpg',   title: 'Space Boy',    author: 'Cyborg',      rating: 3.4, downloads: 198 },
  { img: '/assets/arts/to.webp',         title: 'TO MA TO',     author: 'Anjo_Aguiel', rating: 4.3, downloads: 3301 },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  return (
    <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < full ? '★' : i === full && half ? '★' : '☆'}</span>
      ))}
      <span className="text-srfv-text-muted ml-1">{rating}</span>
    </div>
  );
}

export default function ArtPage() {
  return (
    <div className="space-y-12">
      {/* ═══ DISCORD BANNER ═══ */}
      <section className="section-box flex flex-col md:flex-row items-center gap-6">
        <Image src="/assets/arts/discord.jpg" alt="Discord SRFV" width={400} height={200} className="w-full md:w-1/2 rounded-xl object-cover" />
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold mb-2">Envie sua <span className="heading-em">Arte!</span></h1>
          <p className="text-sm text-srfv-text-secondary mb-4">Entre no nosso Discord, faça upload das suas artes e ganhe destaque na comunidade SRFV.</p>
          <div className="flex gap-6 justify-center md:justify-start mb-4">
            <div className="text-center">
              <p className="text-xl font-bold text-srfv-primary">36</p>
              <p className="text-xs text-srfv-text-muted">Enviadas</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-yellow-400">18</p>
              <p className="text-xs text-srfv-text-muted">Em análise</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-400">12</p>
              <p className="text-xs text-srfv-text-muted">Disponíveis</p>
            </div>
          </div>
          <a href="https://discord.gg/jqpxr8RM" target="_blank" rel="noopener noreferrer" className="btn-primary-srfv inline-block">
            Entrar no Discord
          </a>
        </div>
      </section>

      {/* ═══ POPULAR ARTS ═══ */}
      <section>
        <h2 className="text-xl font-bold mb-6">Artes mais <span className="heading-em">Populares</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {popularArts.map((a) => (
            <a key={a.title} href={a.img} download className="card-srfv group overflow-hidden text-center">
              <Image src={a.img} alt={a.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover rounded-xl" />
              <p className="mt-2 text-sm font-medium group-hover:text-srfv-primary transition-colors">{a.title}</p>
              <p className="text-xs text-srfv-text-muted">{a.views} visualizações</p>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ ALL ARTS ═══ */}
      <section>
        <h2 className="text-xl font-bold mb-6">Todas as <span className="heading-em">Artes</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allArts.map((a) => (
            <div key={a.title + a.author} className="card-srfv flex gap-4 items-center">
              <Image src={a.img} alt={a.title} width={120} height={90} className="w-28 h-20 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{a.title}</h3>
                <p className="text-xs text-srfv-text-muted mb-1">por {a.author}</p>
                <StarRating rating={a.rating} />
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-srfv-text-muted mb-2">{a.downloads.toLocaleString()} dl</p>
                <a href={a.img} download className="btn-outline-srfv text-xs px-3 py-1">Baixar</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
