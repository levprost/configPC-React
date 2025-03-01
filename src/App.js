import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/HomePage";

import Brand from "./pages/Admin/brands/Brands";
import AddBrand from "./pages/Admin/brands/AddBrand";
import EditBrand from "./pages/Admin/brands/EditBrand";

import Category from "./pages/Admin/categories/Categories";
import AddCategory from "./pages/Admin/categories/AddCategory";
import EditCategory from "./pages/Admin/categories/EditCategory";

import Components from "./pages/Admin/components/Components";
import AddComponent from "./pages/Admin/components/AddComponent";
import EditComponent from "./pages/Admin/components/EditComponent";

import Contact from "./pages/Admin/contacts/Contacts";
import ContactShow from "./pages/Admin/contacts/ContactShow";

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

        <Route path="/admin/components" element={<Components />} />
        <Route path="/admin/components/add" element={<AddComponent />} />
        <Route path="/admin/components/edit/:component" element={<EditComponent />}/>

        <Route path="/admin/contacts" element={<Contact />} />
        <Route path="/admin/contacts/:contact" element={<ContactShow />} />

        </Routes>
    </BrowserRouter> 
  ); 
};

export default App;
