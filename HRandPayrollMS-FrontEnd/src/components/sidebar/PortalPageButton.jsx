import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "../loading";

export default function PortalPageButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Determine current portal based on location
  const getCurrentPortal = () => {
    if (location.pathname.startsWith('/employee/')) {
      return 'employee';
    } else {
      return 'admin';
    }
  };

  const currentPortal = getCurrentPortal();

  const portals = [
    {
      id: 'admin',
      name: 'Admin Portal',
      description: 'Full system access',
      icon: '/icons/settings.svg',
      route: '/dashboard',
      color: 'red'
    },
    {
      id: 'employee',
      name: 'Employee Portal',
      description: 'Employee workspace',
      icon: '/icons/employee.svg',
      route: '/employee/dashboard',
      color: 'red'
    }
  ];

  const activePortal = portals.find(p => p.id === currentPortal);

  const handlePortalSwitch = (portal) => {
    setIsDropdownOpen(false);
    navigate(portal.route);
  };

  const getColorClasses = (color, isActive = false, isHovered = false) => {
    const colors = {
      red: {
        bg: isActive ? 'bg-red-600' : isHovered ? 'bg-red-100' : 'bg-gray-100',
        text: isActive ? 'text-white' : isHovered ? 'text-red-700' : 'text-gray-900',
        subtext: isActive ? 'text-white' : isHovered ? 'text-red-600' : 'text-gray-600',
        border: isHovered ? 'border-red-300' : 'border-gray-200'
      },
      blue: {
        bg: isActive ? 'bg-blue-600' : isHovered ? 'bg-blue-100' : 'bg-gray-100',
        text: isActive ? 'text-white' : isHovered ? 'text-blue-700' : 'text-gray-900',
        subtext: isActive ? 'text-white' : isHovered ? 'text-blue-600' : 'text-gray-600',
        border: isHovered ? 'border-blue-300' : 'border-gray-200'
      }
    };
    return colors[color];
  };

  return loading ? (
    <div className="w-full h-14 flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <>
      {user && (
        <div className="relative">
          {/* Main Portal Button */}
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex h-14 items-center gap-3 border rounded-lg cursor-pointer px-3 transition-all duration-300 transform group ${
              getColorClasses(activePortal.color, true).bg
            } ${getColorClasses(activePortal.color, true).border} text-white shadow-lg scale-105`}
          >
            {/* Portal Icon */}
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src={activePortal.icon}
                alt={activePortal.id}
                className="w-6 h-6 transition-all duration-200"
                style={{ filter: 'brightness(0) invert(1)' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <svg className="w-6 h-6 hidden text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex-grow">
              <div className="text-sm font-semibold leading-tight text-white">
                {activePortal.name}
              </div>
              <div className="text-xs leading-tight text-white opacity-90">
                {activePortal.description}
              </div>
            </div>
            
            {/* Dropdown Arrow */}
            <div className="w-4 h-4 flex items-center justify-center">
              <svg className={`w-4 h-4 text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
              {portals.filter(portal => portal.id !== currentPortal).map((portal) => (
                <PortalOption
                  key={portal.id}
                  portal={portal}
                  onSelect={() => handlePortalSwitch(portal)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

// Separate component for portal options to handle individual hover states
function PortalOption({ portal, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getColorClasses = (color, isHovered = false) => {
    const colors = {
      red: {
        bg: isHovered ? 'bg-red-100' : 'bg-white',
        text: isHovered ? 'text-red-700' : 'text-gray-900',
        subtext: isHovered ? 'text-red-600' : 'text-gray-600'
      },
      blue: {
        bg: isHovered ? 'bg-blue-100' : 'bg-white',
        text: isHovered ? 'text-blue-700' : 'text-gray-900',
        subtext: isHovered ? 'text-blue-600' : 'text-gray-600'
      }
    };
    return colors[color];
  };

  const colorClasses = getColorClasses(portal.color, isHovered);

  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 ${colorClasses.bg} hover:scale-[1.02]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div className="w-8 h-8 flex items-center justify-center">
        <img
          src={portal.icon}
          alt={portal.id}
          className="w-5 h-5 transition-all duration-200"
          style={{
            filter: isHovered 
              ? `brightness(0) saturate(100%) ${
                  portal.color === 'red' ? 'invert(27%) sepia(89%) saturate(3072%) hue-rotate(338deg) brightness(89%) contrast(82%)' :
                  portal.color === 'blue' ? 'invert(28%) sepia(97%) saturate(1000%) hue-rotate(200deg) brightness(95%) contrast(105%)' :
                  'invert(23%) sepia(89%) saturate(1940%) hue-rotate(269deg) brightness(93%) contrast(104%)'
                }`
              : 'brightness(0)'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <svg className={`w-5 h-5 hidden transition-colors duration-200 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="flex-grow">
        <div className={`text-sm font-medium leading-tight transition-colors ${colorClasses.text}`}>
          {portal.name}
        </div>
        <div className={`text-xs leading-tight transition-colors ${colorClasses.subtext}`}>
          {portal.description}
        </div>
      </div>
      
      {/* Arrow */}
      <div className="w-4 h-4 flex items-center justify-center">
        <svg className={`w-4 h-4 transition-colors ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
