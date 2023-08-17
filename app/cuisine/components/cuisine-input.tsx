"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CuisineInput(
  { value }: { value?: string } = { value: "" }
) {
  const [cuisine, setCuisine] = useState(value || "");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) return;

    submitForm();
  };

  const submitForm = async () => {
    await fetch("/cuisine/api", {
      method: "POST",
      body: JSON.stringify({
        cuisine: cuisine,
      }),
    });

    router.push("/diet");
  };

  return (
    <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
      <h2 className="flex pb-2 pl-4 text-lg font-bold">Cuisine</h2>
      <div className="flex h-full flex-col justify-between pb-4">
        <Input
          type="text"
          name="cuisine"
          value={cuisine}
          placeholder="Italian, South Indian, etc"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCuisine(e.target.value)
          }
        />
        <Button type="submit" disabled={!cuisine}>
          Next
        </Button>
      </div>
    </form>
  );
}
