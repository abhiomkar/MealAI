import "./globals.css";
import { Metadata } from "next";

import { Inter } from "next/font/google";

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
    <html lang="en">
      <body
        className={
          inter.className +
          "h-full bg-spinach-50 text-spinach-900 dark:bg-spinach-900 dark:text-spinach-50"
        }
      >
        {children}
      </body>
    </html>
  );
}
