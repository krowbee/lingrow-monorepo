const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const course = await prisma.course.create({
    data: {
      name: 'English starter pack',
      slug: 'english-starter-pack',
      description: 'A basic introducory English course for begginers',
    },
  });
  console.log('🌱 Created course', course.id);

  const lessons = [];

  for (let i = 1; i <= 10; i++) {
    const lesson = await prisma.lesson.create({
      data: {
        name: `Lesson ${i}`,
        slug: `lesson-${i}`,
        theory: `Theory content for lesson-${i}`,
        englishLevel: 'A1',
        courseId: course.id,
        order: i,
      },
    });
    lessons.push(lesson);
    console.log(`🌱 Created lesson ${i}: ${lesson.id}`);
  }

  for (const lesson of lessons) {
    for (let i = 1; i <= 10; i++) {
      const task = await prisma.task.create({ data: {
      question:`Task ${i} for Lesson ${lesson.id}`,
      lessonId:lesson.id,
      order:i} });

      const answers = await prisma.answer.createMany({data: [
          {
            text: `Correct answer for task ${task.id}`,
            isCorrect: true,
            taskId: task.id
          },
          {
            text: `Wrong answer 1 for task ${task.id}`,
            isCorrect: false,
            taskId: task.id
          },
          {
            text: `Wrong answer 2 for task ${task.id}`,
            isCorrect: false,
            taskId: task.id
          },
          {
            text: `Wrong answer 3 for task ${task.id}`,
            isCorrect: false,
            taskId: task.id
          }
        ]})
        console.log(`🌱 Created Task ${task.id} for Lesson ${lesson.id}`)
    }
  }
    console.log("🌱 Seeding completed successfully!");
}

main().catch((e)=>{console.log(e);
  process.exit(1);
}).finally(async ()=>{
  await prisma.$disconnect()
});
