import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser, UserButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect("/meal");
  }

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <h1 className="p-4 text-base font-medium tracking-tighter">
          <Link href="/">Meal AI</Link>
        </h1>
        <div className="p-4 text-sm font-medium">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in">Sign in</Link>
          )}
        </div>
      </div>
      <div className="z-10 flex w-full max-w-xl flex-col items-center text-sm">
        <h2 className="lg::text-8xl pb-12 pt-12 text-3xl font-extrabold tracking-tighter md:text-5xl">
          Balanced meal for you.
        </h2>
        <button>
          <Link
            className="custom-blur inline-flex w-full items-center justify-center rounded-xl bg-gray-800 px-6 py-3 text-center font-medium text-white duration-200 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:outline-black focus-visible:ring-black md:w-auto lg:w-auto"
            href="/meal"
          >
            Plan your meal &nbsp; &nbsp; →
          </Link>
        </button>
      </div>
    </main>
  );
}
