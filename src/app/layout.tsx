// src/app/layout.tsx
import React from "react";
import "./globals.css"; // Inclua seu CSS global aqui

export const metadata = {
  title: "Seu título",
  description: "Descrição do seu site",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
