'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSupabase } from '@/lib/supabase/server';
import { routing } from '@/i18n/routing';

/* ============================================================
 * Validation & sanitization helpers
 * ============================================================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accept letters (including accents), numbers, spaces and a few separators.
// We don't use \p{L}\p{N} because the project's tsconfig targets ES5.
const NAME_RE = /^[A-Za-z0-9\u00C0-\u024F\u1E00-\u1EFF\u4E00-\u9FFF .'\-]{1,50}$/;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 72; // bcrypt limit

function isStrongPassword(value: string): boolean {
  if (value.length < PASSWORD_MIN || value.length > PASSWORD_MAX) return false;
  // Require at least one letter and one digit. This avoids being absurdly
  // strict while still blocking the worst passwords. Customize as needed.
  return /[A-Za-z]/.test(value) && /\d/.test(value);
}

function isAllowedLocale(locale: string | undefined | null): locale is string {
  return Boolean(locale && (routing.locales as readonly string[]).includes(locale));
}

function safeLocale(locale: string | undefined | null): string {
  return isAllowedLocale(locale) ? locale : routing.defaultLocale;
}

/* ============================================================
 * Errors — translation keys returned to the UI
 * ============================================================ */

export type AuthState = {
  error?: string;
  ok?: boolean;
};

const ERR = {
  notConfigured: 'auth.notConfigured',
  invalidEmail: 'auth.invalidEmail',
  invalidName: 'auth.invalidName',
  weakPassword: 'auth.weakPassword',
  badCredentials: 'auth.badCredentials',
  mustAccept: 'auth.mustAccept',
  rateLimited: 'auth.rateLimited',
  unknown: 'auth.unknown',
  emailTaken: 'auth.emailTaken',
  oauthFailed: 'auth.oauthFailed',
  notAuthenticated: 'auth.notAuthenticated',
  honeypot: 'auth.unknown',
} as const;

/* ============================================================
 * Sign in (email + password)
 * ============================================================ */

export async function signInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  // Honeypot — if a bot fills this, silently succeed-as-fail.
  if (typeof formData.get('website') === 'string' && formData.get('website')) {
    return { error: ERR.honeypot };
  }

  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const locale = safeLocale(String(formData.get('locale') ?? ''));

  if (!EMAIL_RE.test(email)) return { error: ERR.invalidEmail };
  if (password.length < 1 || password.length > PASSWORD_MAX) return { error: ERR.badCredentials };

  const supabase = getServerSupabase();
  if (!supabase) return { error: ERR.notConfigured };

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Map common Supabase errors to opaque codes — never expose internals.
    const msg = error.message?.toLowerCase() ?? '';
    if (msg.includes('rate')) return { error: ERR.rateLimited };
    if (msg.includes('invalid') || msg.includes('credentials')) return { error: ERR.badCredentials };
    return { error: ERR.badCredentials };
  }

  revalidatePath(`/${locale}`, 'layout');
  redirect(`/${locale}`);
}

/* ============================================================
 * Sign up (email + password + name + terms)
 * ============================================================ */

export async function signUpAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (typeof formData.get('website') === 'string' && formData.get('website')) {
    return { error: ERR.honeypot };
  }

  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  const accepted = formData.get('terms') === 'on' || formData.get('terms') === 'true';
  const locale = safeLocale(String(formData.get('locale') ?? ''));

  if (!NAME_RE.test(name)) return { error: ERR.invalidName };
  if (!EMAIL_RE.test(email)) return { error: ERR.invalidEmail };
  if (!isStrongPassword(password)) return { error: ERR.weakPassword };
  if (!accepted) return { error: ERR.mustAccept };

  const supabase = getServerSupabase();
  if (!supabase) return { error: ERR.notConfigured };

  // Compute redirect URL for email confirmation
  const origin = await getOrigin();
  const emailRedirectTo = `${origin}/auth/callback?next=${encodeURIComponent(`/${locale}`)}`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: {
        name,
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
        terms_version: '2026-02-26',
      },
    },
  });

  if (error) {
    const msg = error.message?.toLowerCase() ?? '';
    if (msg.includes('already') || msg.includes('exists') || msg.includes('registered')) {
      return { error: ERR.emailTaken };
    }
    if (msg.includes('rate')) return { error: ERR.rateLimited };
    if (msg.includes('password')) return { error: ERR.weakPassword };
    return { error: ERR.unknown };
  }

  // If email confirmation is required (no session returned), tell the UI.
  if (!data.session) {
    return { ok: true };
  }

  revalidatePath(`/${locale}`, 'layout');
  redirect(`/${locale}`);
}

