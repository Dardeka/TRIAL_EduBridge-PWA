import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { sanitizeSearchParam } from '@/lib/sanitize';
import Material from '@/models/Material';

export const dynamic = 'force-dynamic';

const COLOR_PALETTE = [
  'bg-primary/15',
  'bg-accent/15',
  'bg-success/15',
  'bg-info/15',
  'bg-warning/15',
  'bg-destructive/15',
];

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const level = sanitizeSearchParam(searchParams.get('level'));

    if (!level || !['SD', 'SMP', 'SMA'].includes(level)) {
      return NextResponse.json(
        { error: 'Invalid or missing level' },
        { status: 400 }
      );
    }

    const results = await Material.aggregate([
      { $match: { level } },
      {
        $lookup: {
          from: 'subjects',
          localField: 'subject',
          foreignField: '_id',
          as: 'subjectInfo',
        },
      },
      { $unwind: '$subjectInfo' },
      {
        $group: {
          _id: '$subjectInfo._id',
          title: { $first: '$subjectInfo.name' },
          icon: { $first: '$subjectInfo.icon' },
          count: { $sum: 1 },
        },
      },
      { $sort: { title: 1 } },
    ]);

    const subjects = results.map((s: any, i: number) => ({
      id: s._id.toString(),
      title: s.title,
      icon: s.icon,
      count: s.count,
      color: COLOR_PALETTE[i % COLOR_PALETTE.length],
    }));

    return NextResponse.json({ data: subjects });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}
