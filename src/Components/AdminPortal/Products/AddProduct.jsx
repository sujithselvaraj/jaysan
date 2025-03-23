import React, { useEffect, useState } from 'react';
import { addProduct, updateCategory, getCategoryById } from './ProductService';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import Footer from '../../Footer/Footer';
import './AddProduct.css';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';



const AddProduct = () => {
  const { id } = useParams(); // Get category ID from URL params
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchCategoryDetails(id);
    }
  }, [id]);

  const fetchCategoryDetails = async (categoryId) => {
    const category = await getCategoryById(categoryId);
    if (category) {
      setCategoryName(category.categoryName);
      setDescription(category.description);
    }
  };

  // Dropzone setup
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImageFile(acceptedFiles[0]);
    },
    accept: 'image/*',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryRequest = {
      categoryName,
      description,
    };

    try {
      if (id) {
        console.log(`Updating category ID: ${id}`, categoryRequest);
        await updateCategory(id, categoryRequest, imageFile);
        toast.success('Category updated successfully!');
      } else {
        const data = await addProduct(categoryRequest, imageFile);
        console.log('Category added successfully:', data);
        toast.success('Category added successfully!');
      }

      setCategoryName('');
      setDescription('');
      setImageFile(null);
      navigate('/list-category'); // Redirect to category list after success
    } catch (error) {
      setError('There was an error processing the request.');
      toast.error('Error processing request!');
    }
  };

  return (
    <div>
      
      <AdminNavBar />
     
    
      <br />
      <div className="form-container">
        <h2 className="text-center">
          {id ? 'Update Category' : 'Add Category'}
        </h2>
        <div className="card-form">
          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                id="categoryName"
                className="input-field"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="input-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="imageFile">Image</label>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {imageFile ? (
                  <div className="file-info">
                    <p><strong>{imageFile.name}</strong></p>
                    <p className="text-muted">File selected</p>
                  </div>
                ) : (
                  <div className="text-muted">Drag & drop an image here, or click to select one</div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              {id ? 'Update Category' : 'Add Category'}
            </button>
          </form>
        </div>
      </div>

      
      <Footer />
    </div>
  );
};

export default AddProduct;