/* ============================================================
 * OAuth — Google
 * ============================================================ */

export async function signInWithGoogleAction(formData: FormData): Promise<void> {
  const locale = safeLocale(String(formData.get('locale') ?? ''));

  const supabase = getServerSupabase();
  if (!supabase) {
    redirect(`/${locale}/login?error=auth.notConfigured`);
  }

  const origin = await getOrigin();
  const callbackUrl = `${origin}/auth/callback?next=${encodeURIComponent(`/${locale}`)}`;

  const { data, error } = await supabase!.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  });

  if (error || !data?.url) {
    redirect(`/${locale}/login?error=auth.oauthFailed`);
  }

  redirect(data!.url);
}

/* ============================================================
 * Sign out
 * ============================================================ */

export async function signOutAction(formData?: FormData): Promise<void> {
  const locale = safeLocale(String(formData?.get('locale') ?? ''));
  const supabase = getServerSupabase();
  if (supabase) {
    await supabase.auth.signOut();
  }
  revalidatePath(`/${locale}`, 'layout');
  redirect(`/${locale}`);
}

/* ============================================================
 * Profile updates (name / email / password / bio / avatar / banner)
 * ============================================================ */

export type ProfileState = { error?: string; ok?: boolean };

type ProfilePatch = {
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
  avatar_url?: string;
  banner_url?: string;
};

const BIO_MAX = 200;

export async function updateProfileAction(patch: ProfilePatch): Promise<ProfileState> {
  const supabase = getServerSupabase();
  if (!supabase) return { error: ERR.notConfigured };

  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData?.user) return { error: ERR.notAuthenticated };

  if (patch.name !== undefined && !NAME_RE.test(patch.name)) return { error: ERR.invalidName };
  if (patch.email !== undefined && !EMAIL_RE.test(patch.email)) return { error: ERR.invalidEmail };
  if (patch.password !== undefined && !isStrongPassword(patch.password)) return { error: ERR.weakPassword };
  if (patch.bio !== undefined && patch.bio.length > BIO_MAX) return { error: ERR.unknown };
  if (patch.avatar_url !== undefined && !isValidPublicUrl(patch.avatar_url)) return { error: ERR.unknown };
  if (patch.banner_url !== undefined && !isValidPublicUrl(patch.banner_url)) return { error: ERR.unknown };

  const currentMeta = (userData.user.user_metadata ?? {}) as Record<string, unknown>;
  const metaPatch: Record<string, unknown> = {};
  if (patch.name !== undefined) metaPatch.name = patch.name.trim();
  if (patch.bio !== undefined) metaPatch.bio = patch.bio.trim();
  if (patch.avatar_url !== undefined) metaPatch.avatar_url = patch.avatar_url;
  if (patch.banner_url !== undefined) metaPatch.banner_url = patch.banner_url;

  const updates: Record<string, unknown> = {};
  if (patch.email !== undefined) updates.email = patch.email.trim().toLowerCase();
  if (patch.password !== undefined) updates.password = patch.password;
  if (Object.keys(metaPatch).length > 0) updates.data = { ...currentMeta, ...metaPatch };

  if (Object.keys(updates).length === 0) return { error: ERR.unknown };

  const { error } = await supabase.auth.updateUser(updates);
  if (error) {
    const msg = error.message?.toLowerCase() ?? '';
    if (msg.includes('rate')) return { error: ERR.rateLimited };
    if (msg.includes('password')) return { error: ERR.weakPassword };
    if (msg.includes('email') && msg.includes('already')) return { error: ERR.emailTaken };
    return { error: ERR.unknown };
  }

  revalidatePath('/', 'layout');
  return { ok: true };
}

function isValidPublicUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

/* ============================================================
 * Internal helpers
 * ============================================================ */

async function getOrigin(): Promise<string> {
  const hdrs = headers();
  // Respect proxy headers but fall back to host.
  const forwardedHost = hdrs.get('x-forwarded-host') ?? hdrs.get('host') ?? 'localhost:3000';
  const forwardedProto = hdrs.get('x-forwarded-proto') ?? (forwardedHost.startsWith('localhost') ? 'http' : 'https');
  return `${forwardedProto}://${forwardedHost}`;
}
