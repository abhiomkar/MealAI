import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { diet } = await request.json();

  cookies().set("diet", diet);
  return NextResponse.json({ ok: true });
}
