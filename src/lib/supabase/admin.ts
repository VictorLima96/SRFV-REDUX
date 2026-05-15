/**
 * Service-role Supabase client for trusted server-only operations.
 *
 * Uses the SECRET key. NEVER import this file from a Client Component or
 * from any code that runs in the browser bundle.
 *
 * Only used for: storage uploads with bypass, admin user lookups, etc.
 */
import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
const secretKey = (
  process.env.SUPABASE_SECRET_KEY
  ?? process.env.SUPABASE_SERVICE_ROLE_KEY
  ?? ''
).trim();

export function getAdminSupabase() {
  if (!supabaseUrl || !secretKey) return null;
  return createClient(supabaseUrl, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}
