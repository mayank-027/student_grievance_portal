import { ChevronRight, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full">
      {/* Footer - Redesigned with responsive layout */}
      <footer className="bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-300 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid layout with better responsive behavior */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company info section */}
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center mb-6">
                <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  StudentVoice
                </span>
              </div>
              <p className="mb-6 text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
                Empowering students to voice concerns and get timely resolutions
                from educational institutions. Our platform bridges the
                communication gap between students and administration.
              </p>
              <div className="flex space-x-4 mb-8 sm:mb-0">
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:scale-110 transform"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/about-us"
                    className="text-zinc-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-zinc-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">How It Works</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/success-stories"
                    className="text-zinc-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">Success Stories</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="text-zinc-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">Partner Institutions</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources"
                    className="text-zinc-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">Resources</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-6 text-white">
                Contact Us
              </h3>
              <div className="space-y-4">
                <p className="text-zinc-400 text-sm sm:text-base">
                  Have questions or need assistance?
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:support@studentvoice.edu"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                  >
                    <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">support@studentvoice.edu</span>
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                  >
                    <Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">+1 (234) 567-890</span>
                  </a>
                  <div className="text-purple-400 flex items-start group">
                    <MapPin className="h-4 w-4 mr-2 mt-1 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">
                      123 Education Street<br />
                      University City, ST 12345
                    </span>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-zinc-400 text-sm sm:text-base mb-3">
                    Download our app:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-zinc-800/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all duration-200 hover:shadow-lg flex items-center justify-center sm:justify-start group">
                      <svg
                        className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.5575 12.0637C17.5883 14.2411 19.4913 15.2344 19.5221 15.2498C19.4989 15.3269 19.1373 16.4615 18.3244 17.6423C17.6342 18.6356 16.9132 19.6212 15.7883 19.6443C14.6943 19.6673 14.3095 18.9925 13.0461 18.9925C11.7826 18.9925 11.3594 19.6212 10.3353 19.6673C9.25648 19.7134 8.40427 18.5942 7.70328 17.6115C6.27189 15.6095 5.17636 11.8485 6.64703 9.35242C7.37721 8.12009 8.65986 7.34524 10.0528 7.32219C11.1006 7.29914 12.0863 8.05089 12.7227 8.05089C13.3591 8.05089 14.5609 7.13675 15.8166 7.29914C16.3992 7.32219 17.4947 7.52686 18.1926 8.39062C18.1232 8.43672 16.7302 9.19771 16.7456 11.0536C16.7302 11.0844 17.5267 11.1074 17.5575 12.0637ZM15.0904 5.6C15.6807 4.88295 16.0731 3.89889 15.9651 2.9C15.1137 2.93686 14.0566 3.44615 13.4355 4.14714C12.8837 4.76423 12.4066 5.77983 12.5301 6.74999C13.4817 6.82751 14.4981 6.31746 15.0904 5.6Z" />
                      </svg>
                      iOS App
                    </button>
                    <button className="bg-zinc-800/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all duration-200 hover:shadow-lg flex items-center justify-center sm:justify-start group">
                      <svg
                        className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3.57164 20.4325C3.38653 20.1274 3.24061 19.8032 3.13388 19.4599C2.89144 18.6301 2.77 17.7704 2.77 16.8908V7.10922C2.77 6.22962 2.89144 5.36993 3.13388 4.54005C3.24061 4.19681 3.38653 3.87259 3.57164 3.56749C3.93409 2.98526 4.46409 2.52212 5.09409 2.23614C5.72409 1.95017 6.43164 1.85255 7.12 1.95017C7.80836 2.04779 8.45756 2.33376 9.00676 2.78778L12 5.07993L14.9932 2.78778C15.5424 2.33376 16.1916 2.04779 16.88 1.95017C17.5684 1.85255 18.2759 1.95017 18.9059 2.23614C19.5359 2.52212 20.0659 2.98526 20.4284 3.56749C20.6135 3.87259 20.7594 4.19681 20.8661 4.54005C21.1086 5.36993 21.23 6.22962 21.23 7.10922V16.8908C21.23 17.7704 21.1086 18.6301 20.8661 19.4599C20.7594 19.8032 20.6135 20.1274 20.4284 20.4325C20.0659 21.0147 19.5359 21.4779 18.9059 21.7639C18.2759 22.0498 17.5684 22.1475 16.88 22.0498C16.1916 21.9522 15.5424 21.6662 14.9932 21.2122L12 18.9201L9.00676 21.2122C8.45756 21.6662 7.80836 21.9522 7.12 22.0498C6.43164 22.1475 5.72409 22.0498 5.09409 21.7639C4.46409 21.4779 3.93409 21.0147 3.57164 20.4325ZM9.00676 18.0405L12 15.7483L14.9932 18.0405C15.2357 18.2358 15.5068 18.3726 15.8068 18.4311C16.1068 18.4897 16.4068 18.4897 16.7068 18.4311C17.0068 18.3726 17.2778 18.2358 17.5203 18.0405C17.7627 17.8452 17.9478 17.591 18.0546 17.3079C18.1613 17.0247 18.2103 16.7221 18.2103 16.4195V7.58148C18.2103 7.27889 18.1613 6.97629 18.0546 6.69314C17.9478 6.40999 17.7627 6.15594 17.5203 5.96069C17.2778 5.76544 17.0068 5.62863 16.7068 5.57009C16.4068 5.51155 16.1068 5.51155 15.8068 5.57009C15.5068 5.62863 15.2357 5.76544 14.9932 5.96069L12 8.25284L9.00676 5.96069C8.76432 5.76544 8.49327 5.62863 8.19327 5.57009C7.89327 5.51155 7.59327 5.51155 7.29327 5.57009C6.99327 5.62863 6.72223 5.76544 6.47979 5.96069C6.23735 6.15594 6.05223 6.40999 5.94549 6.69314C5.83875 6.97629 5.78971 7.27889 5.78971 7.58148V16.4195C5.78971 16.7221 5.83875 17.0247 5.94549 17.3079C6.05223 17.591 6.23735 17.8452 6.47979 18.0405C6.72223 18.2358 6.99327 18.3726 7.29327 18.4311C7.59327 18.4897 7.89327 18.4897 8.19327 18.4311C8.49327 18.3726 8.76432 18.2358 9.00676 18.0405Z" />
                      </svg>
                      Android App
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright section */}
          <div className="border-t border-zinc-800/50 mt-12 pt-8 text-center">
            <p className="text-zinc-500 text-sm">
              &copy; {new Date().getFullYear()} StudentVoice. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
