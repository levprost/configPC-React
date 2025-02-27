import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/HomePage"; 

const App = () => { 
  return ( 
    <BrowserRouter> 
        <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="*" element={<Home />} /> 
        </Routes> 
    </BrowserRouter> 
  ); 
};

export default App;
