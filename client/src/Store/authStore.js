import { create } from "zustand";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACK_URL;

const useAuthStore = create((set) => ({
  user: null, // Store user data
  loginError: "",
  isSubmitting: false,
  isAuthenticated: !!localStorage.getItem("jwtToken"), // Track authentication state
  jwtToken: localStorage.getItem("jwtToken") || null, // Retrieve token from local storage

  setLoginError: (error) => set({ loginError: error }),
  resetLoginError: () => set({ loginError: "" }),

  // Function to log in and store JWT token
  login: async (data) => {
    set({ isSubmitting: true, loginError: "" });
    try {
      const response = await axios.post(
        `${baseURL}/user/login`,
        data
      );
      if (response.status === 200) {
        const { user, token } = response.data; // Assuming your response contains a 'token' field
        // Store user data and authenticated state
        localStorage.setItem("jwtToken", token); // Store JWT token in local storage
        set({ user, isAuthenticated: true, jwtToken: token, loginError: "" });
        return response.data; // Return user data or whatever you need
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 400) {
          set({ loginError: error.response.data.msg });
        } else {
          set({ loginError: "An unexpected error occurred" });
        }
      } else {
        set({ loginError: "Network Error: Try again later" });
      }
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Function to log out and clear JWT token
  logout: () => {
    localStorage.removeItem("jwtToken"); // Clear JWT token from local storage
    set({ user: null, isAuthenticated: false, jwtToken: null }); // Clear user data on logout
  },
}));

export default useAuthStore;
