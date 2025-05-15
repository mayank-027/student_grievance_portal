import { useState, useEffect } from 'react';
import axios from '../../api';
import DashboardLayout from '../../components/admin/DashboardLayout';

const Grievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: '',
    page: 1,
    limit: 10
  });
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [comment, setComment] = useState('');
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchGrievances();
    fetchUsers();
    fetchDepartments();
  }, [filters]);

  const fetchGrievances = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`/admin/grievances?${queryParams}`);
      setGrievances(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/department/departments');
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page on filter change
    }));
  };

  const handleStatusUpdate = async (grievanceId, newStatus) => {
    try {
      await axios.put(`/admin/grievances/${grievanceId}`, {
        status: newStatus
      });
      fetchGrievances();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAssign = async (grievanceId, userId) => {
    try {
      await axios.put(`/admin/grievances/${grievanceId}`, {
        assignedTo: userId
      });
      fetchGrievances();
    } catch (error) {
      console.error('Error assigning grievance:', error);
    }
  };

  const handleAssignDepartment = async (grievanceId, departmentId) => {
    try {
      await axios.put(`/grievances/${grievanceId}`, {
        department: departmentId
      });
      fetchGrievances();
    } catch (error) {
      console.error('Error assigning department:', error);
    }
  };

  const handleAddComment = async (grievanceId) => {
    if (!comment.trim()) return;
    
    try {
      await axios.put(`/admin/grievances/${grievanceId}`, {
        comment: comment
      });
      setComment('');
      fetchGrievances();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

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
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Administrative">Administrative</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Grievances List */}
        <div className="bg-white rounded-lg shadow">
          <div className="divide-y divide-gray-200">
            {grievances.map((grievance) => (
              <div key={grievance._id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {grievance.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {grievance.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span>Category: {grievance.category}</span>
                      <span>Priority: {grievance.priority}</span>
                      <span>
                        Submitted by {grievance.submittedBy.name} on{' '}
                        {new Date(grievance.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 w-full">
                    <select
                      value={grievance.status}
                      onChange={(e) => handleStatusUpdate(grievance._id, e.target.value)}
                      className="w-full md:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    {/* Department assignment dropdown */}
                    <select
                      value={grievance.department?._id || ''}
                      onChange={e => handleAssignDepartment(grievance._id, e.target.value)}
                      className="w-full md:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Assign to department...</option>
                      {departments.map(dept => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => handleAddComment(grievance._id)}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add Comment
                    </button>
                  </div>

                  {grievance.comments.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {grievance.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-900">{comment.text}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            By {comment.user.name} on{' '}
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={filters.page === 1}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-700">
            Page {filters.page} of {totalPages}
          </span>
          <button
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={filters.page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Grievances; 