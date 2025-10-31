import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

export default function BlankLayout() {
  return (
    <>
      <div className="min-h-screen">
        <ScrollToTop>
          {/* Main layout routes children will placed here by default */}
          <Outlet />
        </ScrollToTop>
      </div>
    </>
  );
}
