import { useState, useEffect } from 'react';
import axios from '../../api';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/admin/DashboardLayout';
import { CheckCircle, Clock, FileText, XCircle, BarChart2, Layers } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentGrievances, setRecentGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, grievancesRes] = await Promise.all([
          axios.get('/admin/stats'),
          axios.get('/admin/grievances?limit=5')
        ]);
        setStats(statsRes.data.data);
        setRecentGrievances(grievancesRes.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Resolved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const statusIcons = {
    Pending: <Clock className="h-7 w-7 text-yellow-500" />,
    'In Progress': <FileText className="h-7 w-7 text-blue-500" />,
    Resolved: <CheckCircle className="h-7 w-7 text-green-500" />,
    Rejected: <XCircle className="h-7 w-7 text-red-500" />,
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 min-h-screen pb-8">
        {/* Stats Overview */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-indigo-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats?.statusStats.map((stat) => {
              const colorMap = {
                Pending: 'from-yellow-200 via-yellow-100 to-white border-yellow-300',
                'In Progress': 'from-blue-200 via-blue-100 to-white border-blue-300',
                Resolved: 'from-green-200 via-green-100 to-white border-green-300',
                Rejected: 'from-red-200 via-red-100 to-white border-red-300',
              };
              const color = colorMap[stat._id] || 'from-gray-200 via-gray-100 to-white border-gray-300';
              return (
                <div
                  key={stat._id}
                  className={`bg-gradient-to-br ${color} rounded-xl shadow p-6 border flex flex-col items-start`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {statusIcons[stat._id]}
                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">{stat._id}</h3>
                  </div>
                  <p className="mt-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 drop-shadow">
                    {stat.count}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Grievances */}
        <div className="bg-white/90 rounded-xl shadow-lg border border-purple-100">
          <div className="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-bold text-purple-800 tracking-tight">Recent Grievances</h2>
            </div>
            <Link
              to="/admin/grievances"
              className="text-indigo-600 hover:text-indigo-900 font-semibold"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentGrievances.map((grievance) => (
              <div key={grievance._id} className="px-6 py-4 bg-gradient-to-r from-white via-purple-50 to-indigo-50 hover:bg-purple-100/60 transition-colors duration-200 rounded-lg my-2 shadow-sm border border-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-purple-900">
                      {grievance.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {grievance.description.substring(0, 100)}...
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      grievance.status
                    )}`}
                  >
                    {grievance.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>
                    Submitted by {grievance.submittedBy.name} on{' '}
                    {new Date(grievance.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white/90 rounded-xl shadow-lg border border-indigo-100">
          <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50 flex items-center gap-2">
            <Layers className="h-6 w-6 text-indigo-500" />
            <h2 className="text-xl font-bold text-indigo-800 tracking-tight">Grievance Categories</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats?.categoryStats.map((stat) => (
                <div key={stat._id} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-indigo-700 mb-1">
                      {stat._id}
                    </div>
                    <div className="w-full bg-indigo-100 rounded-full h-3.5">
                      <div
                        className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-3.5 rounded-full shadow-inner"
                        style={{
                          width: `${(stat.count / Math.max(...stats.categoryStats.map(s => s.count))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-bold text-indigo-900 flex-shrink-0 w-8 text-right">
                    {stat.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 