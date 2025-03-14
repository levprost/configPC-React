import React from 'react';
import Navbar from '../components/Menu'; 
import './../styles/css/navbar.css'
 
const Home = () => { 
    return ( 
        <div> 
            <Navbar/>
            <h1>Bienvenu sur la page d'accueil</h1> 
        </div> 
    ); 
}; 
 
export default Home; 