import Link from "next/link";

export function Header({ name }: { name?: string | null } = {}) {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="p-4 text-base font-medium tracking-tighter">
        <Link href="/">Meal AI</Link>
      </h1>
      {name && <div className="p-4 text-sm font-medium">Hello, {name}!</div>}
    </div>
  );
}
