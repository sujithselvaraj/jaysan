import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import api from '../Reducers/AxiosConfig';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blog/${id}`)
      .then((response) => setBlog(response.data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);
  

  if (!blog) {
    return (
      <>
        <NavBar />
        <div className="blog-details-container">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="blog-details-container">
      {blog.blogImageUrl && (
          <img
            src={blog.blogImageUrl}
            alt={blog.blogTitle}
            className="blog-details-image"
          />
        )}
        <h2 className="blog-details-title">{blog.blogTitle}</h2>
       
        <p 
  className="blog-details-content" 
  dangerouslySetInnerHTML={{ __html: blog.blogContent.replace(/\n/g, "<br/>") }} 
></p>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
