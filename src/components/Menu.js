import React from 'react'; 
import { NavLink } from "react-router-dom"; 
import Logo from './Logo';
 
const Navbar = () => { 
    return ( 
        <div className='navigation'> 
            <ul> 
                <Logo/>
                <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")} > 
                    <li>Accueil</li> 
                </NavLink> 
                <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")} > 
                    <li>Mon blog</li> 
                </NavLink> 
            </ul> 
        </div> 
    ); 
}; 
 
export default Navbar; 