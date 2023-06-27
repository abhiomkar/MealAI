import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { ingredient, userId } = await request.json();

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

  return NextResponse.json({ ok: true });
}
