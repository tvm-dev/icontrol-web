import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/Shared/Header";
import Footer from "@/app/components/Shared/Footer";
import Sidebar from "./components/Shared/Sidebar";

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
      <body className="flex min-h-screen">
        <Sidebar /> {/* Inclua o componente Sidebar */}
        <div className="flex flex-col flex-grow ml-64">
          {" "}
          {/* Ajuste a margem para acomodar a Sidebar */}
          <Header />
          <main className="flex-grow">{children}</main>{" "}
          {/* Envolva o conteúdo principal */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
