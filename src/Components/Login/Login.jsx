import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/admin-dashboard');
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Login failed:', error);
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
