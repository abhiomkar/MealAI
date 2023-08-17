import { NextResponse } from "next/server";
import prisma from "@/app/prisma/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { ingredient, userId } = await request.json();

  if (userId) {
    await prisma.ingredient.create({
      data: {
        name: ingredient,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } else {
    const ingredientsSerialized = cookies().get("ingredients")?.value || "[]";
    const ingredients = JSON.parse(ingredientsSerialized);
    if (!ingredients.includes(ingredient)) {
      ingredients.push(ingredient);
    }
    cookies().set("ingredients", JSON.stringify(ingredients));
  }

  return NextResponse.json({ ok: true });
}
