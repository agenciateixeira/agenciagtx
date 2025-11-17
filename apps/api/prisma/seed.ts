import { PrismaClient } from '@prisma/client';
import { DEFAULT_PIPELINE } from '../src/shared/constants/pipeline.constants';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.pipelineStage.count();
  if (count === 0) {
    await prisma.pipelineStage.createMany({
      data: DEFAULT_PIPELINE,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
