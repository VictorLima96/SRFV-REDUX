'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, acceptedTerms: boolean) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { email?: string; password?: string; name?: string; avatar_url?: string; banner_url?: string; bio?: string }) => Promise<{ error: string | null }>;
  uploadFile: (file: File, type?: 'avatar' | 'banner') => Promise<{ url: string | null; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (!code) return;

    let mounted = true;

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const syncSessionFromSource = async (attempts: number = 5) => {
      for (let i = 0; i < attempts; i++) {
        const { data: { session: currentSession } } = await client.auth.getSession();
        if (!mounted) return;

        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user ?? null);
          return;
        }

        await wait(250);
      }
    };

    const completeOAuthLogin = async () => {
      const { data, error } = await client.auth.exchangeCodeForSession(code);

      if (!mounted) return;

      if (!error && data.session) {
        setSession(data.session);
        setUser(data.session.user ?? null);
      }

      await syncSessionFromSource();

      url.searchParams.delete('code');
      url.searchParams.delete('error');
      url.searchParams.delete('error_description');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    };

    completeOAuthLogin();

    return () => {
      mounted = false;
    };
  }, []);

  const signUp = async (email: string, password: string, name: string, acceptedTerms: boolean) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          terms_accepted: acceptedTerms,
          terms_accepted_at: acceptedTerms ? new Date().toISOString() : null,
          terms_version: acceptedTerms ? '2026-02-26' : null,
        },
      },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signInWithGoogle = async () => {
    if (!supabase) return { error: 'Supabase not configured' };
    const localeFromPath = window.location.pathname.split('/')[1] || 'pt-BR';
    const nextPath = `/${localeFromPath}`;
    const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
      },
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  const updateProfile = async (data: { email?: string; password?: string; name?: string; avatar_url?: string; banner_url?: string; bio?: string }) => {
    if (!supabase) return { error: 'Supabase not configured' };

    const { data: currentUserData, error: currentUserError } = await supabase.auth.getUser();
    if (currentUserError || !currentUserData?.user) {
      return { error: currentUserError?.message ?? 'Unable to load current user' };
    }

    const currentMeta = (currentUserData.user.user_metadata ?? {}) as Record<string, unknown>;

    // Build auth-level updates (email, password)
    const authUpdates: Record<string, unknown> = {};
    if (data.email !== undefined) authUpdates.email = data.email;
    if (data.password !== undefined) authUpdates.password = data.password;

    // Build merged user_metadata updates (name, avatar, banner, bio)
    const metaPatch: Record<string, unknown> = {};
    if (data.name !== undefined) metaPatch.name = data.name;
    if (data.avatar_url !== undefined) metaPatch.avatar_url = data.avatar_url;
    if (data.banner_url !== undefined) metaPatch.banner_url = data.banner_url;
    if (data.bio !== undefined) metaPatch.bio = data.bio;

    if (Object.keys(metaPatch).length > 0) {
      authUpdates.data = { ...currentMeta, ...metaPatch };
    }

    if (Object.keys(authUpdates).length === 0) {
      return { error: 'No changes detected.' };
    }

    const { error } = await supabase.auth.updateUser(authUpdates);
    if (error) return { error: error.message };

    // Refresh local user state from source of truth
    const { data: refreshedData, error: refreshError } = await supabase.auth.getUser();
    if (!refreshError && refreshedData?.user) {
      setUser(refreshedData.user);
    }

    return { error: refreshError?.message ?? null };
  };

  const uploadFile = async (file: File, type: 'avatar' | 'banner' = 'avatar'): Promise<{ url: string | null; error: string | null }> => {
    if (!supabase) return { url: null, error: 'Supabase not configured' };
    if (!user) return { url: null, error: 'User not authenticated' };

    // Get the current session token
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (!currentSession?.access_token) return { url: null, error: 'No active session' };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${currentSession.access_token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) return { url: null, error: data.error || 'Upload failed' };
      return { url: data.url, error: null };
    } catch (err: any) {
      return { url: null, error: err.message || 'Upload failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut, updateProfile, uploadFile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
