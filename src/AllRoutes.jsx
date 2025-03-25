import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Components/Home/Home';

//import Products from './Components/Products/Products';

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







const AllRoutes = () => {
    return (
       
        <BrowserRouter>
     
            <Routes>
                <Route path='/' element={<Home/>}/>
                

                <Route path="/categories" element={<AllCategory />} />
                <Route path="/category/:id" element={<SingleProduct />} />
                <Route path="/subcategory/:id" element={<ProductDetails />} />  

                {/*<Route path="/products" element={<Products />} /> */}
 
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/career' element={<Career/>}/>
                <Route path='/dealers' element={<Dealer/>}/> 
                <Route path='/gallery' element={<Gallery/>}/>
                <Route path="/admin-dashboard" element={<Dashboard />} />

                <Route path="/admin-list-career" element={<ListCareer />} />


                <Route path="/admin-add-dealers" element={<AddDealer />} /> 

                <Route path="/admin-add-dealers/:id" element={<AddDealer />} />
                <Route path="/admin-list-dealers" element={<ListDealer />} />
                <Route path="/add-category" element={<AddProduct />} />
                <Route path="/update-category/:id" element={<AddProduct />} /> 
                <Route path="/list-category" element={<ListCategory />} />

                <Route path="/list-subcategories" element={<ListSubCategory />} />
               < Route path="/update-subcategory/:id" element={<AddSubCategory />} />
               <Route path="/add-subcategory" element={<AddSubCategory />} />
               <Route path="/admin-contact" element={<Contacts />} />
                

                <Route path="/login" element={<Login />} />  

                <Route path='/dealers' element={<Dealer/>}/>
                
                <Route path='/login' element={<Login/>}/>

            </Routes>
            
        </BrowserRouter>
       
    )
}

export default AllRoutes;