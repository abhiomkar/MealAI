import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  { params }: { params: { ingredientName: string } }
) {
  const ingredients = JSON.parse(cookies().get("ingredients")?.value || "[]");
  cookies().set(
    "ingredients",
    JSON.stringify(
      ingredients.filter(
        (ingredient: string) => ingredient !== params.ingredientName
      )
    )
  );

  return NextResponse.json({ ok: true });
}
