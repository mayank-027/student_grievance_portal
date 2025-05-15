import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Grievances', href: '/admin/grievances', icon: '📝' },
  { name: 'Users', href: '/admin/users', icon: '👥' },
  { name: 'Statistics', href: '/admin/stats', icon: '📈' },
];

const SIDEBAR_COLLAPSED = 'collapsed';
const SIDEBAR_EXPANDED = 'expanded';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile
  const [sidebarState, setSidebarState] = useState(SIDEBAR_EXPANDED); // for desktop
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
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
          ${sidebarState === SIDEBAR_COLLAPSED ? 'w-14' : 'w-56'}
        `}
        style={{ minHeight: '100vh' }}
        onMouseEnter={() => setSidebarState(SIDEBAR_EXPANDED)}
        onMouseLeave={() => setSidebarState(SIDEBAR_COLLAPSED)}
      >
        {/* Toggle button (desktop only) */}
        <div className="flex items-center justify-between h-16 px-2 border-b">
          {sidebarState === SIDEBAR_EXPANDED && (
            <span className="text-2xl font-bold text-purple-700 tracking-wide ml-2">Admin</span>
          )}
          <button
            className="hidden md:flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none rounded-full p-2 transition"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {sidebarState === SIDEBAR_EXPANDED ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <nav className="flex-1 mt-4 px-1 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 px-2 py-2 text-base font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple-400
                ${location.pathname === item.href
                  ? 'bg-purple-100 text-purple-800 font-semibold'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}
              `}
              onClick={() => setSidebarOpen(false)}
              tabIndex={0}
            >
              <span className="text-lg flex-shrink-0 w-8 text-center">{item.icon}</span>
              {sidebarState === SIDEBAR_EXPANDED && <span className="truncate">{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <span className="text-lg">🚪</span>
            {sidebarState === SIDEBAR_EXPANDED && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-14 md:ml-[56px]" style={{backgroundColor: 'transparent'}}>
        {/* Top bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30 flex items-center h-16 px-4 md:px-8">
          {/* Hamburger for mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden mr-4"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {sidebarOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
          <span className="text-gray-700 text-lg font-medium">Welcome, Admin</span>
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

export default DashboardLayout; 