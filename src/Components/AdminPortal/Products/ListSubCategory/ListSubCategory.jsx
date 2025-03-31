import React, { useEffect, useState } from "react";
import AdminNavBar from "../../AdminNavBar/AdminNavBar";
import Footer from "../../../Footer/Footer";
import { deleteSubCategory } from "../ProductService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ListSubCategory.css"; // Updated CSS file
import api from "../../../Reducers/AxiosConfig";

const ListSubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubCategories();
  }, []);

  // Fetch subcategories from API
  const fetchSubCategories = async () => {
    try {
      const response = await api.get("/subcategories");
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handle Delete SubCategory
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await deleteSubCategory(id);
        setSubCategories(subCategories.filter((subCategory) => subCategory.id !== id)); // Remove from UI
        toast.success("SubCategory deleted successfully!");
      } catch (error) {
        toast.error("Error deleting subcategory.");
      }
    }
  };

  return (
    <div>
      <AdminNavBar />

      <div className="subcategory-list-container">
        <h2 className="subcategory-list-title">Sub-Category List</h2>

        <div className="subcategory-table-wrapper">
          <table className="subcategory-list-table">
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
                  <td className="subcategory-actions">
                    <button
                      className="subcategory-update-btn"
                      onClick={() => navigate(`/update-subcategory/${subCategory.id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="subcategory-delete-btn"
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
      </div>

      <Footer />
    </div>
  );
};

export default ListSubCategory;
