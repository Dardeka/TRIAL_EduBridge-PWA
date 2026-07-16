import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Material from '@/models/Material';
import { sanitizeSearchParam } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const subject = sanitizeSearchParam(searchParams.get('subject'));
    const level = sanitizeSearchParam(searchParams.get('level'));

    const filter: Record<string, string> = {};
    if (subject) filter.subject = subject;
    if (level) filter.level = level;

    const materials = await Material.find(filter)
      .populate('subject', 'name icon color')
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: materials });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const material = await Material.create(body);
    return NextResponse.json({ data: material }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create material' },
      { status: 500 }
    );
  }
}
