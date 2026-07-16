import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { sanitizeSearchParam } from '@/lib/sanitize';
import Certificate from '@/models/Certificate';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const userId = sanitizeSearchParam(searchParams.get('userId'));
  const certificates = await Certificate.find({ userId }).sort({
    createdAt: -1,
  });
  return NextResponse.json({ data: certificates });
}
