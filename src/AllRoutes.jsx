import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Products from './Components/Products/Products';
import ContactUs from './Components/ContactUs/ContactUs';
import Career from './Components/Career/Career';
import Login from './Components/Login/Login';


const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/products" element={<Products />} />
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/career' element={<Career/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes;