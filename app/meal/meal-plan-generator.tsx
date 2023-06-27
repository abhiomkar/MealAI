"use client";

import React, { useState } from "react";

export function MealPlanGenerator({ userId }: { userId: number }) {
  const [mealPlan, setMealPlan] = useState<string>("");
  const generateMealPlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/meal/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const res = await response.json();
    setMealPlan(res.message);
  };

  return (
    <form className="w-full max-w-xl" onSubmit={generateMealPlan}>
      <button type="submit" className="rounded-full border px-8 py-2">
        Generate meal plan
      </button>
      <div className="mt-4 grid grid-cols-1 gap-2">
        {mealPlan.split("\n").map((line) => (
          <div>{line}</div>
        ))}
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
