/**
 * Server-side Supabase client (Next.js App Router).
 *
 * - Uses HttpOnly cookies for the auth session (no JS access).
 * - The publishable/anon key is required, but is only read by server code.
 * - Use `getServerSupabase()` inside Server Components, Route Handlers and Server Actions.
 *
 * NEVER import this file from a Client Component.
 */
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
const supabasePublishableKey = (
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ?? ''
).trim();

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl) && Boolean(supabasePublishableKey);
}

/**
 * Returns a Supabase client bound to the current request's cookies.
 * If env vars are missing, returns null so callers can degrade gracefully.
 */
export function getServerSupabase() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          /* Read-only context (Server Component during render). Safe to ignore. */
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options, maxAge: 0 });
        } catch {
          /* Read-only context. */
        }
      },
    },
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: false,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}
