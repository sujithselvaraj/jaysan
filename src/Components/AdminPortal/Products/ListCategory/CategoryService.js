import api from "../../../Reducers/AxiosConfig";


export const getAllCategories = async () => {
    try {
      const response = await api.get("/categories");
      return response.data; // Returns list of CategoryResponse objects
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  
    
  };