"use client";

import React, { useState } from "react";

interface MealPlan {
  weekday: string;
  ingredient: string;
  description: string;
}

export function MealPlanGenerator({ userId }: { userId: number }) {
  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateMealPlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const { ingredients } = await fetch(`/user/api/${userId}/ingredients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());

      const response = await fetch("/meal/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      }).then((response) => response.json());
      setMealPlan(response.mealPlan);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full max-w-xl" onSubmit={generateMealPlan}>
      <button
        type="submit"
        className="rounded-full border px-8 py-2 active:bg-gray-800 disabled:pointer-events-none disabled:opacity-80"
        disabled={isLoading}
      >
        {isLoading ? "Generating meal plan..." : "Generate meal plan"}
      </button>
      <div className="z-10 w-full max-w-xl items-center text-sm lg:flex">
        <ul className="w-full px-4">
          {mealPlan.length ? (
            mealPlan.map((meal) => (
              <li className="flex gap-4 pb-4" key={meal.weekday}>
                <div className="mt-4 inline-flex h-8 w-8 flex-shrink-0 justify-center rounded-full bg-black pt-1 align-middle text-base font-medium capitalize text-white dark:bg-gray-50 dark:text-black">
                  {meal.weekday[0]}
                </div>
                <div className="">
                  <div className="flex pb-1 font-medium">{meal.ingredient}</div>{" "}
                  {meal.description}
                </div>
              </li>
            ))
          ) : (
            <div>No meal plans found.</div>
          )}
        </ul>
      </div>

      {mealPlan && (
        <button
          type="submit"
          className="mb-4 mt-4 rounded-full border px-8 py-2"
        >
          Save this meal plan
        </button>
      )}
    </form>
  );
}
