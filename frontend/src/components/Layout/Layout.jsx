import Footer from "./Footer";
import Navbar from "./Navbar";
import SlidingChat from "./SlidingChat";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname === "/";
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showNavbar && <Navbar />}
      <main className={`flex-grow ${showNavbar ? 'pt-16' : ''} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
        {!isAdminRoute && <SlidingChat />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
