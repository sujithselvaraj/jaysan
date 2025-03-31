import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import api from '../Reducers/AxiosConfig';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

useEffect(() => {
    api.get("/blog")
      .then((response) => {
        console.log("Fetched data:", response.data);
        const blogsArray = Array.isArray(response.data) ? response.data : response.data.blogs || [];
        blogsArray.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setBlogs(blogsArray);
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);
  

  return (
    <>
     <div>
    <section className="company-header3">
        <div  className="about-us-title">
            <h1>Our Insights</h1>
        </div>
      </section>
      </div>
      <NavBar />
      <div className="client-blog-container">
        <p className="client-blog-heading">Dive into our Insights! We have something for you.</p>
        <div className="blog-list">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              {blog.blogImageUrl && (
                <img 
                  src={blog.blogImageUrl} 
                  alt={blog.blogTitle} 
                  className="blog-image" 
                />
              )}
              <div className="blog-content">
                <h3 className="blog-title">{blog.blogTitle}</h3>
                <p className="blog-excerpt">
                  {blog.blogContent.length > 150
                    ? blog.blogContent.substring(0, 150) + "..."
                    : blog.blogContent}
                    <Link to={`/blog/${blog.id}`} className="read-more">
                  Read More
                </Link>
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
