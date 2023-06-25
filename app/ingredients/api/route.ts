import { PrismaClient} from "@prisma/client";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {ingredients, email} = await request.json();
  const updateUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      ingredients: ingredients,
    },
  });

  return NextResponse.json({ok: true});
}