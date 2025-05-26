import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, FileText, Settings, LogOut, Menu, X, ChevronsLeft, ChevronsRight } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: <FileText className="h-5 w-5" /> },
  { name: 'Profile', href: '/profile', icon: <User className="h-5 w-5" /> },
  { name: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
];

const SIDEBAR_COLLAPSED = 'collapsed';
const SIDEBAR_EXPANDED = 'expanded';

const UserDashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarState, setSidebarState] = useState(SIDEBAR_EXPANDED); // desktop collapse/expand
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarState((prev) =>
      prev === SIDEBAR_EXPANDED ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED
    );
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full flex flex-col transition-all duration-300 bg-white shadow-lg
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:block
          ${sidebarState === SIDEBAR_COLLAPSED ? 'w-14' : 'w-64'}
        `}
        style={{ minHeight: '100vh' }}
        onMouseEnter={() => setSidebarState(SIDEBAR_EXPANDED)}
        onMouseLeave={() => setSidebarState(SIDEBAR_COLLAPSED)}
      >
        {/* User Profile Section */}
        <div className={`p-4 border-b flex items-center space-x-3 ${sidebarState === SIDEBAR_COLLAPSED ? 'justify-center' : ''}`}>
          <div className="bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full p-1">
            {user?.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="h-10 w-10 rounded-full object-cover border-2 border-purple-300" />
            ) : (
              <User className="h-6 w-6 text-purple-600" />
            )}
          </div>
          {sidebarState === SIDEBAR_EXPANDED && (
            <div>
              <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-purple-50 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                  ${sidebarState === SIDEBAR_COLLAPSED ? 'justify-center px-2' : ''}`}
              >
                {item.icon}
                {sidebarState === SIDEBAR_EXPANDED && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse/Expand Button (desktop only) */}
        <div className="p-2 border-t mt-auto hidden md:block">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center gap-2 px-2 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:bg-gray-100 transition focus:outline-none"
          >
            {sidebarState === SIDEBAR_EXPANDED ? <ChevronsLeft className="h-5 w-5" /> : <ChevronsRight className="h-5 w-5" />}
            {sidebarState === SIDEBAR_EXPANDED && <span>Collapse</span>}
          </button>
        </div>

        {/* Logout Button */}
        <div className={`p-4 border-t ${sidebarState === SIDEBAR_COLLAPSED ? 'flex justify-center' : ''}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 ${sidebarState === SIDEBAR_COLLAPSED ? 'justify-center px-2' : 'w-full'}`}
          >
            <LogOut className="h-5 w-5" />
            {sidebarState === SIDEBAR_EXPANDED && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-h-screen ${sidebarState === SIDEBAR_COLLAPSED ? 'md:ml-14' : 'md:ml-64'}`}>
        {/* Top bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30 flex items-center h-16 px-4 md:px-8">
          {/* Hamburger for mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden mr-4"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <span className="text-gray-700 text-lg font-medium">Welcome, {user?.name || 'User'}</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 bg-zinc-50 min-h-[calc(100vh-4rem)] overflow-x-auto">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout; 