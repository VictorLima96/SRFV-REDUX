'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { getBrowserSupabase } from '@/lib/supabase/browser';
import {
  signOutAction,
  updateProfileAction,
  type ProfileState,
} from '@/app/_actions/auth';

/**
 * AuthContext â€” thin, server-fed.
 *
 * Auth mutations (sign-in / sign-up / OAuth / sign-out) happen through Server
 * Actions, NOT through a browser Supabase client. That keeps tokens in
 * HttpOnly cookies and avoids exposing the database key surface to the page.
 *
 * The `user` we hold here comes from `getServerSupabase().auth.getUser()` in
 * the root layout, so SSR renders the correct authenticated state on first
 * paint. We also subscribe to `onAuthStateChange` in the browser to react to
 * sign-outs in other tabs and refresh the page when needed.
 */

type ProfilePatch = Parameters<typeof updateProfileAction>[0];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (data: ProfilePatch) => Promise<{ error: string | null }>;
  uploadFile: (file: File, type?: 'avatar' | 'banner') => Promise<{ url: string | null; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  // Cross-tab sync only â€” never used for mutations.
  useEffect(() => {
    const client = getBrowserSupabase();
    if (!client) return;
    const { data } = client.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (session?.user) {
        setUser(session.user);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const signOut = async (): Promise<void> => {
    const formData = new FormData();
    if (typeof window !== 'undefined') {
      const localeFromPath = window.location.pathname.split('/')[1] || 'pt-BR';
      formData.set('locale', localeFromPath);
    }
    try {
      await signOutAction(formData);
    } catch {
      // server action throws NEXT_REDIRECT â€” that's normal
    }
  };

  const updateProfile = async (data: ProfilePatch): Promise<{ error: string | null }> => {
    const result: ProfileState = await updateProfileAction(data);
    if (result.error) return { error: result.error };

    // Best-effort: refresh user from server-fed client to reflect new metadata.
    const client = getBrowserSupabase();
    if (client) {
      const { data: refreshed } = await client.auth.getUser();
      if (refreshed?.user) setUser(refreshed.user);
    }
    return { error: null };
  };

  const uploadFile = async (file: File, type: 'avatar' | 'banner' = 'avatar'): Promise<{ url: string | null; error: string | null }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    try {
      // Cookies authenticate the request â€” no Authorization header needed.
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) return { url: null, error: json.error ?? 'Upload failed' };
      return { url: json.url ?? null, error: null };
    } catch (err: unknown) {
      return { url: null, error: err instanceof Error ? err.message : 'Upload failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading: false, signOut, updateProfile, uploadFile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
