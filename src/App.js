import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/HomePage";

import Brand from "./pages/Admin/brands/Brands";
import AddBrand from "./pages/Admin/brands/AddBrand";

const App = () => { 
  return ( 
    <BrowserRouter> 
        <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="*" element={<Home />} /> 

        <Route path="/admin/brands" element={<Brand />} />
        <Route path="/admin/brands/add" element={<AddBrand />} />
        </Routes> 
    </BrowserRouter> 
  ); 
};

export default App;
