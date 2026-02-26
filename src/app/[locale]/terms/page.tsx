import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function TermsPage() {
  const t = await getTranslations('Terms');

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-fade-in">
      <div className="section-box space-y-6">
        <h1 className="text-3xl font-bold">
          <span className="heading-em">{t('title')}</span>
        </h1>

        <p className="text-srfv-text-secondary leading-relaxed">
          {t('intro')}
        </p>

        <div className="space-y-5 text-srfv-text-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-white font-semibold">{t('accountTitle')}</h2>
            <p>{t('accountText')}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">{t('conductTitle')}</h2>
            <p>{t('conductText')}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">{t('contentTitle')}</h2>
            <p>{t('contentText')}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">{t('privacyTitle')}</h2>
            <p>{t('privacyText')}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">{t('suspensionTitle')}</h2>
            <p>{t('suspensionText')}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">{t('liabilityTitle')}</h2>
            <p>{t('liabilityText')}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">{t('updatesTitle')}</h2>
            <p>{t('updatesText')}</p>
          </section>
        </div>

        <div className="rounded-srfv-xs border border-white/10 bg-white/5 p-4 text-sm text-srfv-text-muted space-y-1">
          <p>
            {t('lastUpdatedLabel')}: <span className="text-white font-medium">{t('lastUpdatedValue')}</span>
          </p>
          <p>
            {t('versionLabel')}: <span className="text-white font-medium">{t('versionValue')}</span>
          </p>
        </div>

        <div className="pt-2">
          <Link href="/signup" className="btn-primary-srfv inline-flex items-center justify-center px-5 py-2.5">
            {t('backToSignup')}
          </Link>
        </div>
      </div>
    </div>
  );
}
