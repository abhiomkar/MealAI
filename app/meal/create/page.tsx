import { Ingredient } from "@prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth-options";
import { MealPlanGenerator } from "@/app/meal/meal-plan-generator";
import prisma from "@/app/prisma/prisma";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header/header";

async function getUserMealPlans(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      ingredients: true,
      mealPlans: {
        include: {
          weekPlan: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { name, email } = session?.user || {};

  let userId = "";
  let ingredients: Ingredient[] = [];
  if (email) {
    const user = await getUserMealPlans(email);
    userId = user?.id || "";
    ingredients = user?.ingredients || [];
  }

  return (
    <main className="flex flex-col items-center">
      <Header name={name} />
      <div className="w-full max-w-xl px-4 py-8">
        <h3 className="pb-4 text-2xl font-extrabold">Create meal plan</h3>
        <div>
          {ingredients && ingredients.length > 0 ? (
            <div>
              <div className="inline-flex pb-1 pr-2 text-sm font-semibold">
                Ingredients selected:
              </div>
              <div className="inline-flex text-sm">
                {ingredients
                  .map((ingredient: Ingredient) => ingredient.name)
                  .join(", ")}
                .
              </div>
              <Button variant="link" asChild>
                <Link href="/ingredients">Edit</Link>
              </Button>
            </div>
          ) : (
            <div>
              <span className="pr-2 text-sm">No ingredients found.</span>
              <Link
                className="pb inline-flex text-sm underline"
                href="/ingredients"
              >
                Add ingredients
              </Link>
            </div>
          )}
        </div>
      </div>
      <MealPlanGenerator userId={userId} />
      <div className="flex w-full py-8"></div>
    </main>
  );
}
