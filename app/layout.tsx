import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {},
      }}
    >
      <html lang="en" className="h-full">
        <body className={inter.className + " h-full"}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
