import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.TEST_EMAIL_ID || "";

  const user = await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      ingredients: {
        create: [
          {
            name: "Chicken",
          },
          {
            name: "Potato",
          },
        ],
      },
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
