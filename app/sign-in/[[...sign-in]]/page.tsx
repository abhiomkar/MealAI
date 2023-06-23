import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <SignIn redirectUrl={"/meal"} />
    </div>
  );
}
