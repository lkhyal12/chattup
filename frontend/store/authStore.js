import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";
import toast from "react-hot-toast";
export const useAuth = create((set) => ({
  authUser: null,
  userEmail: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({
        authUser: res.data?.user || res.data,
        userEmail: res.data.user.email,
      });
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
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data?.user || res.data });
      toast.success("profile update successfully");
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  },
}));
