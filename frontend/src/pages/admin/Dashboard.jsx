import { useState, useEffect } from 'react';
import axios from '../../api';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/admin/DashboardLayout';

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
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.statusStats.map((stat) => (
            <div
              key={stat._id}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-900">{stat._id}</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">
                {stat.count}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Grievances */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Grievances
              </h2>
              <Link
                to="/admin/grievances"
                className="text-indigo-600 hover:text-indigo-900"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentGrievances.map((grievance) => (
              <div key={grievance._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {grievance.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {grievance.description.substring(0, 100)}...
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
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
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Grievance Categories
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats?.categoryStats.map((stat) => (
                <div key={stat._id} className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {stat._id}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{
                          width: `${(stat.count / Math.max(...stats.categoryStats.map(s => s.count))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium text-gray-900">
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