import { embeds } from '@/lib/embeds';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return Object.keys(embeds).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const embed = embeds[params.slug];
  if (!embed) return { title: 'Not Found - SRFV Games' };
  return { title: `${embed.title} - SRFV Games` };
}

export default async function PlayPage({ params }: Props) {
  const embed = embeds[params.slug];
  if (!embed) notFound();

  const t = await getTranslations('Play');

  const isGame = embed.type === 'game';
  const backHref = isGame ? '/games1' : '/movies1';
  const backLabel = isGame ? t('backToGames') : t('backToMovies');

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Link href={backHref} className="text-sm text-srfv-text-muted hover:text-srfv-primary transition-colors">
            &larr; {backLabel}
          </Link>
          <h1 className="text-xl font-bold mt-1">{embed.title}</h1>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${isGame ? 'bg-srfv-primary/20 text-srfv-primary' : 'bg-blue-500/20 text-blue-400'}`}>
          {isGame ? t('game') : t('movie')}
        </span>
      </div>

      {/* EMBED */}
      <div className="section-box p-0 overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: isGame ? '75%' : '56.25%' }}>
          <iframe
            src={embed.url}
            className="absolute inset-0 w-full h-full border-0 rounded-srfv"
            allowFullScreen
            allow="autoplay; fullscreen"
            title={embed.title}
          />
        </div>
      </div>

      {/* INFO */}
      <div className="text-center text-sm text-srfv-text-muted">
        {isGame ? t('gameInstructions') : t('movieInstructions')}
      </div>
    </div>
  );
}
