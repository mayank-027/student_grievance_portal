import { useEffect, useState } from "react";
import { Trash2, HelpCircle } from "lucide-react";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help with your student grievance today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const userId = "student123"; // Example static ID

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/chatlogs", {
          method: "GET", // optional for GET, but included for clarity
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // Transform log into chat messages
        const formattedMessages = data.flatMap((log) => [
          { sender: "user", text: log.message },
          { sender: "bot", text: log.reply },
        ]);

        setMessages(
          formattedMessages.length > 0
            ? formattedMessages
            : [
                {
                  sender: "bot",
                  text: "Hello! How can I help with your student grievance today?",
                },
              ]
        );
      } catch (err) {
        console.error("Error fetching chat logs:", err);
        setMessages([
          {
            sender: "bot",
            text: "Hello! How can I help with your student grievance today?",
          },
        ]);
      }
    };

    fetchChatLogs();
  }, []);

  const handleClearChat = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/chatlogs/reset", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      alert(result.message || "Chat history cleared.");

      setMessages([
        {
          sender: "bot",
          text: "Hello! How can I help with your student grievance today?",
        },
      ]);
    } catch (err) {
      console.error("Error clearing chat:", err);
      alert("Failed to clear chat.");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadPreset = "uttkarsh";
      const cloudName = "dwlezv6pr";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      // Upload image to Cloudinary
      try {
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();

        if (cloudinaryResponse.ok) {
          // Get the image URL from Cloudinary's response
          const imageUrl = cloudinaryData.secure_url;
          console.log("Image URL: " + imageUrl);
          sendMessage(imageUrl, true);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "❌ Image upload failed. Please try again.",
            },
          ]);
        }
      } catch (error) {
        console.error("Image upload error:", error);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "❌ Error uploading image. Please try again.",
          },
        ]);
      }
    }
  };

  const sendMessage = async (inputText, isImage = false) => {
    if (!inputText) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: isImage ? null : inputText,
        image: isImage ? inputText : null,
      },
    ]);
    setInput("");
    setIsTyping(true);

    const token = sessionStorage.getItem("token");
    let res;

    try {
      res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputText.trim(),
          user_id: userId,
          token,
        }),
      });

      const data = await res.json();
      const botReply = data.reply;
      console.log("Bot reply:", botReply);

      // Wait briefly before showing bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isTyping),
          { sender: "bot", text: botReply },
        ]);
        setIsTyping(false);
      }, 800);

      // 🔁 Log user message and bot reply
      await fetch("http://localhost:8080/api/chatlogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: inputText.trim(),
          reply: botReply,
        }),
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        { sender: "bot", text: "❌ Error connecting to the server." },
      ]);
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      sendMessage(voiceText);
    };

    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
    };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with title and clear chat icon */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Student Support</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFAQs(!showFAQs)}
            className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100"
            title="View common questions"
          >
            <HelpCircle size={18} />
          </button>
          <button
            onClick={handleClearChat}
            className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
            title="Clear chat history"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* FAQ Panel */}
      {showFAQs && (
        <div className="bg-gray-50 p-3 border-b border-gray-200 max-h-64 overflow-y-auto">
          <h3 className="font-medium text-gray-700 mb-2">
            Frequently Asked Questions
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => {
                  setInput("How long does it take to resolve a grievance?");
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                How long does it take to resolve a grievance?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput("Who will handle my grievance?");
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                Who will handle my grievance?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput("Can I update my grievance after submitting?");
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                Can I update my grievance after submitting?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput("What types of grievances can I submit?");
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                What types of grievances can I submit?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput("Can I submit an anonymous grievance?");
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                Can I submit an anonymous grievance?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput("How can I check the status of my grievance?");
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                How can I check the status of my grievance?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput(
                    "What happens if my grievance isn't resolved properly?"
                  );
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                What happens if my grievance isn't resolved properly?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput(
                    "Is there a limit on how many grievances I can submit?"
                  );
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                Is there a limit on how many grievances I can submit?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput("What are the priority levels for grievances?");
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                What are the priority levels for grievances?
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setInput(
                    "Will I receive notifications about my grievance status?"
                  );
                  setShowFAQs(false);
                }}
                className="text-blue-600 hover:underline text-left w-full"
              >
                Will I receive notifications about my grievance status?
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-xl max-w-[85%] text-sm break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded"
                  className="rounded-lg mt-1 max-w-xs"
                />
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="p-2 rounded-xl bg-gray-300 text-sm text-gray-800">
              ...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-2 py-2">
        <div className="flex items-center gap-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            className="flex-grow p-2 border rounded-l-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={() => sendMessage(input)}
            className="bg-blue-500 text-white px-3 py-2 rounded-r-full hover:bg-blue-600 text-sm"
          >
            Send
          </button>
          <button
            onClick={handleVoiceInput}
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 text-sm"
            title="Voice Input"
          >
            🎤
          </button>
          <label
            htmlFor="chatbot-image-upload"
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 cursor-pointer text-sm"
            title="Upload Image"
          >
            📷
          </label>
          <input
            id="chatbot-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
