/**
 * Auth health diagnostic — server only.
 *
 * Returns a redacted snapshot of the auth configuration plus the result of
 * a real call to Supabase. Reveals NO secret material:
 *   - URL host only
 *   - key length + first 6 chars + last 4 chars (JWT header is public anyway)
 *   - exact error code/message returned by Supabase
 *
 * Visit /api/health/auth to verify what is actually wired up in this
 * deployment. If `gotrue.status === 401` with "Invalid API key", the URL
 * and the publishable key belong to different projects.
 */
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function maskKey(key: string): string {
  if (!key) return '';
  if (key.length <= 12) return `${key.length} chars`;
  return `${key.slice(0, 6)}…${key.slice(-4)} (len=${key.length})`;
}

function safeUrlHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return '<invalid URL>';
  }
}

export async function GET() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const rawAnon =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ?? '';
  const rawSecret =
    process.env.SUPABASE_SECRET_KEY
    ?? process.env.SUPABASE_SERVICE_ROLE_KEY
    ?? '';

  const supabaseUrl = rawUrl.trim();
  const supabaseAnon = rawAnon.trim();
  const supabaseSecret = rawSecret.trim();

  const envSnapshot = {
    url: {
      present: Boolean(supabaseUrl),
      host: safeUrlHost(supabaseUrl),
      rawLength: rawUrl.length,
      trimmedLength: supabaseUrl.length,
      hasWhitespace: rawUrl.length !== supabaseUrl.length,
      whichVar: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'NEXT_PUBLIC_SUPABASE_URL' : null,
    },
    anonKey: {
      present: Boolean(supabaseAnon),
      preview: maskKey(supabaseAnon),
      hasWhitespace: rawAnon.length !== supabaseAnon.length,
      looksLikeJwt: supabaseAnon.split('.').length === 3,
      whichVar: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
        ? 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
          : null,
    },
    secretKey: {
      present: Boolean(supabaseSecret),
      preview: maskKey(supabaseSecret),
      hasWhitespace: rawSecret.length !== supabaseSecret.length,
      looksLikeJwt: supabaseSecret.split('.').length === 3,
      whichVar: process.env.SUPABASE_SECRET_KEY
        ? 'SUPABASE_SECRET_KEY'
        : process.env.SUPABASE_SERVICE_ROLE_KEY
          ? 'SUPABASE_SERVICE_ROLE_KEY'
          : null,
    },
  };

  let projectRefFromUrl: string | null = null;
  try {
    projectRefFromUrl = new URL(supabaseUrl).host.split('.')[0] ?? null;
  } catch {
    /* ignore */
  }

  // Decode the unsigned payload of each JWT to compare project refs.
  // JWT payloads are PUBLIC — this leaks nothing.
  const projectRefFromAnon = decodeJwtRef(supabaseAnon);
  const projectRefFromSecret = decodeJwtRef(supabaseSecret);

  const mismatches: string[] = [];
  if (projectRefFromUrl && projectRefFromAnon && projectRefFromUrl !== projectRefFromAnon) {
    mismatches.push(`URL project (${projectRefFromUrl}) ≠ anon key project (${projectRefFromAnon})`);
  }
  if (projectRefFromUrl && projectRefFromSecret && projectRefFromUrl !== projectRefFromSecret) {
    mismatches.push(`URL project (${projectRefFromUrl}) ≠ secret key project (${projectRefFromSecret})`);
  }
  if (projectRefFromAnon && projectRefFromSecret && projectRefFromAnon !== projectRefFromSecret) {
    mismatches.push(`anon key project (${projectRefFromAnon}) ≠ secret key project (${projectRefFromSecret})`);
  }

  // Live probe: hit the gotrue settings endpoint with the apikey header.
  // 200 → key is valid for this URL. 401 → "Invalid API key".
  let gotrue: Record<string, unknown> = { skipped: true };
  if (supabaseUrl && supabaseAnon) {
    try {
      const res = await fetch(`${supabaseUrl}/auth/v1/settings`, {
        headers: { apikey: supabaseAnon, Authorization: `Bearer ${supabaseAnon}` },
        cache: 'no-store',
      });
      const bodyText = await res.text();
      gotrue = {
        status: res.status,
        ok: res.ok,
        body: bodyText.length > 240 ? bodyText.slice(0, 240) + '…' : bodyText,
      };
    } catch (err) {
      gotrue = { fetchFailed: true, error: err instanceof Error ? err.message : String(err) };
    }
  }

  return NextResponse.json(
    {
      env: envSnapshot,
      projectRefs: {
        fromUrl: projectRefFromUrl,
        fromAnonKey: projectRefFromAnon,
        fromSecretKey: projectRefFromSecret,
        mismatches,
      },
      gotruePing: gotrue,
      hint: buildHint(envSnapshot, mismatches, gotrue),
    },
    { status: 200, headers: { 'cache-control': 'no-store' } },
  );
}

function decodeJwtRef(jwt: string): string | null {
  const parts = jwt.split('.');
  if (parts.length !== 3) return null;
  try {
    const payloadB64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payloadB64 + '='.repeat((4 - (payloadB64.length % 4)) % 4);
    const json = Buffer.from(padded, 'base64').toString('utf-8');
    const payload = JSON.parse(json) as { ref?: string };
    return payload.ref ?? null;
  } catch {
    return null;
  }
}

function buildHint(
  env: ReturnType<typeof Object> & Record<string, any>,
  mismatches: string[],
  gotrue: Record<string, unknown>,
): string {
  if (!env.url.present) return 'NEXT_PUBLIC_SUPABASE_URL is missing.';
  if (!env.anonKey.present) return 'Publishable / anon key is missing.';
  if (env.url.hasWhitespace || env.anonKey.hasWhitespace || env.secretKey.hasWhitespace) {
    return 'One of the env vars has leading/trailing whitespace. Recreate it.';
  }
  if (!env.anonKey.looksLikeJwt) return 'Anon key does not look like a JWT.';
  if (mismatches.length > 0) return `Project mismatch: ${mismatches.join('; ')}`;
  if (typeof gotrue.status === 'number' && gotrue.status === 401) {
    return 'Supabase replied 401 / Invalid API key. URL and key likely belong to different projects, or the key was rotated.';
  }
  if (typeof gotrue.status === 'number' && gotrue.status >= 400) {
    return `Supabase replied ${gotrue.status}. See body for details.`;
  }
  if (gotrue.ok === true) return 'Auth env looks healthy. If signup still fails, check Supabase → Authentication → Providers (email) and rate limits.';
  return 'Inconclusive.';
}
