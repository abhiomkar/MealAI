import { Ingredient } from "@prisma/client";
import prisma from "@/app/prisma/prisma";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/auth-options";
import { IngredientInput } from "@/app/ingredients/components/ingredient-input";
import {
  RemoveIngredientButton,
  RemoveIngredientByNameButton,
} from "@/app/ingredients/components/remove-ingredient-button";
import { Header } from "@/components/header/header";
import { cookies } from "next/headers";
import Link from "next/link";

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

  let ingredients: Ingredient[] = [];

  let userId = "";
  let ingredientList: string[] = [];
  if (email) {
    const user = await getUserMealPlans(email);
    userId = user?.id || "";
    ingredients = user?.ingredients || [];
  } else {
    ingredientList = JSON.parse(cookies().get("ingredients")?.value || "[]");
  }

  return (
    <>
      <Header name={name} />
      <div className="w-full max-w-2xl items-center text-sm">
        <h2 className="flex pb-2 pl-4 text-lg font-bold">Ingredients</h2>
        <div>
          <IngredientInput userId={userId} />
        </div>
        <ul className="grid w-full grid-cols-1 divide-y divide-gray-500">
          {ingredients.map((ingredient: Ingredient) => (
            <li className="flex justify-between px-4 py-4" key={ingredient.id}>
              <div className="flex border-gray-500">{ingredient.name}</div>
              <RemoveIngredientButton
                userId={userId}
                ingredientId={ingredient.id}
              />
            </li>
          ))}
          {ingredientList.map((ingredient: string) => (
            <li className="flex justify-between px-4 py-4" key={ingredient}>
              <div className="flex border-gray-500">{ingredient}</div>
              <RemoveIngredientByNameButton ingredientName={ingredient} />
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <Button variant="outline" asChild>
            <Link href="/meal/create">Skip</Link>
          </Button>
          <Button
            asChild
            disabled={ingredientList.length === 0 && ingredients.length === 0}
          >
            <Link href="/meal/create">Next</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
