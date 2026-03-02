import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="relative mt-auto">
      {/* Top gradient line */}
      <div className="gradient-line w-full" />

      <div className="bg-srfv-bg-darkest/80 backdrop-blur-sm border-t border-srfv-border">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-srfv-text-muted text-xs">
              {t('copyright')}
            </p>

            {/* Upload Art link */}
            <a
              href="/art1"
              className="text-xs text-srfv-text-muted hover:text-srfv-primary transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t('uploadArt')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
