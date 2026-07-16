import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Material from '@/models/Material';
import { requireAdmin } from '@/lib/require-admin';
import { createSupabaseAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    await connectToDatabase();

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const supabaseAdmin = createSupabaseAdminClient();

    const [
      totalSiswaResult,
      totalMateri,
      totalVideo,
      totalPdf,
      materiBaruBulanIni,
      videoBaruBulanIni,
      pdfBaruBulanIni,
      recentUploadsDocs,
      topMaterialsDocs,
    ] = await Promise.all([
      supabaseAdmin
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .eq('role', 'student'),
      Material.countDocuments(),
      Material.countDocuments({ type: 'video' }),
      Material.countDocuments({ type: 'pdf' }),
      Material.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Material.countDocuments({
        type: 'video',
        createdAt: { $gte: startOfMonth },
      }),
      Material.countDocuments({
        type: 'pdf',
        createdAt: { $gte: startOfMonth },
      }),
      Material.find().sort({ createdAt: -1 }).limit(4),
      Material.find().sort({ views: -1 }).limit(5),
    ]);

    const totalSiswa = totalSiswaResult.count ?? 0;

    const timeAgo = (date: Date) => {
      const diffMs = Date.now() - new Date(date).getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 1) return 'Baru saja';
      if (diffHours < 24) return `${diffHours} jam lalu`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} hari lalu`;
    };

    const recentUploads = recentUploadsDocs.map((m: any) => ({
      title: m.title,
      type: m.type === 'video' ? 'Video' : 'PDF',
      date: timeAgo(m.createdAt),
      status: m.status,
    }));

    const maxViews = Math.max(1, ...topMaterialsDocs.map((m: any) => m.views));
    const topMaterials = topMaterialsDocs.map((m: any) => ({
      title: m.title,
      views: m.views,
      percent: Math.round((m.views / maxViews) * 100),
    }));

    return NextResponse.json({
      data: {
        adminStats: [
          {
            label: 'Total Siswa',
            value: totalSiswa.toLocaleString('id-ID'),
            change: null,
          },
          {
            label: 'Total Materi',
            value: totalMateri.toLocaleString('id-ID'),
            change: `+${materiBaruBulanIni} bulan ini`,
          },
          {
            label: 'Video',
            value: totalVideo.toLocaleString('id-ID'),
            change: `+${videoBaruBulanIni} bulan ini`,
          },
          {
            label: 'Dokumen PDF',
            value: totalPdf.toLocaleString('id-ID'),
            change: `+${pdfBaruBulanIni} bulan ini`,
          },
        ],
        recentUploads,
        topMaterials,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch admin dashboard' },
      { status: 500 }
    );
  }
}
