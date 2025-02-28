import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/HomePage";

import Brand from "./pages/Admin/brands/Brands";
import AddBrand from "./pages/Admin/brands/AddBrand";
import EditBrand from "./pages/Admin/brands/EditBrand";

import Category from "./pages/Admin/categories/Categories";
import AddCategory from "./pages/Admin/categories/AddCategory";
import EditCategory from "./pages/Admin/categories/EditCategory";

const App = () => { 
  return ( 
    <BrowserRouter> 
        <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="*" element={<Home />} /> 

        <Route path="/admin/brands" element={<Brand />} />
        <Route path="/admin/brands/add" element={<AddBrand />} />
        <Route path="/admin/brands/edit/:brand" element={<EditBrand />} />

        <Route path="/admin/categories" element={<Category />} />
        <Route path="/admin/categories/add" element={<AddCategory />} />
        <Route path="/admin/categories/edit/:category" element={<EditCategory />} />
        </Routes> 
    </BrowserRouter> 
  ); 
};

export default App;
