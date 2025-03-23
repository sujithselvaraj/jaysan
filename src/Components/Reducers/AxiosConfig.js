import axios from "axios";

<<<<<<< HEAD
// Log API URL for debugging
=======
>>>>>>> 4432f38 (Add About US page)
console.log("API URL:", process.env.REACT_APP_API_URL);

// Create an Axios instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
<<<<<<< HEAD
    "Accept": "application/json", // Content-Type will be automatically handled by Axios for FormData
  }
});

export default api;
=======
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});


export default api;
>>>>>>> 4432f38 (Add About US page)
