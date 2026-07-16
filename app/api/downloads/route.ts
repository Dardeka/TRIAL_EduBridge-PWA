import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/require-auth';
import { sanitizeObject } from '@/lib/sanitize';
import Download from '@/models/Download';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    await connectToDatabase();
    const downloads = await Download.find({ userId: auth.userId }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ data: downloads });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch downloads' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    await connectToDatabase();
    const body = await req.json();
    const sanitized = sanitizeObject(body);
    sanitized.userId = auth.userId;
    const record = await Download.create(sanitized);
    return NextResponse.json({ data: record }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save download' },
      { status: 500 }
    );
  }
}
