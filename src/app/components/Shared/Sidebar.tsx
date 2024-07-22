"use client";

import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:w-64 w-16`}
    >
      <button
        className="p-2 text-white bg-gray-700 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Open"}
      </button>
      <div
        className={`flex flex-col p-4 ${isOpen ? "block" : "hidden md:block"}`}
      >
        <h1 className="text-lg font-bold">Sidebar</h1>
        <nav>
          <ul>
            <li>
              <a href="/path1" className="block p-2 hover:bg-gray-600">
                Link 1
              </a>
            </li>
            <li>
              <a href="/path2" className="block p-2 hover:bg-gray-600">
                Link 2
              </a>
            </li>
            <li>
              <a href="/path3" className="block p-2 hover:bg-gray-600">
                Link 3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
