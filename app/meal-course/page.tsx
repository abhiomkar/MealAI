import { Header } from "@/components/header/header";
import MealCourseInput from "@/app/meal-course/components/meal-course-input";
import { cookies } from "next/headers";

export default async function MealCourse() {
  const mealCourseCount = cookies().get("mealCourseCount")?.value;
  const breakfast = cookies().get("breakfast")?.value === "true";
  const lunch = cookies().get("lunch")?.value === "true";
  const dinner = cookies().get("dinner")?.value === "true";

  return (
    <>
      <Header />
      <MealCourseInput
        mealCourseCount={Number(mealCourseCount)}
        breakfast={breakfast}
        lunch={lunch}
        dinner={dinner}
      />
    </>
  );
}
