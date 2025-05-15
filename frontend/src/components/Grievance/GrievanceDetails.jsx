import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Download,
  MessageSquare,
} from "lucide-react";

const GrievanceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchGrievanceDetails();
  }, [id]);

  const fetchGrievanceDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/grievances/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGrievance(data.data);
        setComments(data.data.comments || []);
      } else {
        setError("Failed to fetch grievance details");
      }
    } catch (err) {
      setError("An error occurred while fetching grievance details");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/grievances/${id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: comment }),
        }
      );

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setComment("");
      } else {
        setError("Failed to add comment");
      }
    } catch (err) {
      setError("An error occurred while adding the comment");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "in_progress":
        return <FileText className="h-5 w-5" />;
      case "resolved":
        return <CheckCircle className="h-5 w-5" />;
      case "rejected":
        return <XCircle className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!grievance) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-600">Grievance not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-zinc-900">
                  {grievance.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Submitted on{" "}
                  {new Date(grievance.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  grievance.status
                )}`}
              >
                {getStatusIcon(grievance.status)}
                <span className="ml-1">
                  {grievance.status.replace("_", " ")}
                </span>
              </span>
            </div>

            <div className="mt-6 border-t border-zinc-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-zinc-500">
                    Category
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900">
                    {grievance.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500">
                    Priority
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900">
                    {grievance.priority}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-6 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-zinc-500">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900">
                    {grievance.description}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500">
                    Grievance ID
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900">
                    {grievance.grievanceNumber}
                  </dd>
                </div>
              </dl>
            </div>

            {grievance.attachments && grievance.attachments.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-zinc-900">
                  Attachments
                </h4>
                <ul className="mt-2 divide-y divide-zinc-200">
                  {grievance.attachments.map((file, index) => (
                    <li
                      key={index}
                      className="py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={file}
                          alt="attachment"
                          className="h-32 w-auto rounded shadow border border-zinc-200 mr-4"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDetails;
