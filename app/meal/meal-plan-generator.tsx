"use client";

import React, { useState, useEffect } from "react";
import { GhostLoading } from "./components/ghost-loading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface MealDayPlan {
  weekday: string;
  meals: string;
  ingredientList: string;
  ingredientNutritionFacts: string;
}

export function MealPlanGenerator({ userId }: { userId?: string }) {
  const [mealPlan, setMealPlan] = useState<MealDayPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const saveMealPlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch("/meal/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mealPlan, userId }),
    });
    router.push("/meal");
  };

  const generateMealPlan = async () => {
    setIsLoading(true);
    try {
      const {
        ingredients,
        cuisine,
        diet,
        mealCourseCount,
        breakfast,
        lunch,
        dinner,
      } = await fetch(
        userId
          ? `/user/api/preference/${userId}`
          : "/user/api/preference/current",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());

      const shuffledIngredients = ingredients.sort(() => 0.5 - Math.random());
      const response = await fetch("/meal/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: shuffledIngredients,
          cuisine,
          diet,
          mealCourseCount,
          breakfast,
          lunch,
          dinner,
        }),
      }).then((response) => response.json());
      setMealPlan(response.mealPlan);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateMealPlan();
  }, []);

  return (
    <form className="w-full max-w-xl" onSubmit={saveMealPlan}>
      <div className="z-10 w-full max-w-xl items-center text-sm lg:flex">
        <ul className="w-full rounded-2xl border border-gray-500 px-4 py-6">
          {isLoading && <GhostLoading />}

          {!!mealPlan.length &&
            !isLoading &&
            mealPlan.map((meal) => (
              <li className="flex gap-4 pb-4" key={meal.weekday}>
                <div className="mt-4 inline-flex h-8 w-8 flex-shrink-0 justify-center rounded-full bg-black pt-1 align-middle text-base font-medium capitalize text-white dark:bg-gray-50 dark:text-black">
                  {meal.weekday![0]}
                </div>
                <div className="">
                  <div className="flex pb-1 font-medium">{meal.meals}</div>
                  <div className="flex pb-1 font-medium">
                    {meal.ingredientList}
                  </div>
                  <div className="flex pb-1 font-medium">
                    {meal.ingredientNutritionFacts}
                  </div>
                </div>
              </li>
            ))}

          {isLoading ? null : (
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={generateMealPlan}
                disabled={isLoading}
              >
                Recreate
              </Button>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </div>
          )}
        </ul>
      </div>
    </form>
  );
}
