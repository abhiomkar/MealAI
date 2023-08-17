"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DietInput(
  { defaultValue }: { defaultValue?: string } = { defaultValue: "" }
) {
  const [value, setValue] = useState(defaultValue || "");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) return;

    submitForm();
  };

  const submitForm = async () => {
    await fetch("/diet/api", {
      method: "POST",
      body: JSON.stringify({
        diet: value,
      }),
    });
    router.push("/meal-course");
  };

  return (
    <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
      <h2 className="flex pb-2 pl-4 text-lg font-bold">Diet</h2>
      <div className="flex h-full flex-col justify-between pb-4">
        <Input
          type="text"
          name="diet"
          value={value}
          placeholder="Balanced, Keto, etc"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <div className="flex flex-col gap-2">
          <Button variant="outline" onClick={() => router.push("/meal-course")}>
            Skip
          </Button>
          <Button type="submit" disabled={!value}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
