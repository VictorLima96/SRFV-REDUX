import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * OAuth callback handler.
 * Supabase redirects here after provider auth with a ?code=... parameter.
 * We exchange the code for a session, then redirect to the home page.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/pt-BR';

  if (code) {
    const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
    const supabasePublishableKey = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '').trim();

    if (supabaseUrl && supabasePublishableKey) {
      const supabase = createClient(supabaseUrl, supabasePublishableKey, {
        auth: { flowType: 'pkce' },
      });

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If something went wrong, redirect to login with an error hint
  return NextResponse.redirect(`${origin}/pt-BR/login?error=auth_callback_failed`);
}
