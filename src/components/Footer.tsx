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
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-srfv-primary to-red-600 flex items-center justify-center shadow-glow-sm">
                <span className="text-white font-bold text-xs">SR</span>
              </div>
              <span className="text-sm font-semibold text-white">SRFV Games</span>
            </div>

            {/* Copyright */}
            <p className="text-srfv-text-muted text-xs">
              {t('copyright')}
            </p>

            {/* Social hint */}
            <a
              href="https://discord.gg/jqpxr8RM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-srfv-text-muted hover:text-srfv-primary transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
