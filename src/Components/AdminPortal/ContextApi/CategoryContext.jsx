import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCategories, getAllSubCategories } from "../Products/ProductService";

export const CategoryContext = createContext(null); // ✅ Provide default value

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoryData = await getAllCategories();
      const subCategoryData = await getAllSubCategories();
      setCategories(categoryData);
      setSubCategories(subCategoryData);
    } catch (error) {
      toast.error("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, subCategories, loading, fetchData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext); // ✅ Export correctly
