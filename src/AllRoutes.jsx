import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Components/Home/Home';

import Products from './Components/Products/Products';
import ContactUs from './Components/ContactUs/ContactUs';
import Career from './Components/Career/Career';
import Login from './Components/Login/Login';
import Dealer from './Components/Dealers/Dealer';




const AllRoutes = () => {
    return (
        <BrowserRouter>
     
            <Routes>
                <Route path='/' element={<Home/>}/>
                
                <Route path="/products" element={<Products />} />
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/career' element={<Career/>}/>
                <Route path='/dealers' element={<Dealer/>}/>

                

                <Route path='/about-us' element={<AboutUs/>}/>

                <Route path='/login' element={<Login/>}/>
            </Routes>
            
        </BrowserRouter>
    )
}

export default AllRoutes;