import { NextResponse } from "next/server";
import prisma from "@/app/prisma/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; ingredientId: string } }
) {
  await prisma.user.update({
    where: { id: params.userId },
    data: {
      ingredients: {
        disconnect: { id: params.ingredientId },
      },
    },
  });

  return NextResponse.json({ ok: true });
}
