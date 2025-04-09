// import React, { useState} from 'react';
// import './NavBar.css';
// // import { getAllCategories } from "../services/CategoryService";
// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   // const [categories, setCategories] = useState([]);
//   // Fetch categories when the component mounts
//   // useEffect(() => {
//   //   const fetchCategories = async () => {
//   //     const categoryData = await getAllCategories();
//   //     console.log(categoryData)
//   //     setCategories(categoryData);
//   //   };
//   //   fetchCategories();
//   // }, []);

  
//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <a href='/'>
//           <img src="/Assests/logo.png" alt="Logo"/>
//         </a>
//       </div>

//       <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
//         <span className={`bar ${isOpen ? "open" : ""}`}></span>
//         <span className={`bar ${isOpen ? "open" : ""}`}></span>
//         <span className={`bar ${isOpen ? "open" : ""}`}></span>
//       </div>

//       <ul className={`nav-links ${isOpen ? "active" : ""}`}>
//         {/* Products Dropdown */}
//         <li>
//           <a href="/categories">Products</a>
//           {/* <ul className="dropdown-menu">
//             <li>
//               <a href="/categories">All Categories</a>
//             </li>
//             {categories.map((category) => (
//               <li key={category.id}>
//                 <a href={`/category/${category.id}`}>{category.categoryName}</a>
//               </li>
//             ))}
//           </ul> */}
//         </li>
//         <li><a href="/events">Events</a></li>
//         <li><a href='/blog'>Blogs</a></li> 
//         <li><a  href="/about" >Company</a></li> 
//         <li><a href="/career">Career</a></li>
//         <li><a href="/dealers">Dealers</a></li>        
//         <li><a href="/contact" className='client-lets-talk'>Let's Talk</a></li>
//       </ul>

//       <div className='login-person'>
//         <a href="/login">
//           <img src="/Assests/icon-login.png" alt="login"/>
//         </a>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href='/'>
          <img src="/Assests/logo.png" alt="Logo"/>
        </a>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="/categories" className={location.pathname === "/categories" ? "active" : ""}>Products</a></li>
        <li><a href="/events" className={location.pathname === "/events" ? "active" : ""}>Events</a></li>
        <li><a href='/blog' className={location.pathname === "/blog" ? "active" : ""}>Blogs</a></li>
        <li><a href="/about" className={location.pathname === "/about" ? "active" : ""}>Company</a></li>
        <li><a href="/career" className={location.pathname === "/career" ? "active" : ""}>Career</a></li>
        <li><a href="/dealers" className={location.pathname === "/dealers" ? "active" : ""}>Dealers</a></li>
        <li><a href="/contact" className={`client-lets-talk ${location.pathname === "/contact" ? "active" : ""}`}>Let's Talk</a></li>
      </ul>

      <div className='login-person'>
        <a href="/login">
          <img src="/Assests/icon-login.png" alt="login"/>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;