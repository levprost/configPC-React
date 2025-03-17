import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './../styles/css/navbar.css'
import axios from "axios";


const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Pas de token!");
        return;
      }

      const res = await axios.get("http://127.0.0.1:8000/api/currentuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("La reponse de serveur:", res.data);
      
      // Сохраняем весь объект пользователя, а не только id
      setUser(res.data.data.user); 
      
    } catch (error) {
      console.error(
        "Erreur hors de la récupertaion de User",
        error.response || error
      );
    }
};

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.error("Erreur hors de deconnexion:", error);
    }

    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/");
  };
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg customColor">
        <div className="container-fluid">
          <NavLink className="navbar-brand"  to="/">
            <Logo />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link bg-white" aria-current="page" to="/addconfiguration">Configurations</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link customLink" to="/link">Link</NavLink>
              </li>
              <li className="nav-item dropdown">
                <li className="nav-link dropdown-toggle light customLink" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </li>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item customLink" to="#">Action</NavLink></li>
                  <li><NavLink className="dropdown-item customLink" to="#">Another action</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item customLink" to="#">Something else here</NavLink></li>
                </ul>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link customLink">{user.nick_name}</span>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link bg-white border-0" onClick={handleLogout}>
                      Déconnecter
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link bg-white" to="/login">
                      Se connecter
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link bg-white" to="/register">
                      S'inscrire
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <span className="nav-link customLink" aria-disabled="true">Disabled</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;