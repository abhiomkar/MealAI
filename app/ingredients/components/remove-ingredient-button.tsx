"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function RemoveIngredientButton({
  ingredientId,
  userId,
}: {
  ingredientId: number;
  userId: number;
}) {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(`/ingredients/api/${userId}/${ingredientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button>Remove</button>
    </form>
  );
}
