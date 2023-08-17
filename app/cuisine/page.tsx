import { Header } from "@/components/header/header";
import CuisineInput from "@/app/cuisine/components/cuisine-input";
import { cookies } from "next/headers";

export default async function Cuisine() {
  const cuisineCookie = cookies().get("cuisine");

  return (
    <>
      <Header />
      <CuisineInput value={cuisineCookie?.value} />
    </>
  );
}
