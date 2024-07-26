"use client";
import { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <nav className="bg-blue-500 p-4 fixed w-full z-40 mb-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold flex items-center">
          <Image
            src="/images/logo.png" // Caminho relativo ao diretório `public`
            alt="iControl Logo"
            width={40}
            height={40}
            className="mr-2" // Margem direita para espaçar o texto
          />
          <a href="/dashboard">iControl</a>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="text-white flex items-center md:hidden"
          onClick={onToggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
