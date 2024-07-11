import type { Metadata } from "next";
import { Roboto, Ubuntu } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/Shared/Header";
import { title } from "process";

//const mainFontFamily = Ubuntu({ subsets: ["latin"] });
const mainFontFamily = Roboto({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

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
    <html lang="en" className={mainFontFamily.className}>
      <body className="">
        <Header />

        {children}
      </body>
    </html>
  );
}
