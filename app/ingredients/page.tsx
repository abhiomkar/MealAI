import { PrismaClient, Ingredient } from "@prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth-options";
import { IngredientInput } from "@/app/ingredients/components/ingredient-input";
import { RemoveIngredientButton } from "@/app/ingredients/components/remove-ingredient-button";

const prisma = new PrismaClient();

async function getUserMealPlans(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      ingredients: true,
    },
  });
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { name, email } = session?.user || {};
  if (!email) {
    return <div>User not logged in.</div>;
  }

  const user = await getUserMealPlans(email);
  const userId = user?.id || 0;
  const ingredients = user?.ingredients || [];

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <h1 className="p-4 text-base font-medium tracking-tighter">
          <Link href="/">Meal AI</Link>
        </h1>
        <div className="p-4 text-sm font-medium">Hello, {name}!</div>
      </div>
      <div className="z-10 w-full max-w-2xl items-center text-sm">
        <div>
          <IngredientInput userId={userId} />
        </div>
        <ul className="grid w-full grid-cols-1 divide-y divide-gray-500">
          {ingredients ? (
            ingredients.map((ingredient: Ingredient) => (
              <li
                className="flex justify-between px-4 py-4"
                key={ingredient.id}
              >
                <div className="flex border-gray-500">{ingredient.name}</div>
                <RemoveIngredientButton
                  userId={userId}
                  ingredientId={ingredient.id}
                />
              </li>
            ))
          ) : (
            <div>No ingredients set.</div>
          )}
        </ul>
      </div>
    </main>
  );
}
