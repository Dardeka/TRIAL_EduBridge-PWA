import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Material from '@/models/Material';
import { createSupabaseAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

const LEVELS = ['SD', 'SMP', 'SMA'] as const;

export async function GET() {
  try {
    await connectToDatabase();
    const supabaseAdmin = createSupabaseAdminClient();

    const results = await Promise.all(
      LEVELS.map(async (level) => {
        const [materialCount, studentCountResult] = await Promise.all([
          Material.countDocuments({ level }),
          supabaseAdmin
            .from('profiles')
            .select('id', { count: 'exact', head: true })
            .eq('role', 'student')
            .eq('education_level', level),
        ]);
        return {
          level,
          materialCount,
          studentCount: studentCountResult.count ?? 0,
        };
      })
    );

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch kelas overview' },
      { status: 500 }
    );
  }
}
