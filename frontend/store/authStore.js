import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/" : "/";
export const useAuth = create((set, get) => ({
  authUser: null,
  userEmail: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res);
      set({
        authUser: res.data?.user || res.data,
        userEmail: res.data.user.email,
      });
      get().connectToSocket();
    } catch (e) {
      console.log("error in the check auth function in zustand ", e);
      set({ authUser: null, userEmail: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // signUp function
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data, userEmail: res.data.email });
      get().connectToSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data, userEmail: res.data.email });
      toast.success("logged in successfully");
      get().connectToSocket();
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, userEmail: null });
      get().disconnectSocket();
    } catch (error) {
      console.log("error in log out function ", error);
      toast.error(error?.response?.data?.message);
    }
  },
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data?.user || res.data });
      toast.success("profile update successfully");
    } catch (err) {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  },
  connectToSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    console.log(get().socket);
    const socket = io(BASE_URL, { withCredentials: true });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect;
  },
}));
