import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/admin/DashboardLayout';
import axios from '../../api';
import { CheckCircle, Clock, FileText, XCircle, Layers } from 'lucide-react';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/admin/stats');
        setStats(response.data.data);
      } catch (err) {
        setError('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600 font-semibold">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 min-h-screen pb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 mb-6 drop-shadow">Statistics Overview</h1>
        
        {/* Status Stats */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-indigo-100">
          <h2 className="text-xl font-bold text-indigo-800 tracking-tight mb-4">Grievance Status</h2>
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
        
        {/* Category Stats */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-800 tracking-tight mb-4">Grievance Categories</h2>
          <div className="space-y-4">
            {stats?.categoryStats.map((stat) => (
              <div key={stat._id} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-purple-700 mb-1">
                    {stat._id}
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-3.5">
                    <div
                      className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-3.5 rounded-full shadow-inner"
                      style={{
                        width: `${(stat.count / Math.max(...stats.categoryStats.map(s => s.count))) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-sm font-bold text-purple-900 flex-shrink-0 w-8 text-right">
                  {stat.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stats; 