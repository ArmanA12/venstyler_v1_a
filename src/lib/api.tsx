// src/lib/api.ts
import axios from "axios";

// Works in Vite
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://venstyler-backend.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
