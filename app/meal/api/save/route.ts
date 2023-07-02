import { NextResponse } from "next/server";
import prisma from "@/app/prisma/prisma";

export async function POST(request: Request) {
  const { mealPlan, userId } = await request.json();

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      mealPlans: {
        create: {
          weekPlan: {
            create: mealPlan,
          },
        },
      },
    },
  });

  return NextResponse.json({ ok: true });
}
