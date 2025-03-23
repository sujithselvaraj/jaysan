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
import { CategoryProvider } from './Components/AdminPortal/ContextApi/CategoryContext';
import ListCareer from './Components/AdminPortal/Career/ListCareer';




const AllRoutes = () => {
    return (
        <CategoryProvider>
        <BrowserRouter>
     
            <Routes>
                <Route path='/' element={<Home/>}/>
                
                <Route path="/categories" element={<AllCategory />} />
                <Route path="/category/:id" element={<SingleProduct />} />
                <Route path="/subcategory/:id" element={<ProductDetails />} />  
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/career' element={<Career/>}/>
                <Route path='/dealers' element={<Dealer/>}/>
                <Route path="/admin-dashboard" element={<Dashboard />} />

                <Route path="/admin-list-career" element={<ListCareer />} />
                <Route path="/add-category" element={<AddProduct />} />
<Route path="/update-category/:id" element={<AddProduct />} /> 
                <Route path="/list-category" element={<ListCategory />} />

                <Route path="/list-subcategories" element={<ListSubCategory />} />
<Route path="/update-subcategory/:id" element={<AddSubCategory />} />
<Route path="/add-subcategory" element={<AddSubCategory />} />
                

                <Route path="/login" element={<Login />} />  
            </Routes>
            
        </BrowserRouter>
        </CategoryProvider>
    )
}

export default AllRoutes;