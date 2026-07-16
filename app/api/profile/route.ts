import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { sanitizeSearchParam } from '@/lib/sanitize';
import UserStats from '@/models/UserStats';
import MaterialProgress from '@/models/MaterialProgress';
import Material from '@/models/Material';
import Quiz from '@/models/Quiz';
import Certificate from '@/models/Certificate';
import Achievement from '@/models/Achievement';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = sanitizeSearchParam(searchParams.get('userId'));
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const [
      statsDoc,
      totalMaterials,
      totalQuizzes,
      materiSelesai,
      kuisLulus,
      achievementDocs,
      certificateDocs,
    ] = await Promise.all([
      UserStats.findOne({ userId }),
      Material.countDocuments(),
      Quiz.countDocuments(),
      MaterialProgress.countDocuments({ userId, percent: 100 }),
      Certificate.countDocuments({ userId }),
      Achievement.find().sort({ createdAt: 1 }),
      Certificate.find({ userId }).sort({ issuedAt: -1 }),
    ]);

    const jamBelajar = Math.round((statsDoc?.totalMinutesLearned || 0) / 60);

    const stats = [
      {
        label: 'Materi Selesai',
        value: materiSelesai,
        total: totalMaterials,
        color: 'success',
      },
      {
        label: 'Kuis Lulus',
        value: kuisLulus,
        total: totalQuizzes,
        color: 'info',
      },
      { label: 'Jam Belajar', value: jamBelajar, total: 200, color: 'warning' },
    ];

    const achievements = achievementDocs.map((a: any) => ({
      title: a.title,
      description: a.description,
      icon: a.icon,
      earned: (a.earnedBy || []).includes(userId),
    }));

    const certificates = certificateDocs.map((c: any) => ({
      title: c.title,
      date: new Date(c.issuedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      score: c.score,
    }));

    return NextResponse.json({ data: { stats, achievements, certificates } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
