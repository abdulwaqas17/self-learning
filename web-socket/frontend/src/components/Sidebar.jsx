import { useState, useEffect } from "react";
import { socket } from "../socket/socket";

const Sidebar = ({ currentUser, onLogout }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      console.log('==================users==================');
      console.log(users);
      console.log('==================users==================');
      // Filter out current user from online users list
      const otherUsers = users.filter(user => user !== currentUser);
      setOnlineUsers(otherUsers);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [currentUser]);

  return (
    <div className="w-1/4 md:w-1/3 lg:w-1/4 bg-white border-r border-gray-300 flex flex-col h-screen">
      {/* Header - Same as before */}
      <div className="p-4 bg-green-600 text-white flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
            <span className="font-semibold">{currentUser.charAt(0).toUpperCase()}</span>
          </div>
          <span className="font-semibold">{currentUser}</span>
        </div>
        <div className="flex space-x-4">
          <button className="hover:bg-green-700 p-2 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          </button>
          <button onClick={onLogout} className="hover:bg-green-700 p-2 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Search - Same as before */}
      <div className="p-3 bg-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full p-3 pl-10 rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-green-500"
          />
          <svg className="absolute left-3 top-3 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>

      {/* CHANGED SECTION: Online Users in Vertical List */}
      <div className="flex-1 overflow-y-auto">
        <div >
          <div className="p-4">
            <h3 className="font-semibold text-gray-600 mb-3 text-lg">Chats</h3>
            
            {/* Online Users List - Vertical Layout */}
            <div className="space-y-1">
              {onlineUsers.length > 0 ? (
                onlineUsers.map((user, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
                    onClick={() => console.log(`Start chat with ${user}`)}
                  >
                    {/* User Avatar with Online Indicator */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                        <span className="font-semibold text-green-800 text-lg">
                          {user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {/* Online Indicator */}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    
                    {/* User Info */}
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-800">{user}</h4>
                        <span className="text-xs text-gray-500">Just now</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">Online • Click to start chatting</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500">No other users online</p>
                  <p className="text-gray-400 text-sm mt-1">Invite friends to join!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* You can add more sections here like Archived Chats, Groups, etc. */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-600 mb-3">Recent</h3>
          <div className="text-center text-gray-500 text-sm py-4">
            Your recent conversations will appear here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;