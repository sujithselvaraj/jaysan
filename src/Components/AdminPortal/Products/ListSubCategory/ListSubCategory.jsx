import React, { useEffect, useState } from "react";
import AdminNavBar from "../../AdminNavBar/AdminNavBar";
import Footer from "../../../Footer/Footer";
import { getAllSubCategories, deleteSubCategory } from "../ProductService"; // Import delete function
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ListSubCategory.css"; // Add styling
import { CategoryProvider } from "../../ContextApi/CategoryContext";

const ListSubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubCategories();
  }, []);

  // Fetch subcategories from API
  const fetchSubCategories = async () => {
    try {
      const data = await getAllSubCategories();
      setSubCategories(data);
    } catch (error) {
      toast.error("Error fetching subcategories.");
    }
  };

  // Handle Delete SubCategory
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await deleteSubCategory(id);
        setSubCategories((prevSubCategories) =>
          prevSubCategories.filter((subCategory) => subCategory.id !== id)
        );
      } catch (error) {
        toast.error("Error deleting subcategory.");
      }
    }
  };

  return (
    <div>
        <CategoryProvider>
        <AdminNavBar />
        </CategoryProvider>
    
      <div className="subcategory-container">
        <h2>Sub-Category List</h2>
        <table className="subcategory-table">
          <thead>
            <tr>
              <th>SubCategory ID</th>
              <th>SubCategory Name</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory) => (
              <tr key={subCategory.id}>
                <td>{subCategory.id}</td>
                <td>{subCategory.subCategoryName}</td>
                <td>{subCategory.categoryName}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => navigate(`/update-subcategory/${subCategory.id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(subCategory.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ListSubCategory;
