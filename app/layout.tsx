import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meal AI",
  description: "Meal AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full bg-white text-black dark:bg-black dark:text-white"
    >
      <body className={inter.className + " h-full"}>{children}</body>
    </html>
  );
}
