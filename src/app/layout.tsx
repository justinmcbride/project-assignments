import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { GitHubLink } from "@/components/GitHubLink";
import { AppProvider } from "@/AppContext";
import { Header } from "@/components/Header";
import { ThemeRegistry } from "@/components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <AppProvider>
        <ThemeRegistry>
          <body className={inter.className}>
            <Header />
            {children}
            <GitHubLink />
          </body>
        </ThemeRegistry>
      </AppProvider>
    </html>
  );
}
