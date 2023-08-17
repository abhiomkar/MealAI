import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { cuisine } = await request.json();

  cookies().set("cuisine", cuisine);
  return NextResponse.json({ ok: true });
}
