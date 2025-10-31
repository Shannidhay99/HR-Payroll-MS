import { useDispatch, useSelector } from "react-redux";
import { adminLinks } from "../../../constants";
import { close, sidebarStatus } from "../../features/drawer/drawerSlice";
import Brand from "./Brand";
import NavLink from "./NavLink";
import PortalPageButton from "./PortalPageButton";
import OutsideClickHandler from 'react-outside-click-handler';

const Sidebar = () => {
  const isSidebarOpen = useSelector(sidebarStatus);
  const dispatch = useDispatch();

  return (
    <div className="lg:block">
      <OutsideClickHandler
        disabled={!isSidebarOpen}
        onOutsideClick={() => {
          if (window.innerWidth < 1024) {
            dispatch(close());
          }
        }}
      >
        <aside
          id="sidebar"
          className={`w-[250px] h-screen bg-white fixed top-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 shadow-xl flex flex-col`}
        >
          {/* Fixed Brand Section */}
          <div className="px-8 py-0 hidden lg:flex items-center bg-white flex-shrink-0 h-20">
            <Brand />
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 mb-5">
              <PortalPageButton />
            </div>
            <div className="p-3">
              {adminLinks.map((routeInfo) => (
                <NavLink key={routeInfo.title} routeInfo={routeInfo} />
              ))}
            </div>
          </div>
        </aside>
      </OutsideClickHandler>
    </div>
  );
};

export default Sidebar;
