import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  import.meta.env.MODE == "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
  maxContentLength: 2000 * 1024, // Set the maximum content length (in bytes)
  maxBodyLength: 2000 * 1024, // Set the maximum body length (in bytes)
});
