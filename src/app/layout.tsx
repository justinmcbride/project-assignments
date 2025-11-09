import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GitHubLink } from "@/components/GitHubLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cairn Project Roles",
  description: "Easily assign students to project roles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <GitHubLink />
      </body>
    </html>
  );
}
