import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get 'id' from URL
import './AddSubCategory.css';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { getAllCategories, addSubCategory, updateSubCategory, getSubCategoryById } from './ProductService';
import Footer from '../../Footer/Footer';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import { CategoryProvider } from '../ContextApi/CategoryContext';

const AddSubCategory = () => {
  const { id } = useParams(); // Get 'id' from URL params
  const [formData, setFormData] = useState({
    subCategoryName: '',
    categoryId: '',
    features: [],
    specificationDetails: [],
    youtubeLink: '',
    imageFile: null,
  });
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Fetch subcategory details if updating
  useEffect(() => {
    if (id) {
      const fetchSubCategory = async () => {
        const data = await getSubCategoryById(id);
        if (data) {
          setFormData({
            subCategoryName: data.subCategoryName,
            categoryId: data.categoryId,
            features: data.features || [],
            youtubeLink: data.youtubeLink,
            specificationDetails: Object.entries(data.specificationDetails || {}).map(([key, value]) => ({ key, value })),
            imageFile: null,
          });
        }
      };
      fetchSubCategory();
    }
  }, [id]);

  // Dropzone setup
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: acceptedFiles[0],
      }));
    },
    accept: 'image/*',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle feature array
  const handleAddFeature = () => {
    setFormData((prevData) => ({
      ...prevData,
      features: [...prevData.features, ''],
    }));
  };

  const handleFeatureChange = (index, event) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      features: newFeatures,
    }));
  };

  // Handle specification details (key-value pairs)
  const handleAddSpecification = () => {
    setFormData((prevData) => ({
      ...prevData,
      specificationDetails: [...prevData.specificationDetails, { key: '', value: '' }],
    }));
  };

  const handleSpecificationChange = (index, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      specificationDetails: prevData.specificationDetails.map((spec, i) =>
        i === index ? { ...spec, [key]: value } : spec
      ),
    }));
  };
  

  // Handle submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const subCategoryRequest = {
      subCategoryName: formData.subCategoryName,
      categoryId: formData.categoryId,
      features: formData.features,
      youtubeLink: formData.youtubeLink,
      specificationDetails: Object.fromEntries(
        formData.specificationDetails.map(({ key, value }) => [key, value])
      ),
    };

    try {
      if (id) {
        await updateSubCategory(id, subCategoryRequest, formData.imageFile);
        toast.success('SubCategory updated successfully!');
      } else {
        await addSubCategory(subCategoryRequest, formData.imageFile);
        toast.success('SubCategory added successfully!');
      }

      // Reset form after submission
      setFormData({
        subCategoryName: '',
        categoryId: '',
        features: [],
        specificationDetails: [],
        youtubeLink: '',
        imageFile: null,
      });
    } catch (error) {
      setError('There was an error processing the request.');
      toast.error('Error processing request!');
    }
  };

  return (
    <div>
        <CategoryProvider>
        <AdminNavBar/>
        </CategoryProvider>
        
      <br />
      <div className="form-container">
        <h2 className="text-center">{id ? 'Update SubCategory' : 'Add SubCategory'}</h2>
        <div className="card-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>SubCategory Name</label>
              <input type="text" name="subCategoryName" className="input-field" value={formData.subCategoryName} onChange={handleChange} required />
            </div>

            {/* Dropdown for Categories */}
            <div className="form-group">
              <label>Category</label>
              <select name="categoryId" className="input-field custom-dropdown" value={formData.categoryId} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.categoryName}</option>
                ))}
              </select>
            </div>

            {/* Features */}
            <div className="form-group">
              <label>Features</label>
              {formData.features.map((feature, index) => (
                <input key={index} type="text" value={feature} onChange={(e) => handleFeatureChange(index, e)} className="input-field" placeholder={`Feature ${index + 1}`} required />
              ))}
              <button type="button" className="submit-button" onClick={handleAddFeature}>Add Feature</button>
            </div>
            <div className="form-group">
              <label>Specifications</label>
              {formData.specificationDetails.map((spec, index) => (
                <div key={index} className="specification-item input">
                  <input type="text" placeholder="Key" value={spec.key} onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)} className="input-field" required />
                  <input type="text" placeholder="Value" value={spec.value} onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)} className="input-field" required />
                </div>
              ))}
              <button type="button" className="submit-button" onClick={handleAddSpecification}>Add Specification</button>
            </div>
            {/* YouTube Link */}
            <div className="form-group">
              <label>YouTube Link</label>
              <input type="url" name="youtubeLink" className="input-field" value={formData.youtubeLink} onChange={handleChange} required />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label>Image</label>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {formData.imageFile ? <p><strong>{formData.imageFile.name}</strong></p> : <p>Drag & drop an image here, or click to select one</p>}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-button">{id ? 'Update SubCategory' : 'Add SubCategory'}</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AddSubCategory;
