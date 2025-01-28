// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Successfully received response
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        `Error: ${error.response.status} - ${error.response.data.message}`
      );

      // Example: Redirect to login on 401 Unauthorized
      if (error.response.status === 401) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login"; // Redirect to login page
      }

      // Example: Show a custom error message
      if (error.response.status === 404) {
        alert("Requested resource not found.");
      }
    } else if (error.request) {
      // No response was received from the server
      console.error("No response received:", error.request);
      alert("Network error. Please try again later.");
    } else {
      // Other errors (e.g., setup issues)
      console.error("Error setting up the request:", error.message);
      alert("Something went wrong. Please try again.");
    }

    // Always reject the error so the calling code can handle it
    return Promise.reject(error);
  }
);

export default axiosInstance;
