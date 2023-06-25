import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth-options";
import { IngredientInput } from "@/app/ingredients/components/ingredient-input";

const prisma = new PrismaClient();

async function getUserMealPlans(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
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
  const ingredients = user?.ingredients;

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <h1 className="p-4 text-base font-medium tracking-tighter">
          <Link href="/">Meal AI</Link>
        </h1>
        <div className="p-4 text-sm font-medium">Hello, {name}!</div>
      </div>
      <div className="z-10 w-full max-w-2xl items-center text-sm">
        <IngredientInput ingredients={ingredients} email={email} />
        <ul className="flex w-full flex-wrap gap-2">
          {ingredients ? (
            ingredients.map((ingredient: string) => (
              <li className="inline-flex" key={ingredient}>
                <div className="inline-flex rounded-full border border-gray-500 px-4 py-2">
                  {ingredient}
                </div>
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
