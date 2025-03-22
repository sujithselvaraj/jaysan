import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListCategory.css";
import { getAllCategories } from "./CategoryService";
import AdminNavBar from "../../AdminNavBar/AdminNavBar";
import Footer from "../../../Footer/Footer";
import { deleteCategory } from "../ProductService";
import { toast } from 'react-toastify';
import { CategoryProvider } from "../../ContextApi/CategoryContext";
const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleUpdate = (id) => {
    navigate(`/update-category/${id}`); // Redirect to AddProduct with category ID
  };

   const handleDelete = async (id) => {
     if (window.confirm("Are you sure you want to delete this subcategory?")) {
       try {
         await deleteCategory(id);
         setCategories((prevCategories) =>
           prevCategories.filter((category) => category.id !== id)
         );
       } catch (error) {
         toast.error("Error deleting Category.");
       }
     }
   };

  return (
    <>
      <div className="category-container">
        <CategoryProvider>
        <AdminNavBar />
        </CategoryProvider>
        
        <h2>Category List</h2>
        <table className="category-table">
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.categoryName}</td>
                <td>
                  <button className="update-btn" onClick={() => handleUpdate(category.id)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(category.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default ListCategory;
