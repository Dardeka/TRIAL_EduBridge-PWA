import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi EduBridge',
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        title="Kebijakan Privasi"
        description="Terakhir diperbarui: Januari 2026"
      />
      <Card>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none pt-6">
          <h2>1. Pengumpulan Data</h2>
          <p>
            EduBridge mengumpulkan informasi yang Anda berikan saat mendaftar,
            termasuk nama lengkap, alamat email, dan jenjang pendidikan. Kami
            juga mengumpulkan data aktivitas belajar seperti materi yang
            diakses, skor kuis, dan waktu belajar.
          </p>

          <h2>2. Penggunaan Data</h2>
          <p>
            Data yang dikumpulkan digunakan untuk: menyediakan layanan
            pembelajaran, melacak progress belajar, memberikan sertifikat, dan
            meningkatkan kualitas platform.
          </p>

          <h2>3. Keamanan Data</h2>
          <p>
            Data Anda diamankan melalui enkripsi dan autentikasi Supabase. Kami
            tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga.
          </p>

          <h2>4. Cookie</h2>
          <p>
            EduBridge menggunakan service worker untuk caching offline dan
            session storage untuk menjaga sesi login Anda.
          </p>

          <h2>5. Hak Anda</h2>
          <p>
            Anda memiliki hak untuk mengakses, mengubah, atau menghapus data
            pribadi Anda melalui halaman profil.
          </p>

          <h2>6. Kontak</h2>
          <p>
            Untuk pertanyaan tentang privasi, hubungi kami di
            privacy@edubridge.app.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
