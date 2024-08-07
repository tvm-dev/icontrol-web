// src/app/layout.tsx
import React from "react";
import "./globals.css"; // Inclua seu CSS global aqui
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "iControl: onde vc controla sua Grana! ",
    template: "%s | iControl: onde vc controla sua Grana!",
  },
  description: "Controlando sua grana AGORA MESMO!",
  icons: {
    icon: "/favicon.ico",
  },
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
