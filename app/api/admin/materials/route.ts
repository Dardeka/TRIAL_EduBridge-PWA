import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Material from '@/models/Material';
import { requireAdmin } from '@/lib/require-admin';
import { sanitizeSearchParam, isValidObjectId } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const id = sanitizeSearchParam(searchParams.get('id'));

  if (id) {
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid material ID' },
        { status: 400 }
      );
    }
    const material = await Material.findById(id).populate('subject', 'name');
    if (!material) {
      return NextResponse.json(
        { error: 'Materi tidak ditemukan' },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: material });
  }

  const materials = await Material.find().sort({ createdAt: -1 });
  return NextResponse.json({ data: materials });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  await connectToDatabase();
  const body = await req.json();
  const material = await Material.create(body);
  return NextResponse.json({ data: material }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  await connectToDatabase();
  const body = await req.json();
  const { id, ...rest } = body;
  const updated = await Material.findByIdAndUpdate(id, rest, { new: true });
  return NextResponse.json({ data: updated });
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = sanitizeSearchParam(searchParams.get('id'));
  if (!id || !isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid material ID' }, { status: 400 });
  }
  await Material.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
