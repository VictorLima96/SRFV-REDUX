import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'SRFV Games',
  description: 'Play retro games, assista filmes e baixe arts — tudo grátis no SRFV Games.',
  icons: { icon: '/assets/images/favicon-srfv.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-srfv-bg-darkest text-white min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
