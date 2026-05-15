import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { routing } from '@/i18n/routing';

/**
 * OAuth callback (PKCE).
 *
 * Exchanges the authorization `code` for a session server-side, then
 * redirects to a safe same-origin `next` path. The session is persisted
 * via HttpOnly cookies — the access token is never visible to JavaScript.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const errorParam = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Validate "next" — must be a same-origin path under a known locale.
  const rawNext = searchParams.get('next') ?? `/${routing.defaultLocale}`;
  const safeNext = sanitizeNext(rawNext);

  if (errorParam) {
    const url = new URL(`/${routing.defaultLocale}/login`, origin);
    url.searchParams.set('error', mapOAuthError(errorParam, errorDescription));
    return NextResponse.redirect(url);
  }

  if (!code) {
    const url = new URL(`/${routing.defaultLocale}/login`, origin);
    url.searchParams.set('error', 'oauth_no_code');
    return NextResponse.redirect(url);
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    const url = new URL(`/${routing.defaultLocale}/login`, origin);
    url.searchParams.set('error', 'server_misconfigured');
    return NextResponse.redirect(url);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    const url = new URL(`/${routing.defaultLocale}/login`, origin);
    url.searchParams.set('error', 'oauth_exchange_failed');
    return NextResponse.redirect(url);
  }

  return NextResponse.redirect(new URL(safeNext, origin));
}

function sanitizeNext(value: string): string {
  // Reject anything that isn't a relative path or attempts a host change.
  if (!value.startsWith('/') || value.startsWith('//')) {
    return `/${routing.defaultLocale}`;
  }
  // Strip any embedded protocol/host.
  try {
    const dummy = new URL(value, 'http://localhost');
    return dummy.pathname + dummy.search + dummy.hash;
  } catch {
    return `/${routing.defaultLocale}`;
  }
}

function mapOAuthError(code: string, description: string | null): string {
  if (code === 'access_denied') return 'oauth_access_denied';
  if (description?.toLowerCase().includes('cancel')) return 'oauth_cancelled';
  return 'oauth_failed';
}
