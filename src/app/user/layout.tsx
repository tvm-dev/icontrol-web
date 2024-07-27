"use client";
import React, { useState } from "react";
import Header from "./components/Shared/Header";
import Sidebar from "./components/Shared/Sidebar";
import Footer from "./components/Shared/Footer";
import FloatingButton from "./components/Shared/FloatingButton";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-16 md:pt-10">
        {" "}
        {/* Ajuste para evitar sobreposição */}
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto md:ml-64">{children}</main>
      </div>
      {/* Floating Button */}
      <FloatingButton />

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default UserLayout;
