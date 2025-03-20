import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='login-div'>
        



        <form  className='login'>
        <div >
          <label>Email-Id:</label>
          <input type="text" placeholder='Email-Id' required/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder='Password' required/>
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account?</p>
        <a href='/SignUp'>
           <p className='link'>Sign Up</p>
        </a>
      </form>
        
    
    </div>
  )
}

export default Login