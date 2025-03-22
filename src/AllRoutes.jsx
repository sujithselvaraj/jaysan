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




const AllRoutes = () => {
    return (
        <BrowserRouter>
     
            <Routes>
                <Route path='/' element={<Home/>}/>
                
                <Route path="/categories" element={<AllCategory />} />
                <Route path="/category/:id" element={<SingleProduct />} />
                <Route path="/subcategory/:id" element={<ProductDetails />} />  
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/career' element={<Career/>}/>
                <Route path='/dealers' element={<Dealer/>}/>

                

                <Route path="/login" element={<Login />} />  
            </Routes>
            
        </BrowserRouter>
    )
}

export default AllRoutes;