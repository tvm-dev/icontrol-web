// src/app/user/layout.tsx
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
    <div>
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {children}
      <FloatingButton />
    </div>
  );
};

export default UserLayout;
