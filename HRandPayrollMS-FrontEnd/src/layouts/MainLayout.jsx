import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
// import { useAuth } from "../components/hooks/useAuth";
// import LoadingSpinner from "../components/loading/LoadingSpinner";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
// import NotFoundPage from "../pages/NotFoundPage";

export default function MainLayout() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="ml-0 lg:ml-[250px] min-h-[calc(100vh-98px)] xs:min-h-[calc(100vh-110px)] md:min-h-[calc(100vh-126px)] lg:min-h-[calc(100vh-90px)] bg-default-theme dark:bg-dark-theme">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
    </div>
  );
}
