import { NextResponse } from "next/server";
import prisma from "@/app/prisma/prisma";
import { Ingredient } from "@prisma/client";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: { userId?: string } }
) {
  let ingredientList: string[] = [];
  let cuisine;
  let diet;
  let mealCourseCount;
  let breakfast;
  let lunch;
  let dinner;

  if (params.userId === "current") {
    ingredientList = JSON.parse(cookies().get("ingredients")?.value || "[]");
    cuisine = cookies().get("cuisine")?.value;
    diet = cookies().get("diet")?.value;
    mealCourseCount = cookies().get("mealCourseCount")?.value;
    breakfast = cookies().get("breakfast")?.value === "true";
    lunch = cookies().get("lunch")?.value === "true";
    dinner = cookies().get("dinner")?.value === "true";
  } else {
    const { ingredients } = await prisma.user.findUniqueOrThrow({
      where: {
        id: params.userId,
      },
      include: {
        ingredients: true,
      },
    });
    ingredientList = ingredients.map(
      (ingredient: Ingredient) => ingredient.name
    );
  }

  return NextResponse.json({
    ingredients: ingredientList,
    cuisine,
    diet,
    mealCourseCount,
    breakfast,
    lunch,
    dinner,
  });
}
