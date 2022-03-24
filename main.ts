import { PrismaClient } from "@prisma/client";
import { createEntries } from "./src/buildEntries";

export const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  await createEntries();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
