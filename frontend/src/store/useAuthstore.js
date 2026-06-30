import { create } from "zustand";
import { axiosInstance } from "../config/config";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =import.meta.env.MODE === "development" ? "http://localhost:8000" :"/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/user/checkAuth");

            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    register: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/user/register", data);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                set({ authUser: res.data.user });
                toast.success("Account created successfully");
                get().connectSocket();
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/user/login", data);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                set({ authUser: res.data.user });
                toast.success("Logged in successfully");
                get().connectSocket();
            } else {
                toast.error(res.data.message || "Login failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get("/user/logout");
            localStorage.removeItem("token");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateProfile: async (formData) => {
        try {
            const res = await axiosInstance.put("/user/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.success) {
                set({ authUser: res.data.user });
                toast.success("Profile picture updated!");
                return { success: true };
            } else {
                toast.error(res.data.message || "Failed to update profile picture");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile picture");
            return { success: false };
        }
    },

    connectSocket: () => {
        // Socket connection logic placeholder
    },

    disconnectSocket: () => {
        // Socket disconnection logic placeholder
    }
}))