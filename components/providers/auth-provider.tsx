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
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    educationLevel: 'SD' | 'SMP' | 'SMA' | null
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  isGuest: boolean;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

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
    educationLevel: profile.education_level,
    isGuest: false,
  };
}

function guestToUser(name: string): AuthUser {
  return {
    id: 'guest',
    email: '',
    fullName: name,
    initials: getInitials(name),
    educationLevel: null,
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

    const guestName = localStorage.getItem(GUEST_STORAGE_KEY);
    if (guestName) {
      setState({ user: guestToUser(guestName), loading: false });
      setIsGuest(true);
    } else {
      // Get initial session
      supabase.auth
        .getSession()
        .then(async ({ data: { session } }) => {
          if (!mounted) return;

          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (!mounted) return;

            if (profile) {
              setState({
                user: profileToUser(
                  profile as Profile,
                  session.user.email || ''
                ),
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
                  educationLevel: null,
                  isGuest: false,
                },
                loading: false,
              });
            }
          } else {
            setState({ user: null, loading: false });
          }
        })
        .catch(() => {
          // Supabase unreachable — stop the spinner instead of hanging forever
          if (mounted) setState({ user: null, loading: false });
        });
    }

    // Listen for auth changes — registered even in guest mode, so a later
    // real sign-in (e.g. from the login page) is picked up.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      (async () => {
        try {
          if (event === 'SIGNED_OUT' || !session?.user) {
            // Don't clobber an active guest session on unrelated SIGNED_OUT events
            if (!localStorage.getItem(GUEST_STORAGE_KEY)) {
              setState({ user: null, loading: false });
              setIsGuest(false);
            }
            return;
          }

          // A real session just appeared — guest mode is over
          localStorage.removeItem(GUEST_STORAGE_KEY);
          setIsGuest(false);

          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (!mounted) return;

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
                educationLevel: null,
                isGuest: false,
              },
              loading: false,
            });
          }
        } catch (err) {
          // Prevent an unhandled promise rejection from a network hiccup
          console.error('Auth state change failed:', err);
          if (mounted) setState((s) => ({ ...s, loading: false }));
        }
      })();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = React.useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  }, []);

  const signUp = React.useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      educationLevel: 'SD' | 'SMP' | 'SMA' | null
    ) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, education_level: educationLevel },
        },
      });
      if (error) {
        return { error: error.message };
      }
      // data.user && !data.session means email confirmation is required.
      // Don't attempt to sign in here — it will fail until the user confirms.
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

  const continueAsGuest = React.useCallback(async () => {
    await supabase.auth.signOut();
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
