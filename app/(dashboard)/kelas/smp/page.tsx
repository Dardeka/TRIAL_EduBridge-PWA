import { SubjectGrid } from '@/components/layout/subject-grid';

const smpSubjects = [
  { title: 'Matematika', icon: '📐', count: 32, color: 'bg-primary/15' },
  { title: 'Bahasa Indonesia', icon: '📚', count: 26, color: 'bg-accent/15' },
  { title: 'IPA', icon: '🔬', count: 28, color: 'bg-success/15' },
  { title: 'IPS', icon: '🗺️', count: 22, color: 'bg-info/15' },
  { title: 'Bahasa Inggris', icon: '🌐', count: 24, color: 'bg-warning/15' },
  { title: 'PPKn', icon: '⚖️', count: 18, color: 'bg-destructive/15' },
  { title: 'Seni Budaya', icon: '🎭', count: 14, color: 'bg-primary/15' },
  { title: 'PJOK', icon: '🏀', count: 12, color: 'bg-accent/15' },
  { title: 'Informatika', icon: '🖥️', count: 16, color: 'bg-info/15' },
  { title: 'Prakarya', icon: '✂️', count: 10, color: 'bg-success/15' },
];

export default function KelasSMPPage() {
  return (
    <SubjectGrid
      level="SMP"
      levelDescription="Sekolah Menengah Pertama - Kelas 7 sampai 9"
      subjects={smpSubjects}
    />
  );
}
