import axios from "axios";

// Log API URL for debugging
console.log("API URL:", process.env.REACT_APP_API_URL);

// Create an Axios instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    "Accept": "application/json", // Content-Type will be automatically handled by Axios for FormData
  }
});

export default api;
