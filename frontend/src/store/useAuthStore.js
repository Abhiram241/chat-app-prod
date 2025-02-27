import { axiosInstance } from "../libs/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL =
  import.meta.env.MODE == "development" ? "http://localhost:5001/api" : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null, //initially , the authenticated user is set to null because we dont know if the use is authenticated or not
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,
  isCheckingAuth: true, //initially this is true because the page must check if the user is authgenticated or not
  // check status for further process
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created Successfully!");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message); // This will display the error message from the backend
        console.log(error.response.data.message); // You can log the error message to see what it is
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get.disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });
      toast.success("Logged in Successfully");
      get().connectSocket();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message); // This will display the error message from the backend
        console.log(error.response.data.message); // You can log the error message to see what it is
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  disconnectSocket: async () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },
}));
