import { SubjectGrid } from '@/components/layout/subject-grid';

const smaSubjects = [
  { title: 'Matematika', icon: '📊', count: 40, color: 'bg-primary/15' },
  { title: 'Fisika', icon: '⚛️', count: 28, color: 'bg-accent/15' },
  { title: 'Kimia', icon: '🧪', count: 26, color: 'bg-success/15' },
  { title: 'Biologi', icon: '🧬', count: 24, color: 'bg-info/15' },
  { title: 'Bahasa Indonesia', icon: '📝', count: 30, color: 'bg-warning/15' },
  { title: 'Bahasa Inggris', icon: '🌍', count: 32, color: 'bg-destructive/15' },
  { title: 'Sejarah', icon: '🏛️', count: 20, color: 'bg-primary/15' },
  { title: 'Geografi', icon: '🗺️', count: 18, color: 'bg-accent/15' },
  { title: 'Ekonomi', icon: '💰', count: 22, color: 'bg-info/15' },
  { title: 'Sosiologi', icon: '👥', count: 18, color: 'bg-success/15' },
  { title: 'PPKn', icon: '🇮🇩', count: 16, color: 'bg-warning/15' },
  { title: 'Informatika', icon: '💻', count: 20, color: 'bg-destructive/15' },
];

export default function KelasSMAPage() {
  return (
    <SubjectGrid
      level="SMA"
      levelDescription="Sekolah Menengah Atas - Kelas 10 sampai 12"
      subjects={smaSubjects}
    />
  );
}
