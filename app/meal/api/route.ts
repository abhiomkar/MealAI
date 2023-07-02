import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(request: Request) {
  const { ingredients } = await request.json();
  const ingredientLines = ingredients.join("\n");

  const response = await openai
    .createChatCompletion({
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
          ${ingredientLines}
          `,
        },
      ],
      temperature: 0,
      stream: false,
    })
    .then((response) => response.json());

  return NextResponse.json({
    message: response.choices[0].message.content,
  });
}
