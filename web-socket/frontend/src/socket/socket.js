// import { io } from "socket.io-client";
// export const socket = io("http://localhost:5000");

import { io } from "socket.io-client";

// Create socket connection
const SOCKET_URL = "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});


// Socket event handlers
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
