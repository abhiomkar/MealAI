import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meal AI",
  description: "Meal AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={
          inter.className +
          " " +
          "flex h-full justify-center bg-spinach-50 text-spinach-900 antialiased dark:bg-spinach-900 dark:text-spinach-50"
        }
      >
        <main className="flex h-full w-full max-w-lg flex-col">{children}</main>
      </body>
    </html>
  );
}
