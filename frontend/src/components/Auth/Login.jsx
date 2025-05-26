import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 via-white/80 to-indigo-100/80" />
      <div className="absolute inset-0 bg-[url('https://uktech.ac.in/images/UTU-Dehradun-building.jpg')] bg-cover bg-center bg-no-repeat opacity-70" />
      
      {/* Content */}
      <div className="w-full max-w-md px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-10">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your StudentVoice account
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg relative text-center animate-fade-in" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Student ID Input */}
              <div className="relative">
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-200"
                    placeholder="Enter your student ID"
                    value={formData.studentId}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-200"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-4 text-center">
            <div className="text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link 
                to="/signup" 
                className="font-medium text-purple-600 hover:text-purple-700 hover:underline transition-colors duration-200"
              >
                Sign up
              </Link>
            </div>
            <div className="text-sm">
              <Link 
                to="/department/login" 
                className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors duration-200"
              >
                Department Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
