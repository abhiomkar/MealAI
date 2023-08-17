import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(request: Request) {
  const {
    ingredients,
    cuisine,
    diet,
    mealCourseCount,
    breakfast,
    lunch,
    dinner,
  } = await request.json();
  const ingredientLines = ingredients.join("\n");

  const mealCoursePrompt = `
    ${breakfast ? "breakfast," : ""}
    ${lunch ? "lunch" : ""}
    ${dinner ? ",dinner" : ""}
  `;
  const cuisinePrompt = cuisine
    ? `The meal plan should follow "${cuisine}" cuisine.`
    : "";
  const dietPrompt = diet ? `The meal should follow "${diet}" diet.` : "";
  const mealCourseCountPrompt = mealCourseCount
    ? `Suggest ${mealCourseCount} meals per day.`
    : "";

  const prompt = `
Your task is to plan meals (including ${mealCoursePrompt}) for a week (Starting from Monday to Sunday) such that the nutritions (carbohydrates, proteins, fats, vitamins and minerals) are balanced through out the week.
${cuisinePrompt}
${dietPrompt}
${mealCourseCountPrompt}

When showing ingredient also include nutrition facts, benefits (under 36 words).

Ingredients:
${ingredientLines}
`;

  console.log(prompt);
  const weeekDays: string[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const properties: { [key: string]: any } = {};

  for (const weekday of weeekDays) {
    properties[`${weekday}_meals`] = {
      type: "string",
      description: `${weekday}'s meal plan`,
    };
    properties[`${weekday}_ingredient_list`] = {
      type: "string",
      description: `${weekday}'s ingredient list`,
    };
    properties[`${weekday}_ingredient_nutrition_facts`] = {
      type: "string",
      description: `${weekday}'s ingredient nutrition facts`,
    };
  }

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
          content: prompt,
        },
      ],
      functions: [
        {
          name: "get_weekly_meal_plan",
          description:
            "Get weekly meal plan for a given list of food preferences. \
            The meal plan should be such that \
            the nutritions (carbohydrates, proteins, fats, vitamins and minerals) \
            are balanced through out the week.",
          parameters: {
            type: "object",
            properties: properties,
          },
        },
      ],
      temperature: 0,
      stream: false,
    })
    .then((response) => response.json());

  const mealPlan = [];
  const args = JSON.parse(response.choices[0].message.function_call.arguments);
  for (const weekday of weeekDays) {
    mealPlan.push({
      weekday: weekday,
      meals: args[`${weekday}_meals`],
      ingredientList: args[`${weekday}_ingredient_list`],
      ingredientNutritionFacts: args[`${weekday}_ingredient_nutrition_facts`],
    });
  }
  return NextResponse.json({
    mealPlan: mealPlan,
  });
}
