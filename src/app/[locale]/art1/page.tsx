import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

const popularArts = [
  { img: '/assets/arts/a.png',  title: 'Bumblebee',  views: '10,495' },
  { img: '/assets/arts/b.webp', title: 'Bomberman',  views: '9,345' },
  { img: '/assets/arts/k.webp', title: 'Knuckles',   views: '7,141' },
  { img: '/assets/arts/s.webp', title: 'Shadow',     views: '5,398' },
];

const allArts = [
  { img: '/assets/arts/a.png',           title: 'Bumblebee',   author: 'Fallen',      rating: 4.1, downloads: 242 },
  { img: '/assets/arts/b.webp',          title: 'Bomberman',   author: 'Victor',      rating: 4.4, downloads: 1132 },
  { img: '/assets/arts/e.webp',          title: 'Bob Esponja', author: 'Steam-X',     rating: 4.8, downloads: 346 },
  { img: '/assets/arts/m.webp',          title: 'Luigi',       author: 'ElTopoGira',  rating: 4.2, downloads: 9471 },
  { img: '/assets/arts/n.webp',          title: 'Pizza Tower', author: 'Max 3D',      rating: 3.1, downloads: 1120 },
  { img: '/assets/arts/s.webp',          title: 'Shadow',      author: 'FonSekito',   rating: 4.1, downloads: 329 },
  { img: '/assets/arts/k.webp',          title: 'Knuckles',    author: 'CrashGamis',  rating: 3.9, downloads: 2323 },
  { img: '/assets/arts/c.webp',          title: 'Polygoth',    author: 'Legendary',   rating: 4.9, downloads: 738 },
  { img: '/assets/images/game-03.jpg',   title: 'Space Boy',   author: 'Cyborg',      rating: 3.4, downloads: 198 },
  { img: '/assets/arts/to.webp',         title: 'TO MA TO',    author: 'Anjo_Aguiel', rating: 4.3, downloads: 3301 },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  return (
    <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="drop-shadow-sm">{i < full ? '★' : i === full && half ? '★' : '☆'}</span>
      ))}
      <span className="text-srfv-text-muted ml-1.5 font-medium">{rating}</span>
    </div>
  );
}

export default async function ArtPage() {
  const t = await getTranslations('Art');

  return (
    <div className="space-y-14">
      {/* ═══ DISCORD BANNER ═══ */}
      <section className="relative overflow-hidden rounded-srfv">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-srfv-bg-darker to-srfv-bg-darkest" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="relative flex flex-col md:flex-row items-center gap-6 p-8 md:p-10">
          <div className="w-full md:w-1/2 relative overflow-hidden rounded-srfv-sm">
            <Image src="/assets/arts/discord.jpg" alt="Discord SRFV" width={400} height={200} className="w-full rounded-srfv-sm object-cover" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold mb-2">{t('submitTitle')} <span className="heading-em">{t('submitTitleHighlight')}</span></h1>
            <p className="text-sm text-srfv-text-secondary mb-5 leading-relaxed">{t('submitDesc')}</p>
            <div className="flex gap-8 justify-center md:justify-start mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-srfv-primary">36</p>
                <p className="text-xs text-srfv-text-muted">{t('submitted')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">18</p>
                <p className="text-xs text-srfv-text-muted">{t('inReview')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">12</p>
                <p className="text-xs text-srfv-text-muted">{t('available')}</p>
              </div>
            </div>
            <a href="https://discord.gg/jqpxr8RM" target="_blank" rel="noopener noreferrer" className="btn-primary-srfv">
              {t('joinDiscord')}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ POPULAR ARTS ═══ */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">{t('popularArts')} <span className="heading-em">{t('popularArtsHighlight')}</span></h2>
          <div className="gradient-line mt-2 w-20" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {popularArts.map((a) => (
            <a key={a.title} href={a.img} download className="card-srfv group overflow-hidden text-center">
              <div className="relative overflow-hidden rounded-srfv-xs">
                <Image src={a.img} alt={a.title} width={300} height={200} className="w-full h-40 xl:h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-white">⬇ Download</span>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium group-hover:text-srfv-primary transition-colors">{a.title}</p>
              <p className="text-xs text-srfv-text-muted">{a.views} {t('views')}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ ALL ARTS ═══ */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">{t('allArts')} <span className="heading-em">{t('allArtsHighlight')}</span></h2>
          <div className="gradient-line mt-2 w-16" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allArts.map((a) => (
            <div key={a.title + a.author} className="card-srfv flex gap-4 items-center group">
              <div className="relative overflow-hidden rounded-srfv-xs flex-shrink-0">
                <Image src={a.img} alt={a.title} width={120} height={90} className="w-28 h-20 object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate group-hover:text-srfv-primary transition-colors">{a.title}</h3>
                <p className="text-xs text-srfv-text-muted mb-1">{t('by')} {a.author}</p>
                <StarRating rating={a.rating} />
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-srfv-text-muted mb-2">{a.downloads.toLocaleString()} dl</p>
                <a href={a.img} download className="btn-outline-srfv text-xs px-3 py-1">{t('download')}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
