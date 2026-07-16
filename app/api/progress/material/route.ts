import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/require-auth';
import { sanitizeSearchParam, isValidObjectId } from '@/lib/sanitize';
import MaterialProgress from '@/models/MaterialProgress';

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
    const { searchParams } = new URL(req.url);
    const materialId = sanitizeSearchParam(searchParams.get('materialId'));
    if (!materialId) {
      return NextResponse.json(
        { error: 'materialId required' },
        { status: 400 }
      );
    }
    if (!isValidObjectId(materialId)) {
      return NextResponse.json(
        { error: 'Invalid materialId' },
        { status: 400 }
      );
    }
    const progress = await MaterialProgress.findOne({
      userId: auth.userId,
      materialId,
    })
      .select('percent')
      .lean();
    return NextResponse.json({
      data: { percent: progress ? progress.percent : 0 },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch material progress' },
      { status: 500 }
    );
  }
}
