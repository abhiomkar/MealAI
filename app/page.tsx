import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();

  const user = await prisma.user
    .findUnique({
      where: {
        id: 1,
      },
    });
  const mealPlans = await prisma.mealPlans.findFirst({
    where: {
      userId: 1,
    },
    include: {
      weekPlan: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex flex-col items-center">
      <h1 className="p-4 max-w-5xl w-full font-extrabold tracking-tight text-2xl">Meal AI</h1>
      <div className="z-10 w-full max-w-5xl items-center text-sm lg:flex">
        <ul className="px-4 w-full border-b border-gray-300 pb-6 dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {mealPlans.weekPlan.map((meal) => (
            <li className="pb-4" key={meal.id}>
              <div className="pb-1 text-lg font-medium">{meal.weekday}</div>
              <div className="">{meal.description}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-5xl py-8 px-4 text-sm">
        <h4><div className="font-medium flex pb-1">Ingredients considered:</div> {user?.ingredients.join(', ')}.</h4>
      </div>
    </main>
  )
}
