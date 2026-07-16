import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/require-auth';
import { requireAdmin } from '@/lib/require-admin';
import UserStats from '@/models/UserStats';

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
    const stats = await UserStats.findOne({ userId: auth.userId });
    return NextResponse.json({ data: stats });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);
    if (!admin.authorized) {
      return NextResponse.json(
        { error: admin.message },
        { status: admin.status }
      );
    }

    await connectToDatabase();
    const body = await req.json();
    const { userId, ...rest } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const updated = await UserStats.findOneAndUpdate(
      { userId },
      { $set: rest },
      { upsert: true, new: true }
    );
    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 }
    );
  }
}
