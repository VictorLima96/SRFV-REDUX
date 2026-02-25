'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { email?: string; password?: string; name?: string; avatar_url?: string; banner_url?: string; bio?: string }) => Promise<{ error: string | null }>;
  uploadAvatar: (file: File) => Promise<{ url: string | null; error: string | null }>;
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

  const signUp = async (email: string, password: string, name: string) => {
    if (!supabase) return { error: 'Supabase não configurado' };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase não configurado' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  const updateProfile = async (data: { email?: string; password?: string; name?: string; avatar_url?: string; banner_url?: string; bio?: string }) => {
    if (!supabase) return { error: 'Supabase não configurado' };

    // Build auth-level updates (email, password)
    const authUpdates: Record<string, unknown> = {};
    if (data.email) authUpdates.email = data.email;
    if (data.password) authUpdates.password = data.password;

    // Build user_metadata updates (name, avatar, banner, bio)
    const meta: Record<string, string> = {};
    if (data.name !== undefined) meta.name = data.name;
    if (data.avatar_url !== undefined) meta.avatar_url = data.avatar_url;
    if (data.banner_url !== undefined) meta.banner_url = data.banner_url;
    if (data.bio !== undefined) meta.bio = data.bio;

    if (Object.keys(meta).length > 0) {
      authUpdates.data = meta;
    }

    if (Object.keys(authUpdates).length === 0) {
      return { error: 'Nenhuma alteração detectada.' };
    }

    const { error } = await supabase.auth.updateUser(authUpdates);
    return { error: error?.message ?? null };
  };

  const uploadAvatar = async (file: File): Promise<{ url: string | null; error: string | null }> => {
    if (!supabase) return { url: null, error: 'Supabase não configurado' };
    if (!user) return { url: null, error: 'Usuário não autenticado' };

    const ext = file.name.split('.').pop();
    const path = `${user.id}/avatar.${ext}`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type });

    if (error) return { url: null, error: error.message };

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(path);

    return { url: publicUrl, error: null };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, updateProfile, uploadAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
