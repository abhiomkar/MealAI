import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { mealCourseCount, breakfast, lunch, dinner } = await request.json();

  cookies().set("mealCourseCount", mealCourseCount);
  cookies().set("breakfast", breakfast);
  cookies().set("lunch", lunch);
  cookies().set("dinner", dinner);

  return NextResponse.json({ ok: true });
}
