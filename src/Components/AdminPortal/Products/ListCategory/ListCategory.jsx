import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListCategory.css";
import { getAllCategories } from "./CategoryService";
import AdminNavBar from "../../AdminNavBar/AdminNavBar";
import Footer from "../../../Footer/Footer";
import { deleteCategory } from "../ProductService";
import { toast } from "react-toastify";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-category/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
        toast.success("Category deleted successfully.");
      } catch (error) {
        toast.error("Error deleting category.");
      }
    }
  };

  return (
    <>
      <div className="list-category-container">
        <AdminNavBar />
        <h2>Category List</h2>
        <table className="list-category-table">
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
                <td className="list-category-actions">
                  <button className="list-category-update-btn" onClick={() => handleUpdate(category.id)}>
                    Update
                  </button>
                  <button className="list-category-delete-btn" onClick={() => handleDelete(category.id)}>
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
