import React from 'react'
import './Login.css'
import NavBar from '../NavBar/NavBar'

const Login = () => {
  return (
    <div className='login-div'>
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
       
      
      </form>
        
    
    </div>
  )
}

export default Login