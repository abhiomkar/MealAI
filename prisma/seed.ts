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
          { name: "Mutton" },
          { name: "Chicken" },
          { name: "Prawns" },
          { name: "Korameenu Fish" },
          { name: "Spinach" },
          { name: "Cauliflower" },
          { name: "Cabbage" },
          { name: "Potato" },
          { name: "Okra" },
          { name: "Egg plant" },
          { name: "Bitter guard" },
          { name: "Broad beans" },
          { name: "Fresh Beans Haricot" },
          { name: "Fresh Beans Broad" },
          { name: "Fresh Beans Cluster" },
          { name: "Ivy guard" },
          { name: "Ridge guard" },
          { name: "Paneer" },
          { name: "Soya Chunks" },
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
