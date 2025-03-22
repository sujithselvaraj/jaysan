import api from "../Reducers/AxiosConfig";


export const getAllCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data; // Returns list of CategoryResponse objects
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data; // Returns a single CategoryResponse object
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return null;
  }
};


export const getSubCategoryById = async (id) => {
  try {
    const response = await api.get(`/subcategories/${id}`);
    return response.data; // Returns SubCategoryResponse object
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
};