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
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm text-srfv-text-muted hover:text-srfv-primary transition-colors group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
            {backLabel}
          </Link>
          <h1 className="text-xl font-bold mt-1">{embed.title}</h1>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm ${isGame ? 'bg-srfv-primary/15 text-srfv-primary ring-1 ring-srfv-primary/20' : 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20'}`}>
          {isGame ? t('game') : t('movie')}
        </span>
      </div>

      {/* EMBED */}
      <div className="relative rounded-srfv overflow-hidden shadow-card group">
        {/* Glow behind embed */}
        <div className="absolute -inset-1 bg-gradient-to-r from-srfv-primary/10 via-transparent to-srfv-primary/10 rounded-srfv blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative section-box !p-0 overflow-hidden">
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
      </div>

      {/* INFO */}
      <div className="text-center space-y-1">
        <p className="text-sm text-srfv-text-muted">
          {isGame ? t('gameInstructions') : t('movieInstructions')}
        </p>
        <div className="gradient-line w-24 mx-auto" />
      </div>
    </div>
  );
}
