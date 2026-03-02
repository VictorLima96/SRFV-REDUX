import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

/* Legacy backward-compat URLs from the old Laravel site */
const legacyRedirects: Record<string, string> = {
  '/abaTekken': '/play/tekken',
  '/abaCrash': '/play/crash',
  '/abaMetal': '/play/metal',
  '/abaResident': '/play/resident',
  '/abaBubsy': '/play/bubsy',
  '/abaFifa': '/play/fifa',
  '/abaTomb': '/play/tomb',
  '/abaStreet': '/play/street',
  '/abaCb3': '/play/cb3',
  '/abaTn2': '/play/tn2',
  '/abaGt': '/play/gt',
  '/abaFf7': '/play/ff7',
  '/abaDonnie': '/play/donnie',
  '/abaCrashM': '/play/crash-movie',
  '/abaResidentM': '/play/resident-movie',
  '/abaJogador': '/play/jogador',
  '/abaSpider': '/play/spider',
  '/abaSonic': '/play/sonic',
  '/abaMario': '/play/mario',
  '/abaTekkenM': '/play/tekken-movie',
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle legacy URLs → redirect to default locale
  const legacyTarget = legacyRedirects[pathname];
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}${legacyTarget}`;
    return NextResponse.redirect(url);
  }

  // Handle old /alterarsenha route → /update (any locale)
  if (pathname.endsWith('/alterarsenha')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/alterarsenha', '/update');
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|auth|_next|_vercel|assets|.*\\..*).*)'],
};
