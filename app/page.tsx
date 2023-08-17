import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header/header";

export default async function Home() {
  return (
    <main className="flex flex-col items-center">
      <Header />

      <div className="z-10 mb-12 flex w-full max-w-xl flex-col items-center text-sm">
        <div className="flex">
          <Image src="/meal.svg" width={400} height={400} alt="Food plate" />
        </div>
        <h2 className="lg::text-8xl pb-8 pt-2 text-3xl font-extrabold tracking-tighter md:text-5xl">
          Balanced meal for you.
        </h2>
        <Button asChild>
          <Link href="/meal">Plan your meal &nbsp; &nbsp; →</Link>
        </Button>
      </div>
    </main>
  );
}
