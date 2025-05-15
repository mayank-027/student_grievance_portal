import { MaximizeIcon, MessageSquare, MinimizeIcon, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ChatBot from "../../pages/Chatbot";

const SlidingChat = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const chatbotRef = useRef(null);

  // Handle clicking outside chatbot to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target) &&
        !event.target.closest("button[data-chatbot-toggle]")
      ) {
        setShowChatbot(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setMinimized(!minimized);
  };
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    setMinimized(false); // Reset minimized state when toggling
  };
  return (
    <div>
      {/* Enhanced Floating Chatbot */}
      {showChatbot && (
        <div
          ref={chatbotRef}
          className={`fixed z-50 transition-all duration-300 ease-in-out shadow-2xl ${
            minimized
              ? "bottom-4 right-4 w-64 h-12 rounded-full"
              : "right-0 bottom-0 sm:bottom-4 sm:right-4 w-full sm:w-96 h-full sm:h-[500px] max-h-[100vh] rounded-2xl"
          }`}
        >
          {/* Chatbot Header */}
          <div
            className={`bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-between px-4 py-3 ${
              minimized ? "rounded-full" : "rounded-t-2xl"
            }`}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-white mr-2" />
              <span className="font-medium text-white">Student Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label={minimized ? "Maximize" : "Minimize"}
              >
                {minimized ? (
                  <MaximizeIcon className="h-4 w-4" />
                ) : (
                  <MinimizeIcon className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chatbot Body */}
          {!minimized && (
            <div className="bg-white h-[calc(100%-56px)] rounded-b-2xl flex flex-col">
              <div className="flex-1 p-4 overflow-auto">
                {/* Chat messages would go here */}
                <ChatBot />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Chatbot Trigger Button (visible when chatbot is closed) */}
      {!showChatbot && (
        <button
          onClick={toggleChatbot}
          data-chatbot-toggle
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SlidingChat;
