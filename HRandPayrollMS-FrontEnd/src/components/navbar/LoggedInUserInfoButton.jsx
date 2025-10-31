import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useCurrentAdminUser } from "../hooks/useCurrentAdminUser";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAuth } from "../hooks/useAuth";

export default function LoggedInUserInfoButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  
  // Determine if user is admin (role_id === 2) or employee (role_id === 1)
  const isAdmin = user?.role_id === 2;
  const currentAdminUser = useCurrentAdminUser();
  const currentEmployeeUser = useCurrentUser();
  
  // Use the appropriate user data based on role
  const currentUser = isAdmin ? currentAdminUser : currentEmployeeUser;

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
    // Clear user data
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 1500,
    });
    // Close dropdown
    setShowDropdown(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 backdrop-blur-sm border border-gray-200 min-w-[140px]"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex items-center space-x-2">
            <img
              className="w-5 h-5 rounded-full border border-gray-300"
              src={currentUser.profilePicture}
              alt="Profile"
            />
            <span
              data-tooltip-id="first-name"
              className="hidden md:block text-gray-700 font-medium text-sm whitespace-nowrap"
            >
              Hello, {currentUser.firstName}
            </span>
          </div>
          <svg className="w-3 h-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <Tooltip id="first-name">{currentUser.firstName}</Tooltip>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 py-2 ring-1 ring-black/5 z-50 transform transition-all duration-200 origin-top-right scale-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-200"
                src={currentUser.profilePicture}
                alt="Profile"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">{currentUser.fullName}</p>
                <p className="text-xs text-gray-600">{currentUser.email}</p>
              </div>
            </div>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
              onClick={() => setShowDropdown(false)}
            >
              <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              View Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
              onClick={() => setShowDropdown(false)}
            >
              <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </div>
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
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
  );
}
