import { NextRequest } from 'next/server';
import { createSupabaseServerClient } from './supabase-server';

export async function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const [scheme, token] = authHeader?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    return {
      authorized: false as const,
      status: 401,
      message: 'Missing access token',
    };
  }

  const supabase = createSupabaseServerClient(token);

  const { data: userData, error: userError } =
    await supabase.auth.getUser(token);
  if (userError || !userData?.user) {
    return {
      authorized: false as const,
      status: 401,
      message: 'Invalid or expired token',
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single();

  if (profileError || !profile) {
    return {
      authorized: false as const,
      status: 403,
      message: 'Profile not found',
    };
  }

  if (profile.role !== 'admin') {
    return {
      authorized: false as const,
      status: 403,
      message: 'Admin access required',
    };
  }

  return { authorized: true as const, userId: userData.user.id };
}
