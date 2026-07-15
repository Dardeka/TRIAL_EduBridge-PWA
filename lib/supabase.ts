import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type Profile = {
  id: string;
  full_name: string;
  role: 'student' | 'admin' | 'guest';
  avatar_url: string | null;
};

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  initials: string;
  role: 'student' | 'admin' | 'guest';
  isGuest: boolean;
};
