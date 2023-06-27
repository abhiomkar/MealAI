import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  let { userId } = await req.json();
  const { ingredients } = await prisma.user.findUniqueOrThrow({
    where: {
      id: parseInt(userId, 10),
    },
    include: {
      ingredients: true,
    },
  });
  const ingredientList = ingredients
    .map((ingredient) => ingredient.name)
    .join("\n");

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful dietitian & nutritionist doctor.",
      },
      {
        role: "user",
        content: `
          Your task is to assign one ingredient per day in a week (Starting from Monday to Sunday) such that the nutritions (carbohydrates, proteins, fats, vitamins and minerals) are balanced through out the week.
          When showing ingredient also include nutrition facts, benefits (under 36 words).
          Must assign non-vegetarian ingredients on following week days: Wednesday, Friday, Sunday.
          Must assign vegetarian ingredients on following week days: Monday, Tuesday, Thursday, Saturday.

          Ingredients:
          ${ingredientList}
          `,
      },
    ],
    temperature: 0,
    stream: false,
  });

  const res = await response.json();

  return NextResponse.json({ message: res.choices[0].message.content });
}
