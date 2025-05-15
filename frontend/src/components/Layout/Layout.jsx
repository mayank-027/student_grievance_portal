import Footer from "./Footer";
import Navbar from "./Navbar";
import SlidingChat from "./SlidingChat";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname === "/";
  return (
    <>
      {showNavbar && <Navbar />}
      <main className="max-w-7xl mx-auto">
        {children}
        <SlidingChat />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
