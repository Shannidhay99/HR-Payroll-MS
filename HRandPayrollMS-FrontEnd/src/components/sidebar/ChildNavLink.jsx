import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

export default function ChildNavLink({ routeInfo }) {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const isActive = location.pathname === `/${routeInfo.link}`;

  return (
    <div className="ml-6 mb-2 relative sub-menu">
      {/* Connecting line to parent */}
      <div className="absolute left-3 top-0 w-px h-full bg-gray-300"></div>
      <div className="absolute left-3 top-5 w-3 h-px bg-gray-300"></div>
      
      <NavLink
        to={routeInfo.link}
        className={`
            flex h-10 items-center gap-3 px-6 py-2 rounded-lg transition-all duration-300 transform group border border-transparent relative z-10
            ${isActive 
              ? 'bg-red-600 text-white shadow-lg scale-105' 
              : 'text-black hover:bg-red-100 hover:text-red-700 hover:scale-105 hover:shadow-lg hover:border-red-300'
            }
          `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon instead of bullet point */}
        <div className="w-4 flex-shrink-0">
          {routeInfo.icon ? (
            <img
              src={routeInfo.icon}
              alt={routeInfo.title}
              className="w-4 h-4 transition-all duration-200"
              style={{
                filter: isActive 
                  ? 'brightness(0) invert(1)' // White when active/clicked
                  : isHovered 
                    ? 'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(3072%) hue-rotate(338deg) brightness(89%) contrast(82%)' // Red when hovered
                    : 'brightness(0)' // Black when inactive
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
          ) : null}
          {/* Fallback bullet point if no icon */}
          <div className={`w-2.5 h-2.5 rounded-full ${
            !routeInfo.icon ? 'block' : 'hidden'
          } ${
            isActive ? 'bg-white' : isHovered ? 'bg-red-600' : 'bg-black'
          }`}></div>
        </div>
        <span className="text-sm leading-tight whitespace-nowrap">{routeInfo.title}</span>
      </NavLink>
    </div>
  );
}

ChildNavLink.propTypes = {
  routeInfo: PropTypes.object.isRequired,
};
