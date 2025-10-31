import { useDispatch, useSelector } from "react-redux";
import { open, close, sidebarStatus } from "../../features/drawer/drawerSlice";
import Brand from "../sidebar/Brand";

export default function ResponsiveBrand() {
  const dispatch = useDispatch();
  const isActiveDrawer = useSelector(sidebarStatus);

  const handleClick = () => {
    if (isActiveDrawer) {
      dispatch(close());
    } else {
      dispatch(open());
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={handleClick}
        className="lg:hidden w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200"
      >
        <img 
          src="/icons/3Bar.svg" 
          alt="menu" 
          className={`w-6 h-6 transition-transform duration-300 ${
            isActiveDrawer ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      <Brand />
    </div>
  );
}
