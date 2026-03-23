/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient, EnglishLevels } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { CryptoService } from '../src/domains/auth/crypto.service';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const cryptoService = new CryptoService();

const generateTheory = (lessonNumber: number) => ({
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: `Lesson ${lessonNumber}: Verb "to be"` }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: `The verb "to be" is one of the most important verbs in English because it is used to describe identity, state, and general facts. It helps us say who we are, what something is, or where something is. In the present tense, the verb has three forms: "am", "is", and "are". We use "am" with "I", "is" with "he", "she", and "it", and "are" with "you", "we", and "they". For example, we say "I am a student", "She is happy", and "They are at home". The verb "to be" is also used to describe professions, feelings, and conditions. For example, "He is a doctor" or "I am tired". To make a negative sentence, we simply add "not" after the verb, like "I am not ready" or "She is not here". In spoken English, we often use short forms like "isn't" or "aren't". To make questions, we change the order of the words. For example, instead of "She is happy", we say "Is she happy?". This verb is used very often, so it is important to remember its forms and practice using it in sentences.`,
        },
      ],
    },
  ],
});

const generateTasks = (lessonNumber: number) => [
  {
    question: `Lesson ${lessonNumber}: I ___ a student.`,
    answers: [
      { text: 'am', isCorrect: true },
      { text: 'is', isCorrect: false },
      { text: 'are', isCorrect: false },
    ],
  },
  {
    question: `Lesson ${lessonNumber}: She ___ my sister.`,
    answers: [
      { text: 'is', isCorrect: true },
      { text: 'am', isCorrect: false },
      { text: 'are', isCorrect: false },
    ],
  },
  {
    question: `Lesson ${lessonNumber}: They ___ at home.`,
    answers: [
      { text: 'are', isCorrect: true },
      { text: 'is', isCorrect: false },
      { text: 'am', isCorrect: false },
    ],
  },
  {
    question: `Lesson ${lessonNumber}: ___ he your friend?`,
    answers: [
      { text: 'Is', isCorrect: true },
      { text: 'Are', isCorrect: false },
      { text: 'Am', isCorrect: false },
    ],
  },
  {
    question: `Lesson ${lessonNumber}: We ___ not ready.`,
    answers: [
      { text: 'are', isCorrect: true },
      { text: 'is', isCorrect: false },
      { text: 'am', isCorrect: false },
    ],
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Очищуємо базу перед сідом (щоб не було дублів при перезапуску)
  // Важливо: видаляємо в зворотному порядку через зв'язки (Foreign Keys)
  await prisma.answer.deleteMany();
  await prisma.task.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: 'Test Testers',
      email: 'test18@gmail.com',
      password: await cryptoService.hashValue('12345678'),
      role: 'admin',
    },
  });
  console.log(`✅ Created user ${user.name} (ID: ${user.id})`);
  // 2. Створюємо курс
  const course = await prisma.course.create({
    data: {
      name: 'English starter pack',
      slug: 'english-starter-pack',
      description: 'A basic introductory English course for beginners',
    },
  });
  console.log(`✅ Created course: ${course.name} (ID: ${course.id})`);

  // 3. Створюємо уроки
  // Явно вказуємо тип масиву, щоб уникнути помилки 'never'
  const createdLessons: any = [];

  for (let i = 1; i <= 10; i++) {
    const lesson = await prisma.lesson.create({
      data: {
        name: `Lesson ${i}`,
        slug: `lesson-${i}`,
        theory: generateTheory(i),
        courseId: course.id,
        order: i,
      },
    });

    const tasks = generateTasks(i);

    for (let j = 0; j < tasks.length; j++) {
      const t = tasks[j];

      await prisma.task.create({
        data: {
          question: t.question,
          lessonId: lesson.id,
          order: j + 1,
          answers: {
            create: t.answers,
          },
        },
      });
    }

    console.log(`✅ Lesson ${i} created with real content`);
  }

  console.log('🚀 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
