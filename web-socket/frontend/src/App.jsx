// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import WhatsAppChat from './components/Chat'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <WhatsAppChat/>
//     </>
//   )
// }

// export default App
import { useState, useEffect } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { socket } from "./socket/socket";
import Login from "./components/Login";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Restore user from localStorage
    const savedUser = localStorage.getItem("whatsapp-user");
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsLoggedIn(true);
      socket.emit("register", savedUser);
    }
  }, []);

  const handleLogin = (username) => {
    if (username.trim()) {
      setCurrentUser(username);
      setIsLoggedIn(true);
      localStorage.setItem("whatsapp-user", username);
      socket.emit("register", username);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    localStorage.removeItem("whatsapp-user");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentUser={currentUser} onLogout={handleLogout} />
      <Chat currentUser={currentUser} />
    </div>
  );
}


export default App;