import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/require-auth';
import { isValidObjectId } from '@/lib/sanitize';
import UserProgress from '@/models/UserProgress';

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
    const progress = await UserProgress.find({ userId: auth.userId });
    return NextResponse.json({ data: progress });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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
    const { subjectId, ...rest } = body;

    if (!subjectId || !isValidObjectId(subjectId)) {
      return NextResponse.json(
        { error: 'Valid subjectId required' },
        { status: 400 }
      );
    }

    const updated = await UserProgress.findOneAndUpdate(
      { userId: auth.userId, subjectId },
      { $set: rest },
      { upsert: true, new: true }
    );
    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
