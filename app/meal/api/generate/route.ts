import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import { MealDayPlan } from "@prisma/client";

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
      functions: [
        {
          name: "get_weekly_meal_plan",
          description:
            "Get weekly meal plan for a given list of ingredients. \
            The meal plan should be such that \
            the nutritions (carbohydrates, proteins, fats, vitamins and minerals) \
            are balanced through out the week.",
          parameters: {
            type: "object",
            properties: {
              monday_ingredient_name: {
                type: "string",
                description: "Monday's ingredient name",
              },
              monday_ingredient_nutrition_facts: {
                type: "string",
                description: "Monday's ingredient nutrition facts",
              },
              tuesday_ingredient_name: {
                type: "string",
                description: "Tuesday's ingredient name",
              },
              tuesday_ingredient_nutrition_facts: {
                type: "string",
                description: "Tuesday's ingredient nutrition facts",
              },
              wednesday_ingredient_name: {
                type: "string",
                description: "Wednesday's ingredient name",
              },
              wednesday_ingredient_nutrition_facts: {
                type: "string",
                description: "Wednesday's ingredient nutrition facts",
              },
              thursday_ingredient_name: {
                type: "string",
                description: "Thursday's ingredient name",
              },
              thursday_ingredient_nutrition_facts: {
                type: "string",
                description: "Thursday's ingredient nutrition facts",
              },
              friday_ingredient_name: {
                type: "string",
                description: "Friday's ingredient name",
              },
              friday_ingredient_nutrition_facts: {
                type: "string",
                description: "Friday's ingredient nutrition facts",
              },
              saturday_ingredient_name: {
                type: "string",
                description: "Saturday's ingredient name",
              },
              saturday_ingredient_nutrition_facts: {
                type: "string",
                description: "Saturday's ingredient nutrition facts",
              },
              sunday_ingredient_name: {
                type: "string",
                description: "Sunday's ingredient name",
              },
              sunday_ingredient_nutrition_facts: {
                type: "string",
                description: "Sunday's ingredient nutrition facts",
              },
            },
          },
        },
      ],
      temperature: 0,
      stream: false,
    })
    .then((response) => response.json());

  const mealPlan: Partial<MealDayPlan>[] = [];
  const weeekDays: string[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const args = JSON.parse(response.choices[0].message.function_call.arguments);
  for (const weekday of weeekDays) {
    mealPlan.push({
      weekday: weekday,
      ingredient: args[`${weekday}_ingredient_name`],
      description: args[`${weekday}_ingredient_nutrition_facts`],
    });
  }
  return NextResponse.json({
    mealPlan: mealPlan,
  });
}
