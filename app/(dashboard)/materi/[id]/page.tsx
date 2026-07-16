import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import Material from '@/models/Material';
import { MaterialDetail } from '@/components/materi/material-detail';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    await connectToDatabase();
    const material = await Material.findById(id)
      .populate('subject', 'name')
      .lean();
    if (!material) return { title: 'Materi Tidak Ditemukan' };
    return {
      title: material.title,
      description:
        material.description ||
        `Materi ${material.subject?.name || ''} - EduBridge`,
    };
  } catch {
    return { title: 'Materi - EduBridge' };
  }
}

interface Chapter {
  _id: string;
  title: string;
  duration: string;
  done: boolean;
  videoUrl?: string;
  pdfUrl?: string;
}

interface MaterialData {
  _id: string;
  title: string;
  subject: { name: string } | null;
  level: string;
  type: 'video' | 'pdf' | 'text';
  duration: string;
  students: number;
  rating: number;
  description: string;
  chapters: Chapter[];
}

async function getMaterial(id: string): Promise<MaterialData | null> {
  try {
    await connectToDatabase();
    const material = await Material.findById(id)
      .populate('subject', 'name')
      .lean();
    if (!material) return null;

    return {
      _id: material._id.toString(),
      title: material.title,
      subject: material.subject as any,
      level: material.level,
      type: material.type,
      duration: material.duration,
      students: material.students,
      rating: material.rating,
      description: material.description,
      chapters: (material.chapters || []).map((c: any) => ({
        _id: c._id.toString(),
        title: c.title,
        duration: c.duration,
        done: false,
        videoUrl: c.videoUrl,
        pdfUrl: c.pdfUrl,
      })),
    };
  } catch (err) {
    return null;
  }
}

export default async function MateriDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const material = await getMaterial(id);

  if (!material) {
    notFound();
  }

  return <MaterialDetail id={id} material={material} />;
}
