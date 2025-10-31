import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function EmployeeNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const dropdownRef = useRef(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employee");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userRole");
    
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 1500,
    });
    
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50 backdrop-blur-sm">
      <div className="flex">
        {/* Logo and Brand - Aligned with Sidebar */}
        <div className="w-64 flex items-center px-6 h-20 border-r border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center group">
              <img 
                src="/images/smarthrlogo.png" 
                alt="SmartHR" 
                className="h-10 w-auto hover:opacity-80 transition-all duration-300 transform group-hover:scale-105"
                title="Go to Home"
              />
            </Link>
            <Link to="/employee/dashboard" className="text-xl font-bold text-gray-900 hover:text-red-600 transition-all duration-300 hover:scale-105">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent hover:from-red-600 hover:to-red-500">
                Employee Portal
              </span>
            </Link>
          </div>
        </div>

        {/* Rest of navbar content */}
        <div className="flex-1 flex justify-between items-center px-6 h-20">
          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl ml-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full h-12 pl-12 pr-4 bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-red-300 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 focus:outline-none"
                placeholder="Search employees, reports, or anything..."
              />
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <div className="md:hidden">
              <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Theme/Settings Button */}
            <button className="hidden md:flex items-center justify-center p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 backdrop-blur-sm border border-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationPopup(!notificationPopup)}
                className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 backdrop-blur-sm border border-gray-200"
                aria-label="Notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                
                {/* Enhanced Notification Badge */}
                <span className="absolute -top-1 -right-1 flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-gradient-to-r from-red-500 to-red-600 items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-xs font-bold text-white drop-shadow-sm">3</span>
                  </span>
                </span>
              </button>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 backdrop-blur-sm border border-gray-200 min-w-[160px]"
              >
                <div className="flex items-center space-x-3 justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                      src={currentUser.profilePicture}
                      alt={currentUser.fullName}
                    />
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-semibold text-gray-900 leading-tight">
                        {currentUser.firstName}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight">
                        EMP-{currentUser.empId}
                      </div>
                    </div>
                  </div>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 py-2 z-50 transform transition-all duration-200 origin-top-right">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                        src={currentUser.profilePicture}
                        alt={currentUser.fullName}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {currentUser.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/employee/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    
                    <Link
                      to="/employee/payslips"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      My Payslips
                    </Link>

                    <Link
                      to="/employee/attendance"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      My Attendance
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-gray-200 bg-gray-50 backdrop-blur-sm px-6 py-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-red-300 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 focus:outline-none"
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
}
