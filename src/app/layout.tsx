import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BoardProvider } from "@/context/BoardContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Visual task management with drag-and-drop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BoardProvider>
          <Header />
          {children}
        </BoardProvider>
      </body>
    </html>
  );
}
