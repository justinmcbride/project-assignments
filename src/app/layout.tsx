import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GitHubLink } from "@/components/GitHubLink";
import { AppProvider } from "@/AppContext";
import { Header } from "@/components/Header";

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
      <AppProvider>
        <body className={inter.className}>
          <Header />
          {children}
          <GitHubLink />
        </body>
      </AppProvider>
    </html>
  );
}
