import api from "../../Reducers/AxiosConfig";
import { toast } from 'react-toastify';
// Function to add a product with category and image
export const addProduct = async (categoryRequest, imageFile) => {
    const formData = new FormData();
    formData.append('categoryRequest', JSON.stringify(categoryRequest)); // Attach categoryRequest JSON data
    formData.append('imageFile', imageFile); // Attach the image file

    try {
      const response = await api.post('/categories', formData, {
        headers: {
          'Accept': 'application/json', // Accept header is fine
        }
      });
      return response.data; // Return the response data from the backend (CategoryResponse)
    } catch (error) {
      console.error('Error adding product category:', error);
      throw error; // Throw error to be caught in the component
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

  export const updateCategory = async (id, categoryRequest, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("categoryRequest", JSON.stringify(categoryRequest));
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }
  
      const response = await api.put(`/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      return response.data;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
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

export const addSubCategory = async (subCategoryRequest, imageFile) => {
    const formData = new FormData();
    formData.append('request', JSON.stringify(subCategoryRequest));
    formData.append('imageFile', imageFile);
  
    try {
      const response = await api.post('/subcategories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error adding subcategory';
    }
  };

  export const getAllSubCategories = async () => {
    try {
      const response = await api.get("/subcategories");
      return response.data;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  };

  export const updateSubCategory = async (id, subCategoryRequest, imageFile) => {
    const formData = new FormData();
    formData.append('request', JSON.stringify(subCategoryRequest));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
  
    try {
      const response = await api.put(`/subcategories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating subcategory:', error);
      throw error;
    }
  };
  
  export const deleteSubCategory = async (id) => {
    try {
      await api.delete(`/subcategories/${id}`);
      toast.success('SubCategory deleted successfully!');
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      toast.error('Error deleting subcategory!');
    }
  };
  
  export const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      return true; // Return true if deletion is successful
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      throw error;
    }
  };
export const getAllCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data; // Returns list of CategoryResponse objects
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  
};