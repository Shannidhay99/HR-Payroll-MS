import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggle as drawerToggle } from "../../features/drawer/drawerSlice";
import { useAuth } from "../hooks/useAuth";
import Notification from "../notification/Notification";
import Overlay from "../overlay/Overlay";
import SearchBar from "./SearchBar";
import LoggedInUserInfoButton from "./LoggedInUserInfoButton";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notificationPopup, setNotificationPopup] = useState(false);

  function closeNotificationPopup() {
    setNotificationPopup(false);
  }

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-200 ml-0 lg:ml-[250px] sticky top-0 z-20 backdrop-blur-sm">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(drawerToggle())}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-opacity-50"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="hidden sm:block flex-1 max-w-2xl">
              <div className="relative">
                <SearchBar className="w-full h-10 bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-red-300 transition-all duration-300" />
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-sm sm:hidden mx-4">
            <div className="relative">
              <SearchBar className="w-full h-10 bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-red-300 transition-all duration-300" />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationPopup(true)}
                className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 backdrop-blur-sm border border-gray-200"
                aria-label="Notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                
                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-white drop-shadow-sm">3</span>
                  </span>
                </span>
              </button>
            </div>

            {/* User Section */}
            {user ? (
              <LoggedInUserInfoButton />
            ) : (
              <button 
                onClick={() => navigate("/signin")}
                className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 border-2 border-red-600 rounded-xl shadow-lg hover:from-red-700 hover:to-red-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {notificationPopup && (
        <Overlay>
          <Notification closeNotificationPopup={closeNotificationPopup} />
        </Overlay>
      )}
    </>
  );
}
