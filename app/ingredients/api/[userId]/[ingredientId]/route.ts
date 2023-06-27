import { NextResponse } from "next/server";
import prisma from "@/app/prisma/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; ingredientId: string } }
) {
  await prisma.user.update({
    where: { id: parseInt(params.userId, 10) },
    data: {
      ingredients: {
        disconnect: { id: parseInt(params.ingredientId, 10) },
      },
    },
  });

  return NextResponse.json({ ok: true });
}
