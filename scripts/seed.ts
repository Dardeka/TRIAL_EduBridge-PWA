import dotenv from 'dotenv';
dotenv.config();

import { connectToDatabase } from '../lib/mongodb';
import Subject from '../models/Subject';
import Material from '../models/Material';
import UserStats from '../models/UserStats';
import MaterialProgress from '../models/MaterialProgress';
import DailyTask from '../models/DailyTask';
import Achievement from '../models/Achievement';
import Quiz from '../models/Quiz';
import Download from '../models/Download';

async function seed() {
  await connectToDatabase();

  await Subject.deleteMany({});
  await Material.deleteMany({});

  const subjects = await Subject.insertMany([
    { name: 'Matematika', icon: '📐', color: '#3B82F6' },
    { name: 'Bahasa Indonesia', icon: '📚', color: '#22C55E' },
    { name: 'IPA', icon: '🔬', color: '#22C55E' },
    { name: 'Fisika', icon: '⚛️', color: '#8B5CF6' },
    { name: 'Kimia', icon: '🧪', color: '#EC4899' },
    { name: 'Biologi', icon: '🧬', color: '#10B981' },
    { name: 'Bahasa Inggris', icon: '🌐', color: '#F59E0B' },
    { name: 'Sejarah', icon: '🏛️', color: '#6366F1' },
    { name: 'Geografi', icon: '🗺️', color: '#14B8A6' },
    { name: 'Ekonomi', icon: '💰', color: '#EAB308' },
    { name: 'Informatika', icon: '💻', color: '#3B82F6' },
    { name: 'PPKn', icon: '🇮🇩', color: '#EF4444' },
  ]);

  const find = (name: string) => subjects.find((s) => s.name === name)!._id;

  await Material.insertMany([
    {
      title: 'Aljabar Linear - Sistem Persamaan',
      type: 'video',
      subject: find('Matematika'),
      level: 'SMA',
      description:
        'Pelajari konsep sistem persamaan linear, metode eliminasi, substitusi, dan grafik.',
      icon: '📐',
      duration: '45 min',
      students: 320,
      rating: 4.8,
      status: 'published',
      chapters: [
        { title: 'Pengenalan Sistem Persamaan', duration: '8 min', order: 1 },
        { title: 'Metode Eliminasi', duration: '12 min', order: 2 },
        { title: 'Metode Substitusi', duration: '10 min', order: 3 },
        { title: 'Metode Grafik', duration: '15 min', order: 4 },
      ],
    },
    {
      title: 'Persamaan Kuadrat',
      type: 'video',
      subject: find('Matematika'),
      level: 'SMP',
      description: 'Belajar dasar-dasar persamaan kuadrat.',
      icon: '📊',
      duration: '35 min',
      students: 410,
      rating: 4.6,
      status: 'published',
      chapters: [{ title: 'Pengenalan', duration: '10 min', order: 1 }],
    },
    {
      title: 'Pengenalan Pecahan',
      type: 'video',
      subject: find('Matematika'),
      level: 'SD',
      description: 'Belajar dasar pecahan untuk kelas 4.',
      icon: '➗',
      duration: '20 min',
      students: 120,
      rating: 4.5,
      status: 'published',
      chapters: [{ title: 'Apa itu Pecahan', duration: '10 min', order: 1 }],
    },
    {
      title: 'Sistem Pencernaan Manusia',
      type: 'pdf',
      subject: find('IPA'),
      level: 'SD',
      description: 'Mengenal organ dan proses pencernaan manusia.',
      icon: '🧬',
      duration: '20 min',
      students: 180,
      rating: 4.5,
      status: 'published',
      chapters: [{ title: 'Organ Pencernaan', duration: '10 min', order: 1 }],
    },
    {
      title: 'Tata Surya dan Planet',
      type: 'pdf',
      subject: find('IPA'),
      level: 'SD',
      description: 'Mengenal planet-planet di tata surya.',
      icon: '🪐',
      duration: '15 min',
      students: 150,
      rating: 4.4,
      status: 'published',
      chapters: [{ title: 'Pengenalan Planet', duration: '8 min', order: 1 }],
    },
    {
      title: 'Tenses in English Grammar',
      type: 'video',
      subject: find('Bahasa Inggris'),
      level: 'SMP',
      description: 'Memahami penggunaan tenses dalam bahasa Inggris.',
      icon: '📖',
      duration: '30 min',
      students: 450,
      rating: 4.7,
      status: 'published',
      chapters: [
        { title: 'Simple Present Tense', duration: '10 min', order: 1 },
      ],
    },
    {
      title: 'Proklamasi Kemerdekaan',
      type: 'pdf',
      subject: find('Sejarah'),
      level: 'SMA',
      description: 'Sejarah proklamasi kemerdekaan Indonesia.',
      icon: '🏛️',
      duration: '25 min',
      students: 210,
      rating: 4.6,
      status: 'published',
      chapters: [{ title: 'Latar Belakang', duration: '10 min', order: 1 }],
    },
    {
      title: 'Pengenalan Pemrograman',
      type: 'video',
      subject: find('Informatika'),
      level: 'SMP',
      description: 'Dasar-dasar pemrograman untuk pemula.',
      icon: '💻',
      duration: '60 min',
      students: 380,
      rating: 4.9,
      status: 'published',
      chapters: [
        { title: 'Apa itu Pemrograman', duration: '15 min', order: 1 },
      ],
    },
    {
      title: 'Rangkaian Listrik Dasar',
      type: 'video',
      subject: find('Fisika'),
      level: 'SMA',
      description: 'Memahami konsep dasar rangkaian listrik.',
      icon: '⚡',
      duration: '40 min',
      students: 290,
      rating: 4.7,
      status: 'published',
      chapters: [{ title: 'Hukum Ohm', duration: '12 min', order: 1 }],
    },
    {
      title: 'Ekosistem dan Keseimbangan',
      type: 'pdf',
      subject: find('Biologi'),
      level: 'SMA',
      description: 'Mempelajari ekosistem dan keseimbangan alam.',
      icon: '🌱',
      duration: '30 min',
      students: 260,
      rating: 4.5,
      status: 'published',
      chapters: [
        { title: 'Pengenalan Ekosistem', duration: '10 min', order: 1 },
      ],
    },
  ]);

  const YOUR_USER_ID = '84675d3e-d276-4fa4-a717-b54085b62c14';

  await UserStats.deleteMany({ userId: YOUR_USER_ID });
  await MaterialProgress.deleteMany({ userId: YOUR_USER_ID });
  await DailyTask.deleteMany({ userId: YOUR_USER_ID });
  await Achievement.deleteMany({});

  await UserStats.create({
    userId: YOUR_USER_ID,
    xp: 2450,
    xpToNextLevel: 3000,
    level: 7,
    streak: 12,
    totalMinutesLearned: 7620,
    quizScoreSum: 0,
    quizAttempts: 0,
    weeklyActivity: [
      { day: 'Sen', minutes: 150 },
      { day: 'Sel', minutes: 180 },
      { day: 'Rab', minutes: 90 },
      { day: 'Kam', minutes: 240 },
      { day: 'Jum', minutes: 120 },
      { day: 'Sab', minutes: 210 },
      { day: 'Min', minutes: 60 },
    ],
  });

  // ambil beberapa material yang baru saja di-insert untuk contoh progress
  const progressMaterials = await Material.find().limit(3);
  if (progressMaterials.length >= 3) {
    await MaterialProgress.insertMany([
      {
        userId: YOUR_USER_ID,
        materialId: progressMaterials[0]._id,
        percent: 75,
      },
      {
        userId: YOUR_USER_ID,
        materialId: progressMaterials[1]._id,
        percent: 40,
      },
      {
        userId: YOUR_USER_ID,
        materialId: progressMaterials[2]._id,
        percent: 90,
      },
    ]);
  }

  await Quiz.deleteMany({});
  const allMaterials = await Material.find();
  const matByTitle = Object.fromEntries(allMaterials.map((m) => [m.title, m]));

  const quizzes = [
    {
      title: 'Kuis: Aljabar Linear - Sistem Persamaan',
      materialTitle: 'Aljabar Linear - Sistem Persamaan',
      questions: [
        {
          question: 'Berapa hasil dari 2x + 3 = 7?',
          options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
          correctAnswer: 1,
          explanation: '2x = 7 - 3 = 4, maka x = 2',
        },
        {
          question: 'Metode eliminasi digunakan untuk?',
          options: [
            'Menjumlahkan variabel',
            'Menghilangkan satu variabel',
            'Mengalikan pecahan',
            'Membagi konstanta',
          ],
          correctAnswer: 1,
          explanation: 'Eliminasi bertujuan menghilangkan salah satu variabel',
        },
        {
          question: 'Jika 3x - 6 = 0, maka x =?',
          options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
          correctAnswer: 1,
          explanation: '3x = 6, x = 2',
        },
      ],
    },
    {
      title: 'Kuis: Persamaan Kuadrat',
      materialTitle: 'Persamaan Kuadrat',
      questions: [
        {
          question: 'Bentuk umum persamaan kuadrat adalah...',
          options: [
            'ax² + bx + c = 0',
            'ax + b = 0',
            'ax² + b = 0',
            'a²x + bx + c = 0',
          ],
          correctAnswer: 0,
          explanation: 'Persamaan kuadrat memiliki suku pangkat 2',
        },
        {
          question: 'Jika x² - 5x + 6 = 0, maka nilai x adalah...',
          options: [
            'x=1 dan x=6',
            'x=2 dan x=3',
            'x=-2 dan x=-3',
            'x=1 dan x=5',
          ],
          correctAnswer: 1,
          explanation: '(x-2)(x-3) = 0, sehingga x=2 atau x=3',
        },
        {
          question: 'Discriminant (D) dari ax² + bx + c = 0 adalah...',
          options: ['b² - 4ac', 'b² + 4ac', '4ac - b²', 'b - 4ac'],
          correctAnswer: 0,
          explanation: 'Rumus discriminant adalah D = b² - 4ac',
        },
        {
          question: 'Jika D > 0, maka persamaan kuadrat memiliki...',
          options: [
            '2 akar berbeda',
            '2 akar sama',
            'Tidak ada akar nyata',
            '1 akar',
          ],
          correctAnswer: 0,
          explanation: 'D > 0 berarti dua akar real yang berbeda',
        },
      ],
    },
    {
      title: 'Kuis: Pengenalan Pecahan',
      materialTitle: 'Pengenalan Pecahan',
      questions: [
        {
          question: 'Pada pecahan 3/4, angka 3 disebut...',
          options: ['Penyebut', 'Pembilang', 'Pecahan', 'Hasil'],
          correctAnswer: 1,
          explanation:
            'Angka atas adalah pembilang, angka bawah adalah penyebut',
        },
        {
          question: '1/2 + 1/4 = ...',
          options: ['2/6', '3/4', '2/4', '1/8'],
          correctAnswer: 1,
          explanation: '1/2 = 2/4, maka 2/4 + 1/4 = 3/4',
        },
        {
          question: 'Pecahan 4/8 sama dengan...',
          options: ['1/4', '1/2', '2/4', '3/4'],
          correctAnswer: 1,
          explanation: '4/8 disederhanakan dengan FPB 4 = 1/2',
        },
        {
          question: '3/5 × 2/3 = ...',
          options: ['6/15', '5/15', '3/10', '1/5'],
          correctAnswer: 0,
          explanation: '3×2 / 5×3 = 6/15',
        },
      ],
    },
    {
      title: 'Kuis: Sistem Pencernaan Manusia',
      materialTitle: 'Sistem Pencernaan Manusia',
      questions: [
        {
          question: 'Organ pencernaan makanan pertama adalah...',
          options: ['Lambung', 'Mulut', 'Usus halus', 'Kerongkongan'],
          correctAnswer: 1,
          explanation: 'Makanan masuk dan dicerna pertama kali di mulut',
        },
        {
          question: 'Fungsi usus halus adalah...',
          options: [
            'Menyerap air',
            'Menyerap nutrisi',
            'Mencerna makanan kasar',
            'Menyimpan makanan',
          ],
          correctAnswer: 1,
          explanation: 'Usus halus menyerap nutrisi dari makanan',
        },
        {
          question: 'Makanan yang sudah dicerna diserap melalui...',
          options: ['Usus besar', 'Usus halus', 'Lambung', 'Kerongkongan'],
          correctAnswer: 1,
          explanation: 'Usus halus memiliki vili untuk menyerap nutrisi',
        },
        {
          question: 'Lambung menghasilkan cairan yang bersifat...',
          options: ['Basa', 'Asam', 'Netral', 'Garam'],
          correctAnswer: 1,
          explanation: 'Lambung menghasilkan HCl yang bersifat asam',
        },
      ],
    },
    {
      title: 'Kuis: Tata Surya dan Planet',
      materialTitle: 'Tata Surya dan Planet',
      questions: [
        {
          question: 'Planet terbesar dalam tata surya adalah...',
          options: ['Saturnus', 'Jupiter', 'Neptunus', 'Uranus'],
          correctAnswer: 1,
          explanation: 'Jupiter adalah planet terbesar',
        },
        {
          question: 'Planet yang paling dekat dengan Matahari adalah...',
          options: ['Merkurius', 'Venus', 'Bumi', 'Mars'],
          correctAnswer: 0,
          explanation: 'Merkurius adalah planet pertama dari Matahari',
        },
        {
          question: 'Bumi merupakan planet ke-... dari Matahari',
          options: ['1', '2', '3', '4'],
          correctAnswer: 2,
          explanation: 'Urutan: Merkurius, Venus, Bumi',
        },
        {
          question: 'Planet yang memiliki cincin terindah adalah...',
          options: ['Bumi', 'Mars', 'Jupiter', 'Saturnus'],
          correctAnswer: 3,
          explanation: 'Saturnus terkenal dengan cincinnya',
        },
      ],
    },
    {
      title: 'Kuis: Tenses in English Grammar',
      materialTitle: 'Tenses in English Grammar',
      questions: [
        {
          question: '"She ___ to school every day."',
          options: ['go', 'goes', 'going', 'went'],
          correctAnswer: 1,
          explanation: 'Simple present第三人称单数加-es',
        },
        {
          question: '"They ___ football yesterday."',
          options: ['play', 'plays', 'played', 'playing'],
          correctAnswer: 2,
          explanation: 'Simple past menggunakan kata kerja bentuk kedua',
        },
        {
          question: '"I ___ dinner at the moment."',
          options: ['cook', 'cooks', 'cooking', 'am cooking'],
          correctAnswer: 3,
          explanation: 'Present continuous: subject + am/is/are + V-ing',
        },
        {
          question: '"He ___ to Jakarta next week."',
          options: ['go', 'goes', 'will go', 'went'],
          correctAnswer: 2,
          explanation: 'Simple future menggunakan will + V1',
        },
      ],
    },
    {
      title: 'Kuis: Proklamasi Kemerdekaan',
      materialTitle: 'Proklamasi Kemerdekaan',
      questions: [
        {
          question: 'Tanggal proklamasi kemerdekaan Indonesia adalah...',
          options: [
            '17 Agustus 1945',
            '17 Agustus 1944',
            '17 Juli 1945',
            '17 Juni 1945',
          ],
          correctAnswer: 0,
          explanation: 'Proklamasi dibacakan pada 17 Agustus 1945',
        },
        {
          question: 'Naskah proklamasi ditulis di rumah...',
          options: ['Soekarno', 'Moh. Hatta', 'Ahmad Soebardjo', 'Fatmawati'],
          correctAnswer: 2,
          explanation: 'Naskah ditulis di rumah Ahmad Soebardjo',
        },
        {
          question: 'Tokoh yang membacakan proklamasi adalah...',
          options: ['Moh. Hatta', 'Soekarno', 'Ahmad Soebardjo', 'Soepomo'],
          correctAnswer: 1,
          explanation: 'Soekarno yang membacakan teks proklamasi',
        },
        {
          question: 'Isi teks proklamasi terdiri dari...',
          options: ['2 paragraf', '3 paragraf', '4 paragraf', '1 paragraf'],
          correctAnswer: 0,
          explanation: 'Teks proklamasi hanya 2 paragraf singkat',
        },
      ],
    },
    {
      title: 'Kuis: Pengenalan Pemrograman',
      materialTitle: 'Pengenalan Pemrograman',
      questions: [
        {
          question: 'Variabel dalam pemrograman adalah...',
          options: [
            'Tempat menyimpan data',
            'Jenis program',
            'Bahasa pemrograman',
            'Perintah cetak',
          ],
          correctAnswer: 0,
          explanation: 'Variabel adalah nama untuk menyimpan nilai',
        },
        {
          question: 'Tipe data untuk bilangan bulat adalah...',
          options: ['String', 'Integer', 'Boolean', 'Float'],
          correctAnswer: 1,
          explanation: 'Integer menyimpan bilangan bulat',
        },
        {
          question: 'Perintah menampilkan teks di Python adalah...',
          options: ['print()', 'echo()', 'display()', 'show()'],
          correctAnswer: 0,
          explanation: 'print() adalah fungsi bawaan Python',
        },
        {
          question: 'Kondisi if-else digunakan untuk...',
          options: [
            'Perulangan',
            'Seleksi percabangan',
            'Menyimpan data',
            'Menampilkan teks',
          ],
          correctAnswer: 1,
          explanation:
            'if-else menentukan jalannya program berdasarkan kondisi',
        },
      ],
    },
    {
      title: 'Kuis: Rangkaian Listrik Dasar',
      materialTitle: 'Rangkaian Listrik Dasar',
      questions: [
        {
          question: 'Hukum Ohm menyatakan bahwa...',
          options: ['V = IR', 'V = I/R', 'I = VR', 'R = VI'],
          correctAnswer: 0,
          explanation: 'Tegangan = Arus × Hambatan',
        },
        {
          question: 'Satuan hambatan listrik adalah...',
          options: ['Ampere', 'Volt', 'Watt', 'Ohm'],
          correctAnswer: 3,
          explanation: 'Hambatan diukur dalam Ohm (Ω)',
        },
        {
          question: 'Pada rangkaian seri, total hambatan adalah...',
          options: [
            'R1 + R2 + R3',
            '1/R1 + 1/R2 + 1/R3',
            'R1 × R2 × R3',
            'R1 - R2 - R3',
          ],
          correctAnswer: 0,
          explanation: 'Rangkaian seri: R total = jumlah seluruh hambatan',
        },
        {
          question:
            'Jika tegangan 12V dan hambatan 4Ω, arus yang mengalir adalah...',
          options: ['3A', '48A', '0.33A', '8A'],
          correctAnswer: 0,
          explanation: 'I = V/R = 12/4 = 3 Ampere',
        },
      ],
    },
    {
      title: 'Kuis: Ekosistem dan Keseimbangan',
      materialTitle: 'Ekosistem dan Keseimbangan',
      questions: [
        {
          question: 'Komponen biotik dalam ekosistem adalah...',
          options: ['Air', 'Tanah', 'Tumbuhan', 'Sinar matahari'],
          correctAnswer: 2,
          explanation: 'Biotik = makhluk hidup (tumbuhan, hewan)',
        },
        {
          question: 'Rantai makanan yang benar adalah...',
          options: [
            'Rumput → Kambing → Harimau',
            'Harimau → Kambing → Rumput',
            'Kambing → Rumput → Harimau',
            'Rumput → Harimau → Kambing',
          ],
          correctAnswer: 0,
          explanation: 'Energi mengalir dari produsen ke konsumen',
        },
        {
          question: 'Organisme produsen dalam ekosistem adalah...',
          options: ['Hewan', 'Tumbuhan', 'Bakteri', 'Jamur'],
          correctAnswer: 1,
          explanation: 'Tumbuhan menghasilkan makanan melalui fotosintesis',
        },
        {
          question: 'Simbiosis mutualisme adalah hubungan yang...',
          options: [
            'Merugikan kedua pihak',
            'Menguntungkan satu pihak',
            'Menguntungkan kedua pihak',
            'Tidak saling mempengaruhi',
          ],
          correctAnswer: 2,
          explanation: 'Mutualisme = saling menguntungkan',
        },
      ],
    },
  ];

  for (const quiz of quizzes) {
    const material = matByTitle[quiz.materialTitle];
    if (!material) continue;
    await Quiz.create({
      materialId: material._id,
      title: quiz.title,
      passingScore: 70,
      questions: quiz.questions,
    });
  }

  await DailyTask.insertMany([
    {
      userId: YOUR_USER_ID,
      title: 'Selesaikan 1 video Matematika',
      xpReward: 50,
      completed: true,
      date: new Date(),
    },
    {
      userId: YOUR_USER_ID,
      title: 'Kuis: Tenses Bahasa Inggris',
      xpReward: 100,
      completed: false,
      date: new Date(),
    },
    {
      userId: YOUR_USER_ID,
      title: 'Baca 1 materi IPA',
      xpReward: 30,
      completed: false,
      date: new Date(),
    },
    {
      userId: YOUR_USER_ID,
      title: 'Latihan soal Fisika',
      xpReward: 80,
      completed: false,
      date: new Date(),
    },
  ]);

  await Achievement.deleteMany({});
  await Achievement.insertMany([
    {
      key: 'first_steps',
      title: 'First Steps',
      description: 'Selesaikan materi pertama',
      icon: '🎯',
      earnedBy: [YOUR_USER_ID],
    },
    {
      key: 'quiz_master',
      title: 'Quiz Master',
      description: 'Lulus 10 kuis',
      icon: '🧠',
      earnedBy: [YOUR_USER_ID],
    },
    {
      key: 'consistent',
      title: 'Consistent',
      description: 'Belajar 7 hari berturut',
      icon: '🔥',
      earnedBy: [YOUR_USER_ID],
    },
    {
      key: 'bookworm',
      title: 'Bookworm',
      description: 'Selesaikan 25 materi',
      icon: '📚',
      earnedBy: [],
    },
    {
      key: 'perfect_score',
      title: 'Perfect Score',
      description: '100% di 5 kuis',
      icon: '💯',
      earnedBy: [],
    },
    {
      key: 'marathon',
      title: 'Marathon',
      description: 'Belajar 30 hari berturut',
      icon: '🏃',
      earnedBy: [],
    },
  ]);

  await Download.deleteMany({ userId: YOUR_USER_ID });

  const materialsForDownload = await Material.find()
    .limit(3)
    .populate('subject', 'name');
  if (materialsForDownload.length > 0) {
    await Download.insertMany(
      materialsForDownload.map((m: any) => ({
        userId: YOUR_USER_ID,
        materialId: m._id,
        title: `${m.title} - Modul`,
        subject: m.subject?.name ?? '-',
        type: m.type === 'video' ? 'video' : 'pdf',
        fileSize: m.type === 'video' ? '98 MB' : '2.4 MB',
        fileUrl: '', // belum ada storage file asli
      }))
    );
  }

  console.log('Seed complete:', subjects.length, 'subjects created');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
