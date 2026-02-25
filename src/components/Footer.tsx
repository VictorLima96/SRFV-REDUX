import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="bg-srfv-bg-darkest border-t border-srfv-border mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 py-6 text-center">
        <p className="text-srfv-text-muted text-sm">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
}
