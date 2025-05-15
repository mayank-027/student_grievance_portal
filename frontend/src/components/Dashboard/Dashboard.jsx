import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, FileText, Clock, CheckCircle, XCircle, User, LogOut, Layers, Star } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://uktech.ac.in/images/UTU-Dehradun-building.jpg")',
          filter: 'brightness(0.85)',
        }}
      />
      
      {/* Content with Semi-transparent Overlay */}
      <div className="relative min-h-screen bg-black/40 py-10 px-2 sm:px-0">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full p-1">
                {user?.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="h-16 w-16 rounded-full object-cover border-2 border-purple-300" />
                ) : (
                  <User className="h-10 w-10 text-purple-600" />
                )}
              </div>
              <div>
                <div className="text-lg font-bold text-zinc-800">{user?.name || 'User'}</div>
                <div className="text-sm text-zinc-500">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow hover:from-purple-600 hover:to-indigo-600 transition"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </div>

          {/* Summary Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-zinc-700">Pending:</span>
              <span className="text-yellow-700 font-bold">{summary.pending}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-zinc-700">In Progress:</span>
              <span className="text-blue-700 font-bold">{summary['in progress']}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-zinc-700">Resolved:</span>
              <span className="text-green-700 font-bold">{summary.resolved}</span>
            </div>
          </div>

          {successMessage && (
            <div className="bg-green-50/90 backdrop-blur-sm border border-green-200 text-green-600 px-4 py-3 rounded relative mb-4 text-center shadow">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 text-red-600 px-4 py-3 rounded relative mb-4 text-center shadow">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Grievance Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(grievances) && grievances.length === 0 ? (
              <div className="col-span-full flex flex-col items-center py-16 text-zinc-400">
                <svg className="h-20 w-20 mb-4 text-purple-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                <span className="text-lg">No grievances found.<br />Submit your first grievance!</span>
              </div>
            ) : (
              Array.isArray(grievances) && grievances.map((grievance) => {
                const status = grievance.status?.toLowerCase();
                return (
                  <div key={grievance._id} className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[180px] transition hover:shadow-xl">
                    {/* Status Ribbon */}
                    <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-2xl text-xs font-bold text-white ${statusRibbonColors[status] || 'bg-gray-400'}`}>{grievance.status?.replace('_', ' ')}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {statusIcons[status] || <FileText className="h-4 w-4" />}
                        <span className="font-semibold text-purple-700 text-base truncate">{grievance.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"><Layers className="h-3 w-3 mr-1" />{grievance.category}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><Star className="h-3 w-3 mr-1" />{grievance.priority}</span>
                      </div>
                      <p className="text-sm text-zinc-500 mb-2 truncate">{grievance.description}</p>
                      {grievance.aiPrediction && (
                        <div className="inline-block mt-1 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100">
                          Chance of Resolution: {grievance.aiPrediction}
                          {grievance.aiProbability !== undefined && grievance.aiProbability !== null && (
                            <span className="ml-2 text-purple-400">({(grievance.aiProbability * 100).toFixed(1)}%)</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-zinc-400">Submitted on {new Date(grievance.createdAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => navigate(`/grievance/${grievance._id}`)}
                        className="text-xs font-medium text-purple-600 hover:text-purple-500 transition"
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
      {/* Floating Action Button for New Grievance */}
      <button
        onClick={() => navigate('/submit-grievance')}
        className="fixed bottom-24 right-8 z-50 bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        title="Submit New Grievance"
      >
        <Plus className="h-7 w-7" />
      </button>
    </div>
  );
};

export default Dashboard; 