import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/app/Shared/Header";
import { title } from "process";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iControl: pq vc controla SUA GRANA!",
  description: "tvm alterar description here",
};

// export async function generateMetadata({ params }) {
//   params: {
//     title: title;
//   }
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-200">
        <Header />

        {children}
      </body>
    </html>
  );
}
