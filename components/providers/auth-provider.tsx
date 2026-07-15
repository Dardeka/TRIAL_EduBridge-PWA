'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type AuthUser, type Profile } from '@/lib/supabase';

const GUEST_STORAGE_KEY = 'edubridge_guest';

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  isGuest: boolean;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function profileToUser(profile: Profile, email: string): AuthUser {
  return {
    id: profile.id,
    email,
    fullName: profile.full_name,
    initials: getInitials(profile.full_name),
    role: profile.role,
    isGuest: false,
  };
}

function guestToUser(name: string): AuthUser {
  return {
    id: 'guest',
    email: '',
    fullName: name,
    initials: getInitials(name),
    role: 'guest',
    isGuest: true,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>({
    user: null,
    loading: true,
  });
  const [isGuest, setIsGuest] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let mounted = true;

    // Check for existing guest session
    const guestName = localStorage.getItem(GUEST_STORAGE_KEY);
    if (guestName) {
      if (mounted) {
        setState({ user: guestToUser(guestName), loading: false });
        setIsGuest(true);
      }
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (mounted) {
          if (profile) {
            setState({
              user: profileToUser(profile as Profile, session.user.email || ''),
              loading: false,
            });
          } else {
            // Profile not yet created (trigger may have lagged) — use fallback
            setState({
              user: {
                id: session.user.id,
                email: session.user.email || '',
                fullName:
                  (session.user.user_metadata?.full_name as string) || 'User',
                initials: getInitials(
                  (session.user.user_metadata?.full_name as string) || 'User'
                ),
                role: 'student',
                isGuest: false,
              },
              loading: false,
            });
          }
        }
      } else {
        if (mounted) {
          setState({ user: null, loading: false });
        }
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      (async () => {
        if (event === 'SIGNED_OUT' || !session?.user) {
          setState({ user: null, loading: false });
          setIsGuest(false);
          return;
        }

        if (session.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (mounted) {
            if (profile) {
              setState({
                user: profileToUser(profile as Profile, session.user.email || ''),
                loading: false,
              });
            } else {
              setState({
                user: {
                  id: session.user.id,
                  email: session.user.email || '',
                  fullName:
                    (session.user.user_metadata?.full_name as string) || 'User',
                  initials: getInitials(
                    (session.user.user_metadata?.full_name as string) || 'User'
                  ),
                  role: 'student',
                  isGuest: false,
                },
                loading: false,
              });
            }
          }
        }
      })();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = React.useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { error: error.message };
      }
      return { error: null };
    },
    []
  );

  const signUp = React.useCallback(
    async (email: string, password: string, fullName: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) {
        return { error: error.message };
      }
      // If session is returned immediately (email confirmation off)
      if (data.user && !data.session) {
        // Sign in automatically since email confirmation is off
        await supabase.auth.signInWithPassword({ email, password });
      }
      return { error: null };
    },
    []
  );

  const signOut = React.useCallback(async () => {
    if (isGuest) {
      localStorage.removeItem(GUEST_STORAGE_KEY);
      setIsGuest(false);
      setState({ user: null, loading: false });
      router.push('/login');
      return;
    }
    await supabase.auth.signOut();
    setState({ user: null, loading: false });
    router.push('/login');
  }, [isGuest, router]);

  const continueAsGuest = React.useCallback(() => {
    const guestName = 'Tamu';
    localStorage.setItem(GUEST_STORAGE_KEY, guestName);
    setIsGuest(true);
    setState({ user: guestToUser(guestName), loading: false });
    router.push('/dashboard');
  }, [router]);

  const value: AuthContextValue = {
    user: state.user,
    loading: state.loading,
    signIn,
    signUp,
    signOut,
    continueAsGuest,
    isGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
