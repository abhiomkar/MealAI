import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { currentUser } from '@clerk/nextjs';

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

  const cUser = await currentUser();

  return (
    <main className="flex flex-col items-center">
      <div className="flex py-4 justify-between w-full max-w-xl items-center">
        <h1 className="p-4 font-extrabold tracking-tight text-2xl">
          Meal AI / Meal
        </h1>
        <div className="flex-shrink-0 pr-8 font-semibold text-sm">
          {cUser ? cUser.emailAddresses[0].emailAddress : <Link href="/sign-in">Sign in</Link>}
        </div>
      </div>
      <div className="z-10 w-full max-w-xl items-center text-sm lg:flex">
        <ul className="px-4 w-full">
          {mealPlans ? (
            mealPlans.weekPlan.map((meal) => (
              <li className="pb-4 gap-4 flex" key={meal.id}>
                <div className="text-base rounded-full bg-black dark:bg-gray-50 text-white dark:text-black font-medium h-8 w-8 flex-shrink-0 mt-4 inline-flex align-middle justify-center pt-1">{meal.weekday[0]}</div>
                <div className=""><div className="font-medium flex pb-1">{meal.ingredient}</div> {meal.description}</div>
              </li>
            ))
          ) : (
            <div>No meal plans found.</div>
          )}
        </ul>
      </div>

      <div className="w-full max-w-xl py-8 px-4 text-sm">
        <h4>
          <div className="font-medium flex pb-1">Ingredients considered:</div>{" "}
          {user?.ingredients.join(", ")}.
        </h4>
      </div>
    </main>
  );
}
