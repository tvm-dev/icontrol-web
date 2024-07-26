//---
"use client";
//---

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { useState } from "react";

import Header from "@/app/components/Shared/Header";
import Sidebar from "./components/Shared/Sidebar";
import Footer from "./components/Shared/Footer";
import FloatingButton from "./components/Shared/FloatingButton";

const mainFontFamily = Roboto({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "iControl: pq vc controla SUA GRANA!",
//   description: "tvm alterar description here",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en" className={mainFontFamily.className}>
      <body>
        <Header onToggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main>{children}</main>
        <FloatingButton />

        {/* <Footer /> */}
      </body>
    </html>
  );
}
