"use client";

import React, { useState, useEffect } from "react";
import { GhostLoading } from "./components/ghost-loading";
import { useRouter } from "next/navigation";
import { MealDayPlan } from "@prisma/client";

export function MealPlanGenerator({ userId }: { userId: string }) {
  const [mealPlan, setMealPlan] = useState<Partial<MealDayPlan>[]>([]);
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
      const { ingredients } = await fetch(`/user/api/${userId}/ingredients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());

      const shuffledIngredients = ingredients.sort(() => 0.5 - Math.random());
      const response = await fetch("/meal/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: shuffledIngredients }),
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
                  <div className="flex pb-1 font-medium">{meal.ingredient}</div>{" "}
                  {meal.description}
                </div>
              </li>
            ))}

          {isLoading ? null : (
            <div className="flex justify-between pt-6">
              <button
                onClick={generateMealPlan}
                className="rounded-full border px-8 py-2 active:bg-gray-800 disabled:pointer-events-none disabled:opacity-80"
                disabled={isLoading}
              >
                Recreate
              </button>
              <button
                type="submit"
                className="rounded-full border bg-white px-8 py-2 text-black active:bg-gray-800 disabled:pointer-events-none disabled:opacity-80"
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          )}
        </ul>
      </div>
    </form>
  );
}
