import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/require-auth';
import { sanitizeObject } from '@/lib/sanitize';
import { createSupabaseAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

const VALID_LEVELS = ['SD', 'SMP', 'SMA'];

export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const userId = auth.userId;

    const body = await req.json();
    const { fullName, educationLevel } = sanitizeObject(body);

    if (
      !fullName ||
      typeof fullName !== 'string' ||
      fullName.trim().length < 2 ||
      fullName.length > 100
    ) {
      return NextResponse.json(
        { error: 'fullName must be 2-100 characters' },
        { status: 400 }
      );
    }

    if (!educationLevel || !VALID_LEVELS.includes(educationLevel)) {
      return NextResponse.json(
        { error: 'educationLevel must be SD, SMP, or SMA' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim(), education_level: educationLevel })
      .eq('id', userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: { success: true } });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
