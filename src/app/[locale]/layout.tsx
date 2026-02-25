import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { routing } from '@/i18n/routing';
import '../globals.css';

export const metadata: Metadata = {
  title: 'SRFV Games',
  description: 'Play retro games, watch movies and download arts — all free at SRFV Games.',
  icons: { icon: '/assets/images/srfv-logo.png' },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-srfv-bg-darkest text-white min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Header />
            <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
