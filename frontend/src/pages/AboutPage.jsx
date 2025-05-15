import React from "react";

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-12 text-center">
          <h1 className="text-3xl font-bold text-white">About Our Student Grievance System</h1>
          <p className="mt-2 text-blue-100">
            Empowering students with a voice to improve campus life
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              The Student Grievance System is designed to provide a transparent, efficient, and fair process for addressing 
              student concerns across all aspects of college life. We believe that every student deserves to be heard, 
              and that constructive feedback is essential for continuous improvement of the educational experience.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg text-center text-gray-800 mb-2">Trust & Safety</h3>
                <p className="text-gray-600 text-sm text-center">
                  Creating a secure platform where students can share concerns without fear of retaliation.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg text-center text-gray-800 mb-2">Swift Resolution</h3>
                <p className="text-gray-600 text-sm text-center">
                  Streamlining the process to address student concerns promptly and effectively.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg text-center text-gray-800 mb-2">Community Improvement</h3>
                <p className="text-gray-600 text-sm text-center">
                  Using feedback to enhance campus services and the overall student experience.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">1</div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg text-gray-800">Submit Your Grievance</h3>
                  <p className="text-gray-600">
                    Use our chatbot or web form to provide details about your concern. You can attach supporting evidence like images if needed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">2</div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg text-gray-800">Categorization & Assignment</h3>
                  <p className="text-gray-600">
                    Your grievance is automatically categorized and assigned to the relevant department for review.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">3</div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg text-gray-800">Review & Resolution</h3>
                  <p className="text-gray-600">
                    Department staff investigate your concern and take appropriate action to resolve the issue.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">4</div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg text-gray-800">Feedback & Closure</h3>
                  <p className="text-gray-600">
                    You'll receive updates throughout the process and can provide feedback on the resolution.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories We Handle</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Academic</span>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Administrative</span>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Infrastructure</span>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Hostel</span>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Faculty</span>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Library</span>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Transportation</span>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Cafeteria</span>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <span className="text-blue-600 font-medium">Other</span>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
            <p className="text-gray-600 mb-6">
              We are committed to:
            </p>
            <ul className="list-disc pl-5 mb-8 text-gray-600 space-y-2">
              <li>Reviewing all grievances within 2 business days</li>
              <li>Providing regular status updates</li>
              <li>Maintaining confidentiality of sensitive information</li>
              <li>Addressing concerns without bias or prejudice</li>
              <li>Using feedback to improve institutional policies and procedures</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-xl text-gray-800 mb-3">Have a Grievance?</h3>
              <p className="text-gray-600 mb-4">
                Use our chatbot to submit your grievance or check the status of an existing one. Our system is designed to make the process as smooth and efficient as possible.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                Submit a Grievance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;