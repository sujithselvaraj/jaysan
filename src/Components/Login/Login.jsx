<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import NavBar from '../NavBar/NavBar';
=======
import React from 'react'
import './Login.css'
import NavBar from '../NavBar/NavBar'
>>>>>>> 4432f38 (Add About US page)

const Login = () => {
  const [username, setUsername] = useState('');  // ✅ Use "username" instead of "email"
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new URLSearchParams();
    formData.append('username', username);  // ✅ Match Spring Security username field
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
        credentials: 'include'  // ✅ Important for session-based authentication
      });

      if (response.ok) {
        navigate('/admin-dashboard');  // ✅ Redirect after successful login
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-div'>
<<<<<<< HEAD
      <NavBar />
      <form className='login' onSubmit={handleSubmit}>
        <h2 className='heading'>Sign In</h2>
        <input 
          type="text" 
          placeholder='Username'  // ✅ Match backend username field
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
=======
      <NavBar/>
        




        <form  className='login'>
        <div >
        <h2 className='heading'>Sign In</h2>
          
          <input type="text" placeholder='Email-Id' required/>
        </div>
        <div>
         
          <input type="password" placeholder='Password' required/>
        </div>
        <button type="submit">Login</button>
       
      
>>>>>>> 4432f38 (Add About US page)
      </form>
    </div>
  );
};

export default Login;
