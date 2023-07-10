import { NextResponse } from "next/server";
import prisma from "@/app/prisma/prisma";
import { Ingredient } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { ingredients } = await prisma.user.findUniqueOrThrow({
    where: {
      id: params.userId,
    },
    include: {
      ingredients: true,
    },
  });

  return NextResponse.json({
    ingredients: ingredients.map((ingredient: Ingredient) => ingredient.name),
  });
}
