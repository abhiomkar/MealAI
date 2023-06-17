import Link from "next/link";
import { redirect } from 'next/navigation'
import { currentUser, UserButton } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect('/meal');
  }

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <h1 className="p-4 text-base font-medium tracking-tighter">
          <Link href="/">Meal AI</Link>
        </h1>
        <div className="p-4 text-sm font-medium">
          {user ?
            <UserButton afterSignOutUrl="/"/> :
            <Link href="/sign-in">Sign in</Link>
          }
        </div>
      </div>
      <div className="z-10 w-full max-w-xl items-center text-sm flex flex-col">
        <h2 className="text-3xl font-extrabold tracking-tighter lg::text-8xl md:text-5xl pb-12 pt-12">
          Balanced meal for you.
        </h2>
        <button>
          <Link className="inline-flex items-center justify-center w-full px-6 py-3 font-medium text-center text-white duration-200 bg-gray-800 focus:outline-none custom-blur focus-visible:outline-black focus-visible:ring-black hover:bg-gray-100 hover:text-gray-800 lg:w-auto md:w-auto rounded-xl" href="/meal">
            Plan your meal &nbsp; &nbsp; →
          </Link>
        </button>
      </div>
    </main>
  );
}
