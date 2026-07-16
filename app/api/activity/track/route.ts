import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/require-auth';
import UserStats from '@/models/UserStats';

export const dynamic = 'force-dynamic';

const DAY_MAP: Record<string, string> = {
  Sun: 'Min',
  Mon: 'Sen',
  Tue: 'Sel',
  Wed: 'Rab',
  Thu: 'Kam',
  Fri: 'Jum',
  Sat: 'Sab',
};

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const userId = auth.userId;

    await connectToDatabase();
    const body = await req.json();
    const { minutesSpent = 1 } = body;

    const minutes =
      typeof minutesSpent === 'number' &&
      minutesSpent >= 1 &&
      minutesSpent <= 120
        ? Math.floor(minutesSpent)
        : 1;

    const today = new Date();
    const dayName =
      DAY_MAP[today.toLocaleDateString('en-US', { weekday: 'short' })];

    await UserStats.findOneAndUpdate(
      { userId },
      {
        $inc: {
          totalMinutesLearned: minutes,
          'weeklyActivity.$[elem].minutes': minutes,
        },
      },
      {
        arrayFilters: [{ 'elem.day': dayName }],
        upsert: true,
      }
    );

    return NextResponse.json({
      data: { success: true, day: dayName, minutes },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to track activity' },
      { status: 500 }
    );
  }
}
