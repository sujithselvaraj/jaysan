import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Components/Home/Home';
import ContactUs from './Components/ContactUs/ContactUs';
import Career from './Components/Career/Career';
import Login from './Components/Login/Login';
import Dealer from './Components/Dealers/Dealer';
import AllCategory from './Components/Products/AllCategory';
import SingleProduct from './Components/Products/SingleProduct';
import ProductDetails from './Components/Products/ProductDetails';
import Dashboard from './Components/AdminPortal/AdminDashboad/Dashboard';
import AddProduct from './Components/AdminPortal/Products/AddProduct';
import ListCategory from './Components/AdminPortal/Products/ListCategory/ListCategory';
import ListSubCategory from './Components/AdminPortal/Products/ListSubCategory/ListSubCategory';
import AddSubCategory from './Components/AdminPortal/Products/AddSubCategory';
import ListCareer from './Components/AdminPortal/Career/ListCareer';
import ListDealer from './Components/AdminPortal/Dealers/ListDealer';
import AddDealer from './Components/AdminPortal/Dealers/AddDealer';
import Gallery from './Components/Gallery/Gallery';
import Contacts from './Components/AdminPortal/ContactRequest/Contacts';
import Company from './Components/Company/Company';
import AddTeam from './Components/AdminPortal/Teams/AddTeam';
import Events from './Components/Events/Events';
import Blog from './Components/Blogs/Blog';
import BlogDetails from './Components/Blogs/BlogDetails';
import AddBlog from './Components/AdminPortal/Blogs/AddBlog';
import AddEvents from './Components/AdminPortal/Events/AddEvents';
import ProtectedRoute from './ProtectedRoute';


const AllRoutes = () => {
    return (
       
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/categories" element={<AllCategory />} />
                <Route path="/category/:id" element={<SingleProduct />} />
                <Route path="/subcategory/:id" element={<ProductDetails />} />  
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path='/about' element={<Company/>}/>
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/blog' element={<Blog/>}/>
                <Route path='/add-blog' element={<ProtectedRoute><AddBlog/></ProtectedRoute>}/>
                <Route path='/add-events' element={<ProtectedRoute><AddEvents/></ProtectedRoute>}/>
                <Route path='/career' element={<Career/>}/>
                <Route path='/dealers' element={<Dealer/>}/> 
                <Route path='/gallery' element={<Gallery/>}/>
                <Route path="/admin-dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                <Route path="/admin-company" element={<ProtectedRoute><AddTeam /></ProtectedRoute>} />
                <Route path='/events' element={<Events/>}/> 
                <Route path="/admin-list-career" element={<ProtectedRoute><ListCareer /></ProtectedRoute>} />
                <Route path="/admin-add-dealers" element={<ProtectedRoute><AddDealer /></ProtectedRoute>} /> 
                <Route path="/admin-add-dealers/:id" element={<AddDealer />} />
                <Route path="/admin-list-dealers" element={<ListDealer />} />
                <Route path="/add-category" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                <Route path="/update-category/:id" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} /> 
                <Route path="/list-category" element={<ProtectedRoute><ListCategory /></ProtectedRoute>} />
                <Route path="/list-subcategories" element={<ProtectedRoute><ListSubCategory /></ProtectedRoute>} />
               <Route path="/update-subcategory/:id" element={<ProtectedRoute><AddSubCategory /></ProtectedRoute>} />
               <Route path="/add-subcategory" element={<ProtectedRoute><AddSubCategory /> </ProtectedRoute>} />
               <Route path="/admin-contact" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />  
                <Route path='/dealers' element={<Dealer/>}/>
                <Route path='/login' element={<Login/>}/>

            </Routes>
        </BrowserRouter>
       
    )
}

export default AllRoutes;