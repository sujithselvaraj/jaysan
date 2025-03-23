import api from "../Reducers/AxiosConfig";


// Function to submit career application
export const applyForCareer = async (careerData, resumeFile) => {
  try {
    // Convert career data (JSON) to a string
    const careerJson = JSON.stringify(careerData);

    // Create FormData object
    const formData = new FormData();
    formData.append("career", careerJson);
    formData.append("resume", resumeFile);

    // Make POST request to API
    const response = await api.post("/careers/apply", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file upload
      },
    });

    return response.data; // Return response data
  } catch (error) {
    console.error("Error submitting application:", error.response?.data || error.message);
    throw error; // Throw error for handling in the component
  }
};
