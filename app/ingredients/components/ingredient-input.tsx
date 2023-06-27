"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

export function IngredientInput({ userId }: { userId: number }) {
  const router = useRouter();

  const handleIngredientInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (!(event.target instanceof HTMLInputElement)) return;

    if (event.key === "Enter") {
      submitForm(event.target.form!);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLInputElement)) return;
    if (!event.target) return;

    submitForm(event.target.form!);
  };

  const submitForm = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const ingredient = formData.get("ingredient");
    if (!ingredient) return;
    await fetch("/ingredients/api", {
      method: "POST",
      body: JSON.stringify({
        ingredient: ingredient,
        userId: userId,
      }),
    });
    router.refresh();
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-8 flex h-12 w-full items-center">
        <input
          type="text"
          className="box-border h-full w-full rounded-full border border-gray-500 bg-inherit px-4 pl-4 pr-24 outline-1 outline-gray-800"
          name="ingredient"
          placeholder="Add ingredient"
          onKeyDown={handleIngredientInputKeyDown}
        />
        <button className="absolute right-1 box-border h-10 rounded-full bg-white px-6 py-2 font-medium text-gray-500">
          Add
        </button>
      </div>
    </form>
  );
}
