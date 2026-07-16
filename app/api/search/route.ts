import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Material from '@/models/Material';
import { sanitizeSearchParam, escapeRegex } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const q = sanitizeSearchParam(searchParams.get('q'));

    if (!q || q.length < 2) {
      return NextResponse.json({ data: [] });
    }

    const safeRegex = new RegExp(escapeRegex(q), 'i');
    const materials = await Material.find({
      $or: [{ title: safeRegex }, { description: safeRegex }],
    })
      .populate('subject', 'name icon')
      .sort({ views: -1 })
      .limit(20)
      .select('title type level icon subject views');

    return NextResponse.json({ data: materials });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
