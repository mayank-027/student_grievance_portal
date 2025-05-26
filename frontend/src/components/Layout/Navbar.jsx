import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");
    setIsAuthenticated(!!token);
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Sparkles className="h-8 w-8 text-purple-600 group-hover:rotate-12 transition-transform duration-300" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              StudentVoice
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 font-medium">
            <Link
              to="/dashboard"
              className="text-zinc-600 hover:text-purple-600 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/about-us"
              className="text-zinc-600 hover:text-purple-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact-us"
              className="text-zinc-600 hover:text-purple-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200 hover:shadow-sm"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 hover:shadow-md"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-zinc-600 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200 hover:shadow-sm flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-purple-600 p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden bg-white border-t`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          <Link
            to="/dashboard"
            className="block text-zinc-600 hover:text-purple-600 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/about-us"
            className="block text-zinc-600 hover:text-purple-600 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="block text-zinc-600 hover:text-purple-600 transition-colors duration-200"
          >
            Contact
          </Link>

          {!isAuthenticated ? (
            <div className="space-y-3 pt-4">
              <button
                onClick={() => navigate("/login")}
                className="w-full text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-4">
              <div className="text-zinc-600 flex items-center">
                <User className="h-5 w-5 mr-2" />
                {user?.name}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
