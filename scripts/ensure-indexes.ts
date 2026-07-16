import mongoose, { Schema } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

async function ensureIndexes() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.\n');

  const db = mongoose.connection.db!;

  const indexes = [
    {
      collection: 'materials',
      index: { level: 1, subject: 1 },
      label: 'materials(level, subject)',
    },
    { collection: 'materials', index: { type: 1 }, label: 'materials(type)' },
    {
      collection: 'materials',
      index: { views: -1 },
      label: 'materials(views desc)',
    },
    {
      collection: 'materials',
      index: { createdAt: -1 },
      label: 'materials(createdAt desc)',
    },
    {
      collection: 'materialprogresses',
      index: { userId: 1, materialId: 1 },
      options: { unique: true },
      label: 'materialprogresses(userId, materialId) unique',
    },
    {
      collection: 'userstats',
      index: { userId: 1 },
      options: { unique: true },
      label: 'userstats(userId) unique',
    },
    { collection: 'userstats', index: { xp: -1 }, label: 'userstats(xp desc)' },
    {
      collection: 'certificates',
      index: { userId: 1, issuedAt: -1 },
      label: 'certificates(userId, issuedAt desc)',
    },
    {
      collection: 'certificates',
      index: { userId: 1, title: 1 },
      options: { unique: true },
      label: 'certificates(userId, title) unique',
    },
    {
      collection: 'downloads',
      index: { userId: 1, createdAt: -1 },
      label: 'downloads(userId, createdAt desc)',
    },
    {
      collection: 'dailytasks',
      index: { userId: 1, date: 1 },
      label: 'dailytasks(userId, date)',
    },
    {
      collection: 'userprogresses',
      index: { userId: 1, subjectId: 1 },
      options: { unique: true },
      label: 'userprogresses(userId, subjectId) unique',
    },
    {
      collection: 'quizzes',
      index: { materialId: 1 },
      label: 'quizzes(materialId)',
    },
  ];

  for (const { collection, index, options, label } of indexes) {
    await db.collection(collection).createIndex(index as any, options as any);
    console.log(`✓ ${label}`);
  }

  console.log('\nAll indexes created successfully.');
  await mongoose.disconnect();
  process.exit(0);
}

ensureIndexes().catch((err) => {
  console.error('Failed to create indexes:', err);
  process.exit(1);
});
