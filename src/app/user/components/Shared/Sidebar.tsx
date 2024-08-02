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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);

  useEffect(() => {
    setIsSidebarOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden`}
          onClick={onClose} // Fecha o Sidebar quando clicado fora
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full z-40"
        } md:translate-x-0 md:w-64 w-64 flex flex-col`}
      >
        <button
          className="p-2 text-white bg-blue-700 md:hidden"
          onClick={onClose}
        >
          {isSidebarOpen ? "Fechar Menu" : "Open"}
        </button>
        <div
          className={`flex flex-col flex-grow p-4 ${
            isSidebarOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex items-center mb-5">
            <Image
              src="/images/logo.png"
              alt="iControl Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <h1 className="text-2xl font-bold">iControl</h1>
          </div>
          <nav>
            <ul>
              <li className="mt-2">
                <a
                  href="/user/dashboard"
                  className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
                >
                  <HomeIcon className="h-6 w-6 text-gray-300" />
                  <span>Início</span>
                </a>
              </li>
              <li className="">
                <a
                  href="/user/transactions"
                  className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
                >
                  <CurrencyDollarIcon className="h-6 w-6 text-gray-300" />
                  <span>Transações</span>
                </a>
              </li>
              <li className="">
                <a
                  href="/user/investments"
                  className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
                >
                  <BanknotesIcon className="h-6 w-6 text-gray-300" />
                  <span>Investimentos</span>
                </a>
              </li>
              <li className="">
                <a
                  href="/user/reports"
                  className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
                >
                  <DocumentTextIcon className="h-6 w-6 text-gray-300" />
                  <span>Relatórios</span>
                </a>
              </li>

              <li className="">
                <a
                  href="/user/categories"
                  className="flex items-center space-x-4 p-2 hover:bg-gray-600 transition-colors duration-300 rounded"
                >
                  <DocumentTextIcon className="h-6 w-6 text-gray-300" />
                  <span>Categorias</span>
                </a>
              </li>

              <li className="">
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
        <div className="flex flex-col justify-between p-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/tvm.jpg"
              alt="User Photo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">Thiago Menezes</p>
              <p className="text-xs text-gray-400">senadorx@gmail.com</p>
            </div>
          </div>
          <button className=" w-1/2 self-center mt-2 text-white p-2 border border-red-100 text-sm px-2 py-1 rounded hover:bg-red-600 transition duration-1000">
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
