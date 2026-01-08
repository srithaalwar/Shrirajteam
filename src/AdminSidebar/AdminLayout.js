import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./AdminLayout.css";

function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onToggleMobile={isMobileSidebarOpen}
      />
      
      <main className={`main-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Outlet /> {/* This renders nested routes */}
      </main>
    </div>
  );
}

export default AdminLayout;