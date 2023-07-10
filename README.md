This is a project codenamed **Meal AI** that lets users generate weekly balanced meal plan for given ingredients.

## Tech stack

- [NextAuth.js](https://next-auth.js.org) for authentication.
- [Next.js](https://nextjs.org) as web development meta framework.
- [TailwindCSS](https://tailwindcss.com) as CSS framework.
- [Prisma](https://www.prisma.io) as TypeScript ORM.
- [Postgres](https://www.postgresql.org) as database.

## Prerequisites

- [Vercel](https://vercel.com) account.
- Google Cloud API account as [documented](https://next-auth.js.org/providers/google) by NextAuth.js.
- Create a Postgres database on [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart).
- Signup at [OpenAI](https://openai.com) and create an API key.

## Getting Started

Clone this repository

```bash
git clone git@github.com:abhiomkar/MealAI.git
cd MealAI
```

Install dependencies

```bash
pnpm install
```

Local development server

```bash
pnpm run dev
```

## Deploy

```bash
git push -u origin main
```
