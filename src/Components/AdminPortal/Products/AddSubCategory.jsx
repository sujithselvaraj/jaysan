import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { getAllCategories, addSubCategory, updateSubCategory, getSubCategoryById } from './ProductService';
import Footer from '../../Footer/Footer';
import AdminNavBar from '../AdminNavBar/AdminNavBar';

import './AddSubCategory.css';

const AddSubCategory = () => {
  const { id } = useParams();
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

  // Handle feature array (Add & Delete)
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

  const handleDeleteFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      features: newFeatures,
    }));
  };

  // Handle specification details (Add, Delete, Modify)
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

  const handleDeleteSpecification = (index) => {
    const newSpecifications = [...formData.specificationDetails];
    newSpecifications.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      specificationDetails: newSpecifications,
    }));
  };

  // Handle submit
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
      
        <AdminNavBar />
    
      
      <br />
      <div className="form-container">
        <h2 className="text-center">{id ? 'Update SubCategory' : 'Add SubCategory'}</h2>
        <div className="card-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>SubCategory Name</label>
              <input type="text" name="subCategoryName" className="input-field" value={formData.subCategoryName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select name="categoryId" className="input-field custom-dropdown" value={formData.categoryId} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.categoryName}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <input type="text" placeholder="Enter new feature"value={feature} onChange={(e) => handleFeatureChange(index, e)} className="input-field" required />
                  <button type="button" className="delete-button" onClick={() => handleDeleteFeature(index)}>✖</button>
                </div>
              ))}
              <button type="button" className="submit-button" onClick={handleAddFeature}>Add Feature</button>
            </div>

            <div className="form-group">
              <label>Specifications</label>
              {formData.specificationDetails.map((spec, index) => (
                <div key={index} className="specification-item">
                  <input type="text" placeholder="Key" value={spec.key} onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)} className="input-field" required />
                  <input type="text" placeholder="Value" value={spec.value} onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)} className="input-field" required />
                  <button type="button" className="delete-button" onClick={() => handleDeleteSpecification(index)}>✖</button>
                </div>
              ))}
              <button type="button" className="submit-button" onClick={handleAddSpecification}>Add Specification</button>
            </div>

            <button type="submit" className="submit-button">{id ? 'Update SubCategory' : 'Add SubCategory'}</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddSubCategory;
