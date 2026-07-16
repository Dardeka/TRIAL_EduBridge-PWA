import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Subject from '@/models/Subject';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const subjects = await Subject.find().select('name').sort({ name: 1 });
    return NextResponse.json({ data: subjects });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}
