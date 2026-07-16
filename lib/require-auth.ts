import { NextRequest } from 'next/server';
import { createSupabaseServerClient } from './supabase-server';

export async function requireAuth(req: NextRequest) {
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

  return { authorized: true as const, userId: userData.user.id };
}
