import { useState, useEffect } from 'react';
import { Clock, FileText, CheckCircle, XCircle, Building2 } from 'lucide-react';

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Resolved', label: 'Resolved' },
  { value: 'Rejected', label: 'Rejected' },
];

const DepartmentDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [department, setDepartment] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const deptData = sessionStorage.getItem('department');
    if (deptData) setDepartment(JSON.parse(deptData));
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    setLoading(true);
    setError('');
    try {
      const token = sessionStorage.getItem('departmentToken');
      const response = await fetch('http://localhost:8080/api/department/grievances', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setGrievances(data.data);
      } else {
        setError(data.message || 'Failed to fetch grievances');
      }
    } catch (err) {
      setError('An error occurred while fetching grievances');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (grievanceId, newStatus) => {
    setUpdatingId(grievanceId);
    setSuccessMsg('');
    try {
      const token = sessionStorage.getItem('departmentToken');
      const response = await fetch(`http://localhost:8080/api/grievances/${grievanceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setSuccessMsg('Status updated successfully!');
        fetchGrievances();
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError('An error occurred while updating status');
    } finally {
      setUpdatingId(null);
      setTimeout(() => setSuccessMsg(''), 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in progress':
        return <FileText className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-400 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white rounded-full shadow-lg p-4 mb-2">
            <Building2 className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow mb-2">
            {department ? `${department.name} Department` : 'Department Dashboard'}
          </h1>
        </div>
        {successMsg && (
          <div className="mb-4 flex items-center bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span>{successMsg}</span>
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative mb-4 text-center shadow">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <ul className="divide-y divide-zinc-200">
              {Array.isArray(grievances) && grievances.length === 0 ? (
                <li className="px-8 py-16 text-center text-zinc-400 flex flex-col items-center">
                  <svg className="h-16 w-16 mb-4 text-purple-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <span className="text-lg">No grievances assigned to this department.</span>
                </li>
              ) : (
                grievances.map((grievance) => (
                  <li key={grievance._id} className="transition hover:bg-purple-50/40">
                    <div className="px-6 py-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-purple-700 truncate">
                            {grievance.title}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500 truncate">
                            {grievance.description}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex flex-col items-end gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow ${getStatusColor(grievance.status)}`}>
                            {getStatusIcon(grievance.status)}
                            <span className="ml-1 capitalize">{grievance.status}</span>
                          </span>
                          <select
                            value={grievance.status}
                            onChange={e => handleStatusChange(grievance._id, e.target.value)}
                            disabled={updatingId === grievance._id}
                            className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-xs px-2 py-1"
                          >
                            {statusOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-zinc-400">
                        <div>
                          Submitted on {new Date(grievance.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          By {grievance.submittedBy?.name || 'Unknown'}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDashboard; 