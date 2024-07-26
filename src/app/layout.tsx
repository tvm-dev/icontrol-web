import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// Adicione o link ao protótipo no Navbar ou Footer se necessário.

import Header from "@/app/components/Shared/Header";
import Sidebar from "./components/Shared/Sidebar";
import Footer from "./components/Shared/Footer";

const mainFontFamily = Roboto({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iControl: pq vc controla SUA GRANA!",
  description: "tvm alterar description here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mainFontFamily.className}>
      <body>
        <Header />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
