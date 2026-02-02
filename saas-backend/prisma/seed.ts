// prisma/seed.ts
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


async function main() {
  const plan = await prisma.plan.create({
    data: {
      name: 'Basic',
      slug: 'basic',
      requestsPerMonth: 100,
      softLimitPercent: 80,
      priceMonthly: 10, // adjust type/scale if needed
    },
  });


  console.log('Created plan:', plan);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 