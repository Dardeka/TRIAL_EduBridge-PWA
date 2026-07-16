import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Subject from '@/models/Subject';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();

    const subjects = await Subject.aggregate([
      {
        $lookup: {
          from: 'materials',
          localField: '_id',
          foreignField: 'subject',
          as: 'materials',
        },
      },
      {
        $addFields: {
          count: { $size: '$materials' },
          levels: { $setUnion: ['$materials.level', []] },
        },
      },
      {
        $project: {
          materials: 0,
        },
      },
      { $sort: { name: 1 } },
    ]);

    return NextResponse.json({ data: subjects });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}
