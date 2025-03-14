import React from 'react';
import logo from '../public/logo.png';
import './../styles/css/navbar.css'


const Logo = () => {
    return (
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
    );
};

export default Logo;
