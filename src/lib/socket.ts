// src/lib/socket.js or src/utils/socket.js
import { io } from "socket.io-client";

const socket = io("https://venstyler-backend.onrender.com", {
  withCredentials: true,
});

export default socket;
