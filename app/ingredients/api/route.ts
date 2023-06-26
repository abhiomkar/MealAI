import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { ingredient, email } = await request.json();
  const { id } = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  await prisma.ingredient.create({
    data: {
      name: ingredient,
      userId: id,
    },
  });

  return NextResponse.json({ ok: true });
}
