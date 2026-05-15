import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { routing } from '@/i18n/routing';
import { getServerSupabase } from '@/lib/supabase/server';
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

  // Fetch the authenticated user server-side so the first render is already
  // authenticated when applicable. `getUser()` validates the JWT against the
  // Supabase auth server (recommended over `getSession()` on the server).
  const supabase = getServerSupabase();
  const { data: { user } = { user: null } } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  return (
    <html lang={locale} className="dark">
      <body className="bg-srfv-bg-darkest text-white min-h-screen flex flex-col antialiased font-poppins">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider initialUser={user}>
            <Header />
            <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

