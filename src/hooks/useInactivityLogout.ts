'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from '@/i18n/navigation';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes

/**
 * Hook that automatically logs out the user after 15 minutes of inactivity.
 * Monitors mouse movements, clicks, key presses, scrolls, and touch events.
 * Only active when a user is logged in.
 */
export function useInactivityLogout() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = useCallback(async () => {
    await signOut();
    router.push('/login');
  }, [signOut, router]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (user) {
      timerRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
    }
  }, [user, handleLogout]);

  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true })
    );

    // Start the timer immediately
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user, resetTimer]);
}
