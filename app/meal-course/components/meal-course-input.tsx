"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export default function MealCourseInput(props: {
  mealCourseCount?: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}) {
  const [mealCourseCount, setMealCourseCount] = useState(
    props.mealCourseCount || 3
  );
  const [breakfast, setBreakfast] = useState(props.breakfast || false);
  const [lunch, setLunch] = useState(props.lunch || false);
  const [dinner, setDinner] = useState(props.dinner || false);
  const toggleGroupDefaultValue = [];
  if (breakfast) toggleGroupDefaultValue.push("breakfast");
  if (lunch) toggleGroupDefaultValue.push("lunch");
  if (dinner) toggleGroupDefaultValue.push("dinner");

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) return;

    submitForm();
  };

  const submitForm = async () => {
    await fetch("/meal-course/api", {
      method: "POST",
      body: JSON.stringify({
        mealCourseCount: mealCourseCount,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
      }),
    });
    router.push("/ingredients");
  };

  return (
    <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
      <h2 className="flex pb-2 pl-4 text-lg font-bold">Meal course</h2>
      <div className="flex h-full flex-col justify-between pb-4">
        <div>
          <h3 className="flex pb-2 pl-4 text-sm font-medium">
            How many times you would like to cook per day?
          </h3>
          <ToggleGroup.Root
            className="inline-flex overflow-hidden rounded-full border border-spinach-900/90 text-sm font-medium tracking-wider dark:border-spinach-50/50"
            type="single"
            aria-label="Meal course count"
            defaultValue={mealCourseCount.toString()}
            onValueChange={(value) => {
              setMealCourseCount(Number(value));
            }}
          >
            <ToggleGroup.Item
              className="flex h-10 w-32 items-center justify-center border-r border-spinach-900/90 bg-transparent pr-2 leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none data-[state=on]:bg-spinach-800/80 data-[state=off]:text-spinach-600 data-[state=on]:text-spinach-50 dark:border-spinach-50/50 dark:data-[state=off]:text-spinach-50"
              value="1"
            >
              <div className="pr-2">
                <div
                  className={mealCourseCount === 1 ? "visible" : "invisible"}
                >
                  <Check className="inline-flex h-4 w-4" />
                </div>
              </div>
              1
            </ToggleGroup.Item>
            <ToggleGroup.Item
              className="flex h-10 w-32 items-center justify-center border-r border-spinach-900/90 bg-transparent pr-2 leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none data-[state=on]:bg-spinach-800/80 data-[state=off]:text-spinach-600 data-[state=on]:text-spinach-50 dark:border-spinach-50/50 dark:data-[state=off]:text-spinach-50"
              value="2"
            >
              <div className="pr-2">
                <div
                  className={mealCourseCount === 2 ? "visible" : "invisible"}
                >
                  <Check className="inline-flex h-4 w-4" />
                </div>
              </div>
              2
            </ToggleGroup.Item>
            <ToggleGroup.Item
              className="flex h-10 w-32 items-center justify-center border-spinach-900/90 bg-transparent pr-2 leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none data-[state=on]:bg-spinach-800/80 data-[state=off]:text-spinach-600 data-[state=on]:text-spinach-50 dark:border-spinach-50/50 dark:data-[state=off]:text-spinach-50"
              value="3"
            >
              <div className="pr-2">
                <div
                  className={mealCourseCount === 3 ? "visible" : "invisible"}
                >
                  <Check className="inline-flex h-4 w-4" />
                </div>
              </div>
              3
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <h3 className="flex pb-2 pl-4 pt-6 text-sm font-medium">
            Select meal courses
          </h3>
          <ToggleGroup.Root
            className="inline-flex overflow-hidden rounded-full border border-spinach-900/90 text-sm font-medium tracking-wider dark:border-spinach-50/50"
            type="multiple"
            aria-label="Meal courses"
            defaultValue={toggleGroupDefaultValue}
            onValueChange={(value) => {
              setBreakfast(value.includes("breakfast"));
              setLunch(value.includes("lunch"));
              setDinner(value.includes("dinner"));
            }}
          >
            <ToggleGroup.Item
              className="flex h-10 w-32 items-center justify-center border-r border-spinach-900/90 bg-transparent pr-2 leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none data-[state=on]:bg-spinach-800/80 data-[state=off]:text-spinach-600 data-[state=on]:text-spinach-50 dark:border-spinach-50/50 dark:data-[state=off]:text-spinach-50"
              value="breakfast"
            >
              <div className="pr-2">
                <div className={breakfast ? "visible" : "invisible"}>
                  <Check className="inline-flex h-4 w-4" />
                </div>
              </div>
              Breakfast
            </ToggleGroup.Item>
            <ToggleGroup.Item
              className="flex h-10 w-32 items-center justify-center border-r border-spinach-900/90 bg-transparent pr-2 leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none data-[state=on]:bg-spinach-800/80 data-[state=off]:text-spinach-600 data-[state=on]:text-spinach-50 dark:border-spinach-50/50 dark:data-[state=off]:text-spinach-50"
              value="lunch"
            >
              <div className="pr-2">
                <div className={lunch ? "visible" : "invisible"}>
                  <Check className="inline-flex h-4 w-4" />
                </div>
              </div>
              Lunch
            </ToggleGroup.Item>
            <ToggleGroup.Item
              className="flex h-10 w-32 items-center justify-center border-spinach-900/90 bg-transparent pr-2 leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none data-[state=on]:bg-spinach-800/80 data-[state=off]:text-spinach-600 data-[state=on]:text-spinach-50 dark:border-spinach-50/50 dark:data-[state=off]:text-spinach-50"
              value="dinner"
            >
              <div className="pr-2">
                <div className={dinner ? "visible" : "invisible"}>
                  <Check className="inline-flex h-4 w-4" />
                </div>
              </div>
              Dinner
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="outline" onClick={() => router.push("/meal-course")}>
            Skip
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
}
