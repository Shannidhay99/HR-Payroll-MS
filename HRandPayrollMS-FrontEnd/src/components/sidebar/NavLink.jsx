import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink as NavigationLink, useLocation } from "react-router-dom";
import ChildNavLink from "./ChildNavLink";

export default function NavLink({ routeInfo }) {
  const [open, setOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/${routeInfo.link}`;
  
  // Check if any child route is active
  const isChildActive = routeInfo.extend?.some(child => 
    location.pathname === `/${child.link}`
  );
  
  // Parent should be considered active if either parent or any child is active
  const isParentActive = isActive || isChildActive;

  const handleClick = (e) => {
    // Only prevent default and handle expand if it has children AND user clicked the expand arrow
    if (routeInfo.extend?.length > 0 && e.target.closest(".expand-arrow")) {
      e.preventDefault();
      setOpen(!open);
    }
    // Otherwise let the navigation happen naturally
  };

  return (
    <>
      <div className="h-12 mb-3 main-menu">
        <NavigationLink
          to={routeInfo.link}
          className={() => `
            flex h-12 items-center gap-4 px-3 py-2 rounded-lg transition-all duration-300 transform group
            ${
              isParentActive
                ? "bg-red-600 text-white shadow-lg scale-105"
                : "text-black hover:bg-red-100 hover:text-red-700 hover:scale-105 hover:shadow-lg hover:border-red-300 border border-transparent"
            }
          `}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left section with icon */}
          <div className="w-6 flex-shrink-0">
            <img
              src={routeInfo.icon}
              alt={routeInfo.title}
              className="w-6 h-6 transition-all duration-200"
              style={{
                filter: isParentActive 
                  ? 'brightness(0) invert(1)' 
                  : isHovered 
                    ? 'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(3072%) hue-rotate(338deg) brightness(89%) contrast(82%)' 
                    : 'brightness(0)'
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            {/* Fallback SVG icon */}
            <svg
              className={`w-6 h-6 hidden transition-colors duration-200 ${
                isParentActive ? 'text-white' : isHovered ? 'text-red-600' : 'text-black'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title section */}
          <div className="flex-grow">
            <span className="text-base select-none leading-tight whitespace-nowrap">
              {routeInfo.title}
            </span>
          </div>

          {/* Expand/Collapse arrow for items with children */}
          {routeInfo.extend && routeInfo.extend.length > 0 && (
            <div
              className={`expand-arrow transition-transform duration-200 ${
                open ? "rotate-90" : ""
              }`}
            >
              <svg
                className={`w-4 h-4 transition-colors duration-200 ${
                  isParentActive ? 'text-white' : isHovered ? 'text-red-600' : 'text-black'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}
        </NavigationLink>
      </div>
      <div className="relative">
        {routeInfo.extend &&
          open &&
          routeInfo.extend.map((childRouteInfo) => (
            <ChildNavLink
              key={childRouteInfo.title}
              routeInfo={childRouteInfo}
            />
          ))}
      </div>
    </>
  );
}

NavLink.propTypes = {
  routeInfo: PropTypes.object.isRequired,
};
