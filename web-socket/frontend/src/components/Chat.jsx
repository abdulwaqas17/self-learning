// import { useEffect, useState } from "react";
// import { socket } from "../socket/socket";
// export default function Chat() {
//   const [user, setUser] = useState("");
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("oldMessages", (messages) => setMessages(messages));

//     socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));

//     return () => socket.off("receiveMessage");
//   }, []);

//   const sendMessage = () => {
//     if (!text || !user) return;
//     socket.emit("sendMessage", { user, text });

//     setText("");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-gray-100">
//       <input
//         className="w-full p-2 mb-3 border rounded"
//         placeholder="Your name"
//         onChange={(e) => setUser(e.target.value)}
//       />
//       <div className="h-80 overflow-y-scroll p-2 bg-white border rounded mb-3">
//         {messages.map((m, i) => (
//           <p
//             key={i}
//             className={`p-2 my-1 rounded-lg w-fit ${
//               m.user === user ? "bg-green-200 ml-auto" : "bg-gray-200"
//             }`}
//           >
//             <b>{m.user}:</b> {m.text}
//           </p>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           className="flex-1 p-2 border rounded-l"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button
//           className="p-2 bg-blue-500 text-white rounded-r"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { socket } from "../socket/socket";

const Chat = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket listeners
  useEffect(() => {
    socket.emit("getOldMessages");

    socket.on("oldMessages", (oldMessages) => {
      setMessages(oldMessages);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("userTyping", (data) => {
      if (data.user !== currentUser) {
        setTypingUsers((prev) => {
          if (!prev.includes(data.user)) {
            return [...prev, data.user];
          }
          return prev;
        });
      }
    });

    socket.on("userStopTyping", () => {
      setTypingUsers([]);
    });

    return () => {
      socket.off("oldMessages");
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("userStopTyping");
    };
  }, [currentUser]);

  // Handle typing indicator
  const handleTyping = () => {
    console.log('=================handleTyping===================');
    console.log(newMessage);
    console.log('=================handleTyping===================');

    socket.emit("typing", { user: currentUser });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping");
      console.log('===================stopTyping=================');
      console.log(typingTimeoutRef);
    
    }, 1000);

    console.log('==================typingTimeoutRef==================');
    console.log(typingTimeoutRef);
    console.log('==================typingTimeoutRef==================');
  };

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      user: currentUser,
      text: newMessage.trim(),
      timestamp: new Date(),
    };

    socket.emit("sendMessage", messageData);
    setNewMessage("");
    
    // Stop typing indicator
    socket.emit("stopTyping");
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
            <span className="font-semibold text-green-800">G</span>
          </div>
          <div>
            <h2 className="font-semibold">Group Chat</h2>
            <p className="text-sm text-gray-600">
              {typingUsers.length > 0
                ? `${typingUsers.join(", ")} ${typingUsers.length === 1 ? "is" : "are"} typing...`
                : "Online"}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-600 hover:text-green-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((message, index) => {
          const isCurrentUser = message.user === currentUser;
          const showAvatar = index === 0 || messages[index - 1]?.user !== message.user;

          return (
            <div
              key={index}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                {!isCurrentUser && showAvatar && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-200 flex items-center justify-center mt-1 mr-2">
                    <span className="text-xs font-semibold text-green-800">
                      {message.user.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                
                <div className={`${isCurrentUser ? "mr-2" : "ml-2"}`}>
                  {!isCurrentUser && showAvatar && (
                    <span className="text-xs text-gray-600 mb-1 block">{message.user}</span>
                  )}
                  <div
                    className={`p-3 rounded-2xl ${isCurrentUser
                      ? "bg-green-100 text-gray-800 rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className={`text-xs mt-1 ${isCurrentUser ? "text-green-600" : "text-gray-500"} text-right`}>
                      {formatTime(message.timestamp || message.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-300">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-green-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full ${newMessage.trim()
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
            } text-white transition duration-200`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;