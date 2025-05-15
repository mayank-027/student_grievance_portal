import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/admin/DashboardLayout';
import axios from '../../api';

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
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Statistics Overview</h1>
        {/* Status Stats */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Grievance Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats?.statusStats.map((stat) => (
              <div key={stat._id} className="bg-white rounded-lg shadow p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{stat._id}</h3>
                <p className="text-3xl font-bold text-indigo-600">{stat.count}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Category Stats */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Grievance Categories</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              {stats?.categoryStats.map((stat) => (
                <div key={stat._id} className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{stat._id}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{
                          width: `${(stat.count / Math.max(...stats.categoryStats.map(s => s.count))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium text-gray-900">{stat.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stats; 