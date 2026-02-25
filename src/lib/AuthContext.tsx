'use client';

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import type { SupabaseClient, User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { email?: string; password?: string; name?: string }) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const sbRef = useRef<SupabaseClient | null>(null);

  // Lazy init — avoids importing supabase at module scope (which crashes SSG)
  function sb(): SupabaseClient | null {
    if (sbRef.current) return sbRef.current;
    try {
      // Dynamic require at runtime only
      const { getSupabase } = require('@/lib/supabase');
      sbRef.current = getSupabase();
      return sbRef.current;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const client = sb();
    if (!client) { setLoading(false); return; }

    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const client = sb();
    if (!client) return { error: 'Supabase não configurado' };
    const { error } = await client.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const client = sb();
    if (!client) return { error: 'Supabase não configurado' };
    const { error } = await client.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    const client = sb();
    if (client) await client.auth.signOut();
  };

  const updateProfile = async (data: { email?: string; password?: string; name?: string }) => {
    const client = sb();
    if (!client) return { error: 'Supabase não configurado' };
    const updates: Record<string, unknown> = {};
    if (data.email) updates.email = data.email;
    if (data.password) updates.password = data.password;
    if (data.name) updates.data = { name: data.name };

    const { error } = await client.auth.updateUser(updates);
    return { error: error?.message ?? null };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
