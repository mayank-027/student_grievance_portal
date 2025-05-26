import { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
import { Send, Loader2, MessageCircle, X } from 'lucide-react';

const AdminChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Read user and token once at the top
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const token = sessionStorage.getItem('token');

  // Add a ref to track if history has been loaded
  const historyLoaded = useRef(false);

  console.log('AdminChatbot - User from sessionStorage (top):', user); // Added log
  console.log('AdminChatbot - Token from sessionStorage (top):', token); // Added log

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch chat history when the chatbot is opened
  useEffect(() => {
    console.log('useEffect [isOpen] triggered.'); // Log effect trigger
    console.log('useEffect - isOpen:', isOpen);
    console.log('useEffect - historyLoaded.current:', historyLoaded.current);

    // Fetch history only if open and not already loaded
    if (isOpen && !historyLoaded.current) {
      const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      const currentToken = sessionStorage.getItem('token');

      console.log('useEffect (inside isOpen) - currentUser:', currentUser); // Log user inside effect
      console.log('useEffect (inside isOpen) - currentToken:', currentToken); // Log token inside effect

      if (currentUser && currentUser._id && currentToken) {
        console.log('Fetching chat history for user:', currentUser._id); // Log with user ID
        const fetchChatHistory = async () => {
          try {
            const url = `http://localhost:8080/api/chat/log/${currentUser._id}`;
            console.log('Fetching from URL:', url); // Log the URL
            const response = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${currentToken}`,
              },
            });

            console.log('Response status for chat history:', response.status); // Log response status

            if (response.ok) {
              const data = await response.json();
              console.log('Fetched chat data:', data); // Log fetched data
              // Format the fetched data to match the messages state structure
              const formattedMessages = data.data.flatMap(log => [
                { text: log.message, sender: 'user' },
                { text: log.reply, sender: 'bot' }
              ]);
              setMessages(formattedMessages);
              historyLoaded.current = true; // Mark history as loaded
            } else {
              console.error('Error fetching chat history:', response.status, response.text);
               // Optionally set an error message in the UI
            }
          } catch (error) {
            console.error('Error fetching chat history:', error); // Log fetch errors
             // Optionally set an error message in the UI
          }
        };

        fetchChatHistory();
      } else {
         console.log('Chatbot is open but user ID or token is not available after reading from storage in effect.');
         // Optionally clear messages or show a message to the user if user/token are truly missing
         // setMessages([]); 
      }
    }
  }, [isOpen]); // Depend only on isOpen

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    // Use the user and token from the component's scope
    if (!user || !user._id || !token) {
        console.error('Cannot send message: User ID or token not available.');
        setMessages(prev => [...prev, { 
            text: "Error: Your session data is missing. Please try logging in again.", 
            sender: 'bot' 
        }]);
        setIsLoading(false);
        return;
    }

    try {
      // Send message to admin chatbot backend
      const chatResponse = await fetch('http://localhost:5001/admin_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user._id,
          token: token, // Use token from component scope
          message: userMessage,
        }),
      });

      const chatData = await chatResponse.json();
      const botReply = chatData.reply;
      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);

      // Save chat log to the backend
      // This is now handled by the Python chatbot after it gets the reply
      // const log_data = {
      //     "user_id": user._id,
      //     "message": userMessage,
      //     "reply": botReply
      // };
      // await fetch('http://localhost:8080/api/chat/log', {
      //     method: 'POST
      //     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      //     body: JSON.stringify(log_data)
      // });
      // console.log("Chat log sent to backend for saving.");

    } catch (error) {
      console.error('Error during chat interaction:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble processing your request. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
            <h2 className="text-xl font-semibold">Admin Assistant</h2>
            <p className="text-sm text-purple-100">Ask me about grievances, statistics, or any admin tasks</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-800 shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 shadow-md">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminChatbot; 