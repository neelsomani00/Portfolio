import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neel Somani — Web & AI Engineer",
  description: "Mixing clean front-end engineering with AI + automation[cite: 4].",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030014] antialiased`}>
        {children}
      </body>
    </html>
  );
}
