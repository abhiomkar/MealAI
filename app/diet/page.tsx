import { Header } from "@/components/header/header";
import DietInput from "@/app/diet/components/diet-input";
import { cookies } from "next/headers";

export default async function Cuisine() {
  const cookie = cookies().get("diet");

  return (
    <>
      <Header />
      <DietInput defaultValue={cookie?.value} />
    </>
  );
}
