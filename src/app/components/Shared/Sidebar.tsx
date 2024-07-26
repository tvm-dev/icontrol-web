"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  UserIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform ${
        isOpen ? "translate-x-0 z-50" : "-translate-x-full z-40"
      } md:translate-x-0 md:w-64 w-16 flex flex-col`}
    >
      <button
        className="p-2 text-white bg-blue-700 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Open"}
      </button>
      <div
        className={`flex flex-col flex-grow p-4 ${
          isOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="flex items-center mb-5">
          <Image
            src="/images/logo.png" // Caminho relativo ao diretório `public`
            alt="iControl Logo"
            width={40} // Largura do logo
            height={40} // Altura do logo
            className="mr-2" // Margem direita para espaçar o texto
          />
          <h1 className="text-2xl font-bold">iControl</h1>
        </div>
        <nav>
          <ul>
            <li className="mt-2">
              <a
                href="/dashboard"
                className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
              >
                <HomeIcon className="h-6 w-6 text-gray-300" />
                <span>Início</span>
              </a>
            </li>
            <li className="mt-2">
              <a
                href="/transactions"
                className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
              >
                <CurrencyDollarIcon className="h-6 w-6 text-gray-300" />
                <span>Transações</span>
              </a>
            </li>
            <li className="mt-2">
              <a
                href="/reports"
                className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
              >
                <BanknotesIcon className="h-6 w-6 text-gray-300" />
                <span>Investimentos</span>
              </a>
            </li>
            <li className="mt-2">
              <a
                href="/reports"
                className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
              >
                <DocumentTextIcon className="h-6 w-6 text-gray-300" />
                <span>Relatórios</span>
              </a>
            </li>
            <li className="mt-2">
              <a
                href="/user"
                className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
              >
                <UserIcon className="h-6 w-6 text-gray-300" />
                <span>Minha Conta</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/tvm.jpg" // Caminho relativo ao diretório `public`
            alt="User Photo"
            width={40} // Largura da foto do usuário
            height={40} // Altura da foto do usuário
            className="rounded-full" // Torna a imagem circular
          />
          <div>
            <p className="text-sm font-semibold">Thiago Menezes</p>
            <p className="text-xs text-gray-400">senadorx@gmail.com</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Sair
        </button>
      </div>
    </div>
  );
}
