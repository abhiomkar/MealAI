import { PrismaClient, User, MealPlans, Prisma } from "@prisma/client";
import Link from "next/link";
import { currentUser, UserButton } from '@clerk/nextjs';
import {redirect} from 'next/navigation';

const prisma = new PrismaClient();

async function getUserMealPlans(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      mealPlans: {
        include: {
          weekPlan: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      }
    }
  });
}

export default async function Home() {
  const cUser = await currentUser();
  if (!cUser?.emailAddresses?.[0]?.emailAddress) {
    redirect('/sign-in');
  }

  let [user] = await Promise.all([getUserMealPlans(cUser.emailAddresses[0].emailAddress)]);
  const weekPlan = user?.mealPlans?.[0].weekPlan;
  const ingredients = user?.ingredients;

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <h1 className="p-4 text-base font-medium tracking-tighter">
          <Link href="/">Meal AI</Link>
        </h1>
        <div className="p-4 text-sm font-medium">
          {cUser ?
            <UserButton afterSignOutUrl="/"/> :
            <Link href="/sign-in">Sign in</Link>
          }
        </div>
      </div>
      <div className="z-10 w-full max-w-xl items-center text-sm lg:flex">
        <ul className="px-4 w-full">
          {weekPlan ? (
            weekPlan.map((meal) => (
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
          {(ingredients && ingredients.length > 0) ?
            (<div><div className="font-medium flex pb-1">Ingredients considered:</div><div>{ingredients.join(", ")}.</div></div>)
            : null
          }
        </h4>
      </div>
    </main>
  );
}
