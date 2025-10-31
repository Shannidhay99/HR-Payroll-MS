import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeNavbar from "../components/employee/EmployeeNavbar";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import ScrollToTop from "../components/ScrollToTop";

export default function EmployeeLayout() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <EmployeeNavbar />
      <EmployeeSidebar />
      <main className="ml-64 pt-20 min-h-[calc(100vh-5rem)]">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
    </div>
  );
}
