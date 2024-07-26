"use client";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 fixed w-full z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <a href="/">iControl</a>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="text-white flex items-center md:hidden"
          onClick={toggleMenu}
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

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-blue-500 z-40`}
      >
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <a
              href="/dashboard"
              className="text-white hover:text-gray-200 hover:bg-green-900 p-2 transition duration-500 rounded"
            >
              Início
            </a>
          </li>

          <li>
            <a
              href="/transactions"
              className="text-white hover:text-gray-200 hover:bg-green-900 p-2 transition duration-500 rounded"
            >
              Transações
            </a>
          </li>

          <li>
            <a
              href="/transactions/create"
              className="text-white hover:text-gray-200 hover:bg-green-900 p-2 transition duration-500 rounded"
            >
              Criar Transação
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
