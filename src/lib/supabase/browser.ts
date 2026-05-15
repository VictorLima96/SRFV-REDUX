/**
 * Browser-side Supabase client (very limited use).
 *
 * Only used for listening to `onAuthStateChange` so the UI can react to
 * logout/login in other tabs. Auth mutations are NEVER performed here —
 * those go through Server Actions which use HttpOnly cookies.
 *
 * The publishable (anon) key is meant to be public; it's protected by RLS.
 */
'use client';

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
const supabasePublishableKey = (
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ?? ''
).trim();

let cachedClient: ReturnType<typeof createBrowserClient> | null = null;

export function getBrowserSupabase() {
  if (!supabaseUrl || !supabasePublishableKey) return null;
  if (cachedClient) return cachedClient;
  cachedClient = createBrowserClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: false,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  return cachedClient;
}
