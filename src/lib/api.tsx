// src/lib/api.ts
import axios from "axios";

// Works in Vite
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
