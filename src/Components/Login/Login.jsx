import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import api from '../Reducers/AxiosConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
  
    try {
      const response = await api.post("/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true, // Equivalent to `credentials: 'include'`
      });
  
      if (response.status === 200) {
        navigate("/admin-dashboard");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };
  

  return (
    <>
    <div className='login-div'>
      <NavBar />
      <form className='login' onSubmit={handleSubmit}>
        <h2 className='heading'>Sign In</h2>
        <input 
          type="text" 
          placeholder='Username'  
          required 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <input 
          type="password" 
          placeholder='Password' 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
