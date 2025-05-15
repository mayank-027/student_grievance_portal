import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");
    setIsAuthenticated(!!token);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm py-4 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-zinc-800">
              StudentVoice
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 font-semibold">
            <a
              href="/dashboard"
              className="text-zinc-600 hover:text-purple-600"
            >
              Dashboard
            </a>

            <a href="/about-us" className="text-zinc-600 hover:text-purple-600">
              About
            </a>
            <a href="/contact-us" className="text-zinc-600 hover:text-purple-600">
              Contact
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition"
              >
                Log Out
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-purple-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-white border-t">
          <a
            href="/dashboard"
            className="block text-zinc-600 hover:text-purple-600"
          >
            Dashboard
          </a>

          <a
            href="/about"
            className="block text-zinc-600 hover:text-purple-600"
          >
            About
          </a>
          <a
            href="/contact"
            className="block text-zinc-600 hover:text-purple-600"
          >
            Contact
          </a>

          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="w-full text-purple-600 border border-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-purple-600 border border-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition"
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
