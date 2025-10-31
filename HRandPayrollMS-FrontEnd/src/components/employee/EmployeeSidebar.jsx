import React from "react";
import { Link, useLocation } from "react-router-dom";
import PortalPageButton from "../sidebar/PortalPageButton";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function EmployeeSidebar() {
  const location = useLocation();
  const currentUser = useCurrentUser();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/employee/dashboard",
      icon: "/icons/Dash2.svg"
    },
    {
      name: "My Profile",
      path: "/employee/profile",
      icon: "/icons/employee.svg"
    },
    {
      name: "Attendance",
      path: "/employee/attendance",
      icon: "/icons/attendance.svg"
    },
    {
      name: "Leave Requests",
      path: "/employee/leave-requests",
      icon: "/icons/leave.svg"
    },
    {
      name: "Payslips",
      path: "/employee/payslips",
      icon: "/icons/payroll.svg"
    },
    {
      name: "Notices",
      path: "/employee/notices",
      icon: "/icons/notice.svg"
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto z-40">
      <div className="p-4">
        {/* Portal Switcher Button */}
        <div className="mb-4">
          <PortalPageButton />
        </div>
        
        {/* Employee Info */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <img
              className="h-12 w-12 rounded-full object-cover border-2 border-red-200"
              src={currentUser.profilePicture}
              alt={currentUser.fullName}
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {currentUser.fullName}
              </h3>
              <p className="text-xs text-gray-600">
                ID: {currentUser.employeeId}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <img 
                src={item.icon} 
                alt={item.name}
                className={`h-5 w-5 ${isActive(item.path) ? "filter-red" : ""}`}
              />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Stats
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Present Days</span>
              <span className="font-semibold text-green-600">22</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Leave Balance</span>
              <span className="font-semibold text-blue-600">8</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Pending Requests</span>
              <span className="font-semibold text-yellow-600">1</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
