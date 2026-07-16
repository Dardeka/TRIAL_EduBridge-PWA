'use client';

import { useState, useEffect } from 'react';
import { SubjectGrid } from '@/components/layout/subject-grid';

interface SubjectItem {
  id: string;
  title: string;
  icon: string;
  count: number;
  color: string;
}

export default function KelasSMPPage() {
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        setLoading(true);
        const res = await fetch('/api/kelas-subjects?level=SMP');
        if (!res.ok) throw new Error('Gagal memuat mata pelajaran');
        const json = await res.json();
        setSubjects(json.data);
      } catch (err) {
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Memuat mata pelajaran...
      </div>
    );
  }

  return (
    <SubjectGrid
      level="SMP"
      levelDescription="Sekolah Menengah Pertama - Kelas 7 sampai 9"
      subjects={subjects}
    />
  );
}
