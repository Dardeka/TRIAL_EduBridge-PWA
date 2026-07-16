import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { escapeHtml } from '@/lib/sanitize';
import Certificate from '@/models/Certificate';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const cert = await Certificate.findById(id).lean();

    if (!cert) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    const issuedDate = new Date(cert.issuedAt).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const safeUserId = escapeHtml((cert as any).userId);
    const safeTitle = escapeHtml((cert as any).title);
    const safeScore = escapeHtml(String((cert as any).score));

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<title>Sertifikat - ${safeTitle}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f3f4f6; font-family: 'Inter', sans-serif; }
  .certificate { width: 800px; background: white; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); padding: 60px 80px; text-align: center; position: relative; overflow: hidden; }
  .certificate::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 8px; background: linear-gradient(90deg, #2563eb, #7c3aed); }
  .certificate::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 8px; background: linear-gradient(90deg, #7c3aed, #2563eb); }
  .brand { font-size: 14px; font-weight: 600; color: #2563eb; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 32px; }
  .heading { font-family: 'Playfair Display', serif; font-size: 36px; color: #111827; margin-bottom: 8px; }
  .subtitle { font-size: 16px; color: #6b7280; margin-bottom: 40px; }
  .divider { width: 60px; height: 3px; background: linear-gradient(90deg, #2563eb, #7c3aed); margin: 0 auto 40px; border-radius: 2px; }
  .recipient { font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 4px; }
  .course-label { font-size: 14px; color: #6b7280; margin-bottom: 4px; }
  .course { font-size: 18px; font-weight: 600; color: #2563eb; margin-bottom: 32px; }
  .details { display: flex; justify-content: center; gap: 48px; margin-bottom: 40px; }
  .detail-box { text-align: center; }
  .detail-label { font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .detail-value { font-size: 16px; font-weight: 600; color: #111827; }
  .footer { font-size: 12px; color: #9ca3af; margin-top: 32px; }
</style>
</head>
<body>
  <div class="certificate">
    <div class="brand">EduBridge</div>
    <div class="heading">Sertifikat Kelulusan</div>
    <div class="subtitle">Diberikan kepada peserta yang telah menyelesaikan uji pemahaman</div>
    <div class="divider"></div>
    <div class="recipient">${safeUserId}</div>
    <div class="course-label">Materi</div>
    <div class="course">${safeTitle}</div>
    <div class="details">
      <div class="detail-box">
        <div class="detail-label">Skor</div>
        <div class="detail-value">${safeScore}%</div>
      </div>
      <div class="detail-box">
        <div class="detail-label">Tanggal Terbit</div>
        <div class="detail-value">${escapeHtml(issuedDate)}</div>
      </div>
    </div>
    <div class="footer">Gunakan Ctrl+P untuk menyimpan sebagai PDF</div>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch certificate' },
      { status: 500 }
    );
  }
}
