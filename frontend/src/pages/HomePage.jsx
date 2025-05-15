import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Chatbot from "../pages/Chatbot";
import {
  MessageSquare,
  Shield,
  BarChart,
  CheckCircle,
  ChevronRight,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [trendingKeywords, setTrendingKeywords] = useState([]);
  const chatbotRef = useRef(null);

  useEffect(() => {
    const fetchTrendingKeywords = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5002/trending-keywords');
        const data = await response.json();
        setTrendingKeywords(data.keywords);
      } catch (error) {
        console.error('Error fetching trending keywords:', error);
      }
    };

    fetchTrendingKeywords();
  }, []);

  const handleRegisterGrievance = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/submit-grievance");
    } else {
      navigate("/login", { state: { from: "/submit-grievance" } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Hero Section - Redesigned with asymmetric layout */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-900 text-white py-16 md:py-24">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-700 opacity-20 transform rotate-12 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-fuchsia-700 opacity-20 transform -rotate-12 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 lg:pl-5">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                Empowering Student Voices
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Your Concerns <span className="text-fuchsia-300">Matter</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100 max-w-lg">
                A modern platform for students to voice concerns and receive
                timely, transparent resolutions from educational institutions.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  className="bg-white text-purple-900 px-5 py-3 rounded-full font-medium hover:bg-purple-50 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={handleRegisterGrievance}
                >
                  <span>Register Grievance</span>
                  <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>

                {/* <button
                  data-chatbot-toggle
                  className="bg-yellow-500 text-white px-5 py-3 rounded-full font-medium hover:bg-yellow-600 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={toggleChatbot}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {showChatbot ? "Close Chatbot" : "Chat with Assistant"}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Redesigned with cards */}
      <div id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Platform Benefits
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Why Choose StudentVoice?
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              Our platform reimagines the grievance redressal process with
              modern tools for transparency and accountability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-zinc-100 hover:border-purple-200 transition-all duration-300 hover:shadow-purple-100 hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">
                Secure & Confidential
              </h3>
              <p className="text-zinc-600">
                Your identity is protected with end-to-end encryption. Submit
                grievances without fear of repercussions.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-zinc-100 hover:border-purple-200 transition-all duration-300 hover:shadow-purple-100 hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <BarChart className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">
                Real-time Tracking
              </h3>
              <p className="text-zinc-600">
                Monitor the status of your grievance with detailed timeline and
                notifications at every stage.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-zinc-100 hover:border-purple-200 transition-all duration-300 hover:shadow-purple-100 hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">
                Guaranteed Response
              </h3>
              <p className="text-zinc-600">
                Every grievance receives a response within 24 hours with
                AI-assisted routing to the right department.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Redesigned with timeline */}
      <div id="how-it-works" className="py-16 md:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              A streamlined journey from concern to resolution
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200"></div>

            <div className="space-y-8 md:space-y-0 relative">
              {/* Step 1 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center md:mb-16">
                <div className="md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md inline-block transform transition-transform duration-300 hover:shadow-lg">
                    <h3 className="font-bold text-xl mb-2 text-zinc-900 flex md:flex-row-reverse items-center">
                      <span>Register</span>
                      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white w-8 h-8 rounded-full flex items-center justify-center mx-3 shadow-md">
                        1
                      </div>
                    </h3>
                    <p className="text-zinc-600">
                      Create an account with your institutional email and verify
                      your student status
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center md:mb-16">
                <div className="hidden md:block"></div>
                <div className="mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md inline-block transform transition-transform duration-300 hover:shadow-lg">
                    <h3 className="font-bold text-xl mb-2 text-zinc-900 flex items-center">
                      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white w-8 h-8 rounded-full flex items-center justify-center mx-3 shadow-md">
                        2
                      </div>
                      <span>Submit</span>
                    </h3>
                    <p className="text-zinc-600">
                      File your grievance with our guided form that ensures all
                      relevant details are included
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center md:mb-16">
                <div className="md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md inline-block transform transition-transform duration-300 hover:shadow-lg">
                    <h3 className="font-bold text-xl mb-2 text-zinc-900 flex md:flex-row-reverse items-center">
                      <span>Track</span>
                      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white w-8 h-8 rounded-full flex items-center justify-center mx-3 shadow-md">
                        3
                      </div>
                    </h3>
                    <p className="text-zinc-600">
                      Monitor progress with real-time updates and communicate
                      directly with handlers
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>

              {/* Step 4 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="hidden md:block"></div>
                <div>
                  <div className="bg-white p-6 rounded-2xl shadow-md inline-block transform transition-transform duration-300 hover:shadow-lg">
                    <h3 className="font-bold text-xl mb-2 text-zinc-900 flex items-center">
                      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white w-8 h-8 rounded-full flex items-center justify-center mx-3 shadow-md">
                        4
                      </div>
                      <span>Resolve</span>
                    </h3>
                    <p className="text-zinc-600">
                      Get resolution confirmation and provide feedback to
                      improve the system
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics - Redesigned with gradient cards */}
      <div className="py-16 md:py-24 bg-gradient-to-br from-purple-900 to-fuchsia-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Our Impact
            </span>
            <h2 className="text-3xl font-bold mb-4">Making a Difference</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Together we're creating positive change in educational
              institutions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  80%
                </span>
              </div>
              <p className="opacity-80">Resolution Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center">
                <Clock className="h-6 w-6 mr-2 text-fuchsia-300" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  24h
                </span>
              </div>
              <p className="opacity-80">Average Response Time</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  1000+
                </span>
              </div>
              <p className="opacity-80">Students Helped</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center">
                <Award className="h-6 w-6 mr-2 text-fuchsia-300" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  9+
                </span>
              </div>
              <p className="opacity-80">Partner Institutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Topics Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Current Trends
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Hot Topics</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              See what issues are currently trending among students
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {trendingKeywords.map((keyword, index) => (
              <div
                key={index}
                className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 transition-all duration-300 transform hover:-translate-y-1 cursor-default"
              >
                <TrendingUp className="inline-block w-4 h-4 mr-2" />
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials - Redesigned with modern cards */}
      <div id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Student Testimonials
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              Hear from students who have successfully resolved their grievances
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-zinc-100 relative transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -top-5 left-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-zinc-600 mb-6 mt-4">
                "The platform made it easy to communicate my concerns about
                inadequate lab equipment. The administration responded within 24
                hours and the issue was resolved within a week."
              </p>
              <div className="flex items-center pt-4 border-t border-zinc-100">
                <div className="bg-purple-100 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  PS
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Paras Sundriyal</h4>
                  <p className="text-zinc-500 text-sm">Engineering Student</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-zinc-100 relative transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -top-5 left-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-zinc-600 mb-6 mt-4">
                "I was facing issues with my scholarship disbursement. Thanks to
                StudentVoice, I could directly escalate the matter to the right
                department and got it sorted out quickly."
              </p>
              <div className="flex items-center pt-4 border-t border-zinc-100">
                <div className="bg-purple-100 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  AD
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Ayush Diwedi</h4>
                  <p className="text-zinc-500 text-sm">Arts Student</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-zinc-100 relative transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -top-5 left-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-zinc-600 mb-6 mt-4">
                "The transparency in the process gave me confidence. I could see
                exactly who was handling my complaint about library access hours
                and when to expect a resolution."
              </p>
              <div className="flex items-center pt-4 border-t border-zinc-100">
                <div className="bg-purple-100 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  AM
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Ahmed Mirza</h4>
                  <p className="text-zinc-500 text-sm">Science Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - Redesigned with accordion-style */}
      <div id="faq" className="py-16 md:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Common Questions
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              Get answers to common queries about our grievance redressal system
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-zinc-900 flex items-center">
                <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </div>
                Who can register a grievance?
              </h3>
              <div className="pl-11">
                <p className="text-zinc-600">
                  Any enrolled student with a valid institutional email address
                  can register and submit a grievance. We verify your student
                  status through your institution's database.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-zinc-900 flex items-center">
                <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </div>
                What kinds of issues can I report?
              </h3>
              <div className="pl-11">
                <p className="text-zinc-600">
                  You can report issues related to academic matters, facilities,
                  discrimination, harassment, financial concerns, or
                  administrative procedures. Our AI-powered system helps
                  categorize and route your concern to the right department.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-zinc-900 flex items-center">
                <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </div>
                How is my privacy protected?
              </h3>
              <div className="pl-11">
                <p className="text-zinc-600">
                  Your personal information is encrypted and your identity can
                  be kept confidential if requested. We use enterprise-grade
                  security protocols and only authorized personnel can access
                  your details.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-zinc-900 flex items-center">
                <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </div>
                What happens after I submit a grievance?
              </h3>
              <div className="pl-11">
                <p className="text-zinc-600">
                  You'll receive an immediate acknowledgment. Your complaint
                  will be assigned to the relevant department head, who must
                  respond within 24 hours with initial feedback. You can track
                  every step of the process in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Redesigned with gradient background */}
      <div className="py-20 bg-gradient-to-br from-purple-900 to-fuchsia-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-700 opacity-20 transform rotate-12 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-fuchsia-700 opacity-20 transform -rotate-12 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
            Get Started Today
          </span>
          <h2 className="text-4xl font-bold mb-4">Ready to Be Heard?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students who have found their voice and resolved
            their issues through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              className="bg-white text-purple-900 px-8 py-4 rounded-full font-medium hover:bg-purple-50 transition group"
              onClick={handleRegisterGrievance}
            >
              Register Now
              <ChevronRight className="inline-block ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <button className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition">
              Watch Demo
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
