import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/require-auth';
import { isValidObjectId } from '@/lib/sanitize';
import Material from '@/models/Material';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid material ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const body = await req.json();
    const { rating } = body;

    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be 1-5' },
        { status: 400 }
      );
    }

    const material = await Material.findById(id);
    if (!material) {
      return NextResponse.json(
        { error: 'Material not found' },
        { status: 404 }
      );
    }

    const currentRating = material.rating || 4.5;
    const currentStudents = material.students || 0;
    const newRating =
      Math.round(
        ((currentRating * currentStudents + rating) / (currentStudents + 1)) *
          10
      ) / 10;

    await Material.findByIdAndUpdate(id, {
      rating: newRating,
      $inc: { students: 1 },
    });

    return NextResponse.json({ data: { rating: newRating } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to rate material' },
      { status: 500 }
    );
  }
}
