import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan penggunaan EduBridge',
};

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        title="Syarat & Ketentuan"
        description="Terakhir diperbarui: Januari 2026"
      />
      <Card>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none pt-6">
          <h2>1. Penerimaan Syarat</h2>
          <p>
            Dengan menggunakan EduBridge, Anda menyetujui syarat dan ketentuan
            yang berlaku.
          </p>

          <h2>2. Akun Pengguna</h2>
          <p>
            Anda bertanggung jawab untuk menjaga kerahasiaan akun Anda. Satu
            akun hanya boleh digunakan oleh satu orang.
          </p>

          <h2>3. Penggunaan Layanan</h2>
          <p>
            EduBridge menyediakan platform pembelajaran daring. Konten yang
            tersedia adalah untuk keperluan edukasi dan tidak boleh
            disalahgunakan.
          </p>

          <h2>4. Hak Kekayaan Intelektual</h2>
          <p>
            Seluruh konten di EduBridge dilindungi hak cipta. Anda tidak boleh
            menyalin atau mendistribusikan konten tanpa izin.
          </p>

          <h2>5. Pembatasan Tanggung Jawab</h2>
          <p>
            EduBridge disediakan &quot;sebagaimana adanya&quot; tanpa jaminan
            apapun. Kami tidak bertanggung jawab atas ketidakakuratan konten.
          </p>

          <h2>6. Perubahan</h2>
          <p>
            Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
            Perubahan akan diberitahukan melalui platform.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
