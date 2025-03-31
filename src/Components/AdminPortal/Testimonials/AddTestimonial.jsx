import { useState, useEffect } from "react";
import "./AddTestimonial.css";
import api from "../../Reducers/AxiosConfig";

const AddTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    customerLocation: "",
    productName: "",
    customerReview: "",
    imageFile: null,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    api.get("/testimonial")
      .then((response) => setTestimonials(response.data))
      .catch((error) => console.error("Error fetching testimonials:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = editId ? `/testimonial/${editId}` : "/testimonial";
    const method = editId ? "put" : "post";
  
    const data = new FormData();
  
    // Backend expects "testimonialRequest" as key for JSON data
    const testimonialRequestJson = {
      customerName: formData.customerName,
      customerLocation: formData.customerLocation,
      productName: formData.productName,
      customerReview: formData.customerReview,
    };
  
    data.append("testimonialRequest", new Blob([JSON.stringify(testimonialRequestJson)], { type: "application/json" }));
  
    // Append image file only if selected
    if (formData.imageFile) {
      data.append("imageFile", formData.imageFile);
    }
  
    try {
      const response = await api({
        url,
        method,
        data,
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        setFormData({
          customerName: "",
          customerLocation: "",
          productName: "",
          customerReview: "",
          imageFile: null,
        });
        setEditId(null);
        fetchTestimonials(); // Refresh list
      } else {
        alert("Failed to save testimonial.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
  
    try {
      const response = await api.delete(`/testimonial/${id}`);
  
      if (response.status === 200) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } else {
        alert("Failed to delete testimonial.");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };
  
  const handleEdit = (testimonial) => {
    setFormData({
      customerName: testimonial.customerName,
      customerLocation: testimonial.customerLocation,
      productName: testimonial.productName,
      customerReview: testimonial.customerReview,
      imageFile: null,
    });
    setEditId(testimonial.id);
  };

  return (
    <div className="add-testimonial-container">
      <h2>{editId ? "Edit Testimonial" : "Add Testimonial"}</h2>
    
      <form onSubmit={handleSubmit} className="testimonial-form">
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="customerLocation"
          placeholder="Customer Location"
          value={formData.customerLocation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <textarea
          name="customerReview"
          placeholder="Customer Review"
          value={formData.customerReview}
          onChange={handleChange}
          required
        />
        <input type="file" name="imageFile" onChange={handleFileChange} accept="image/*" />
        <button type="submit">{editId ? "Update" : "Submit"}</button>
      </form>
      

      <h2>Testimonials</h2>
      <table className="testimonial-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Product</th>
            <th>Review</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial.id}>
              <td>{testimonial.customerName}</td>
              <td>{testimonial.customerLocation}</td>
              <td>{testimonial.productName}</td>
              <td>{testimonial.customerReview}</td>
              <td>
                {testimonial.imageUrl && <img src={testimonial.imageUrl} alt="Testimonial" width="50" />}
              </td>
              <td>
                <button onClick={() => handleEdit(testimonial)}>Edit</button>
                <button onClick={() => handleDelete(testimonial.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddTestimonial;
