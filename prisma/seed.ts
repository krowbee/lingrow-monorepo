/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient, EnglishLevels } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { CryptoService } from '../src/domains/auth/crypto.service';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const cryptoService = new CryptoService();

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
        theory: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: `Welcome to Lesson ${i}` }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `This is the starting theory for lesson ${i}. Edit it in admin panel.`,
                },
              ],
            },
          ],
        },
        englishLevel: EnglishLevels.A1, // Використовуємо Enum з Prisma
        courseId: course.id,
        order: i,
      },
    });
    createdLessons.push(lesson);
    console.log(`   📚 Created lesson ${i}: ${lesson.name}`);
  }

  // 4. Створюємо таски та відповіді
  for (const lesson of createdLessons) {
    for (let i = 1; i <= 3; i++) {
      // Зменшив до 3 для швидкості
      const task = await prisma.task.create({
        data: {
          question: `Task ${i} for ${lesson.name}: What is the correct translation?`,
          lessonId: lesson.id,
          order: i,
          // Створюємо відповіді одразу всередині таски (Nested Write)
          // Це швидше і надійніше, ніж окремий createMany
          answers: {
            create: [
              { text: `Correct answer for task ${i}`, isCorrect: true },
              { text: `Wrong option A`, isCorrect: false },
              { text: `Wrong option B`, isCorrect: false },
            ],
          },
        },
      });
      console.log(`      ✅ Task ${i} with answers created`);
    }
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
