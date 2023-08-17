"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function RemoveIngredientButton({
  ingredientId,
  userId,
}: {
  ingredientId: string;
  userId?: string;
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

export function RemoveIngredientByNameButton({
  ingredientName,
}: {
  ingredientName: string;
}) {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(`/ingredients/api/remove/${ingredientName}`, {
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
