import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, FileText, Clock, CheckCircle, XCircle, Star } from 'lucide-react';
import UserDashboardLayout from './UserDashboardLayout';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in progress': 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusIcons = {
  pending: <Clock className="h-4 w-4" />,
  'in progress': <FileText className="h-4 w-4" />,
  resolved: <CheckCircle className="h-4 w-4" />,
  rejected: <XCircle className="h-4 w-4" />,
};

const statusRibbonColors = {
  pending: 'bg-yellow-500',
  'in progress': 'bg-blue-500',
  resolved: 'bg-green-500',
  rejected: 'bg-red-500',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    fetchGrievances();
    if (location.state?.refresh) {
      setSuccessMessage('Grievance submitted successfully!');
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      navigate('/dashboard', { replace: true });
      return () => clearTimeout(timer);
    }
  }, [location]);

  const fetchGrievances = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:8080/api/grievances', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const grievancesArray = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        setGrievances(grievancesArray);
      } else {
        setError('Failed to fetch grievances');
      }
    } catch (err) {
      setError('An error occurred while fetching grievances');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  // Summary counts
  const summary = {
    pending: grievances.filter(g => g.status?.toLowerCase() === 'pending').length,
    'in progress': grievances.filter(g => g.status?.toLowerCase() === 'in progress').length,
    resolved: grievances.filter(g => g.status?.toLowerCase() === 'resolved').length,
  };

  if (loading) {
    return (
      <UserDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout>
      <div className="space-y-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 min-h-screen pb-8">
        {/* Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white rounded-xl shadow p-6 flex items-center space-x-4 border border-yellow-200">
            <div className="bg-yellow-400/80 p-3 rounded-lg shadow-sm">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-yellow-700">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{summary.pending}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-xl shadow p-6 flex items-center space-x-4 border border-blue-200">
            <div className="bg-blue-500/80 p-3 rounded-lg shadow-sm">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700">In Progress</p>
              <p className="text-2xl font-bold text-blue-900">{summary['in progress']}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-100 via-green-50 to-white rounded-xl shadow p-6 flex items-center space-x-4 border border-green-200">
            <div className="bg-green-500/80 p-3 rounded-lg shadow-sm">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-700">Resolved</p>
              <p className="text-2xl font-bold text-green-900">{summary.resolved}</p>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg relative text-center font-semibold shadow">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg relative text-center font-semibold shadow">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Grievances List */}
        <div className="bg-white/90 rounded-xl shadow-lg overflow-hidden border border-purple-100">
          <div className="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-purple-800 tracking-tight">Your Grievances</h2>
            <button
              onClick={() => navigate('/submit-grievance')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Grievance
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {Array.isArray(grievances) && grievances.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No grievances yet</h3>
                <p className="text-gray-500 mb-6">Submit your first grievance to get started</p>
                <button
                  onClick={() => navigate('/submit-grievance')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Grievance
                </button>
              </div>
            ) : (
              grievances.map((grievance) => {
                const status = grievance.status?.toLowerCase();
                return (
                  <div key={grievance._id} className="px-6 py-4 bg-gradient-to-r from-white via-purple-50 to-indigo-50 hover:bg-purple-100/60 transition-colors duration-200 rounded-lg my-2 shadow-sm border border-purple-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-purple-900 truncate flex items-center gap-2">
                          {statusIcons[status]}
                          {grievance.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {grievance.description}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[status]}`}
                        >
                          <span className="ml-1.5">{grievance.status}</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>Submitted on {new Date(grievance.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => navigate(`/grievance/${grievance._id}`)}
                        className="text-purple-600 hover:text-purple-800 font-semibold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default Dashboard; 