import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
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
      <div className="flex self-start justify-between w-full items-center">
        <h1 className="p-4 max-w-5xl w-full font-extrabold tracking-tight text-2xl">
          Meal AI
        </h1>
        <div className="flex-shrink-0 pr-8 font-semibold text-sm">
          {<Link href="/sign-in">Sign in</Link>}
        </div>
      </div>
      <div className="z-10 w-full max-w-5xl items-center text-sm lg:flex">
        <ul className="px-4 w-full border-b border-gray-300 pb-6 dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {mealPlans ? (
            mealPlans.weekPlan.map((meal) => (
              <li className="pb-4 gap-4 flex" key={meal.id}>
                <div className="text-base rounded-full bg-black text-white font-medium h-8 w-8 flex-shrink-0 mt-4 inline-flex align-middle justify-center pt-1">{meal.weekday[0]}</div>
                <div className=""><div className="font-medium flex pb-1">{meal.ingredient}</div> {meal.description}</div>
              </li>
            ))
          ) : (
            <div>No meal plans found.</div>
          )}
        </ul>
      </div>

      <div className="max-w-5xl py-8 px-4 text-sm">
        <h4>
          <div className="font-medium flex pb-1">Ingredients considered:</div>{" "}
          {user?.ingredients.join(", ")}.
        </h4>
      </div>
    </main>
  );
}
