import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";
import toast from "react-hot-toast";
console.log(import.meta.env.MODE);
export const useAuth = create((set) => ({
  authUser: null,
  userEmail: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  checkAuth: async () => {
    console.log("check auth running");
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log({ res });
      set({ authUser: res.data, userEmail: res.data.user.email });
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
      console.log(res);
      set({ authUser: res.data, userEmail: res.data.email });

      toast.success("logged in successfully");
      return true;
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, userEmail: null });
    } catch (error) {
      console.log("error in log out function ", error);
      toast.error(error.response.data.message);
    }
  },
}));
