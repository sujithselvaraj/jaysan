import React, { useState, useEffect } from 'react';
import './AddBlog.css';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import Footer from '../../Footer/Footer';
import api from '../../Reducers/AxiosConfig';

const AddBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

useEffect(() => {
    api.get('/blog')
      .then((response) => {
        const sortedBlogs = Array.isArray(response.data) ? [...response.data].reverse() : [];
        setBlogs(sortedBlogs);
      })
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);
  


 const handleAddBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('blogRequest', new Blob([JSON.stringify({ blogTitle, blogContent })], { type: 'application/json' }));
    if (blogImage) formData.append('blogImage', blogImage);
  
    try {
      const response = await api.post('/blog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.status === 200) {
        alert('Blog added successfully!');
        window.location.reload();
      } else {
        alert('Failed to add blog');
      }
    } catch (error) {
      console.error('Error adding blog:', error);
      alert('Error adding blog');
    }
  };
  

 const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
  
    try {
      const response = await api.delete(`/blog/${id}`);
  
      if (response.status === 200) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        alert('Blog deleted successfully!');
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('blogRequest', new Blob([JSON.stringify({ blogTitle: editingBlog.blogTitle, blogContent: editingBlog.blogContent })], { type: 'application/json' }));
    if (blogImage) formData.append('blogImage', blogImage);
  
    try {
      const response = await api.put(`/blog/${editingBlog.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.status === 200) {
        alert('Blog updated successfully!');
        setEditingBlog(null);
        window.location.reload();
      } else {
        alert('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
    }
  };
  

  return (
    <>
    <AdminNavBar/>
    <div className="admin-blog-container">
        <br/>
        <br/>
      <h2>Manage Blogs</h2>

      {/* Blog Form */}
      <div className="blog-form-container">
        <h3>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h3>
        <form onSubmit={editingBlog ? handleUpdate : handleAddBlog}>
          <input type="text" placeholder="Title" value={editingBlog ? editingBlog.blogTitle : blogTitle} onChange={(e) => editingBlog ? setEditingBlog({ ...editingBlog, blogTitle: e.target.value }) : setBlogTitle(e.target.value)} required />

          <textarea placeholder="Content" value={editingBlog ? editingBlog.blogContent : blogContent} onChange={(e) => editingBlog ? setEditingBlog({ ...editingBlog, blogContent: e.target.value }) : setBlogContent(e.target.value)} required />

          <input type="file" onChange={(e) => setBlogImage(e.target.files[0])} />

          <button type="submit" className="btn-primary">{editingBlog ? 'Update Blog' : 'Add Blog'}</button>
          {editingBlog && <button type="button" className="btn-secondary" onClick={() => setEditingBlog(null)}>Cancel</button>}
        </form>
      </div>

      {/* Blog Cards */}
      <div className="blog-list">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            {blog.blogImageUrl && <img src={blog.blogImageUrl} alt="Blog" className="blog-image" />}
            <h3>{blog.blogTitle}</h3>
            <p>{blog.blogContent.substring(0, 100)}...</p>
            <div className="blog-actions">
              <button className="btn-edit" onClick={() => setEditingBlog(blog)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(blog.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <br/>
    <Footer/>
    </>
  );
};

export default AddBlog;
