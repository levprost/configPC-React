import { Link } from "react-router-dom";
import {
  FaBox,
  FaThList,
  FaCogs,
  FaDatabase,
  FaUsers,
  FaImage,
  FaNewspaper,
} from "react-icons/fa";
import "./../../styles/css/dashboard.css";
import { GoCpu } from "react-icons/go";
import { BsPc } from "react-icons/bs";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [openSection, setOpenSection] = useState(null); // Управление раскрытыми разделами

  const sections = [
    { name: "Brands", path: "/admin/brands", icon: <FaBox /> },
    { name: "Categories", path: "/admin/categories", icon: <FaThList /> },
    { name: "Components", path: "/admin/components", icon: <GoCpu /> },
    { name: "Configurations", path: "/admin/configurations", icon: <BsPc /> },
    { name: "Contacts", path: "/admin/contacts", icon: <FaUsers /> },
    { name: "Media", path: "/admin/media", icon: <FaImage /> },
    { name: "Posts", path: "/admin/posts", icon: <FaNewspaper /> },
  ];

  const handleSectionClick = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <section className="mainadmin">
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            {sections.map((section, index) => (
              <li key={index}>
                <div
                  onClick={() => handleSectionClick(index)}
                  className="sidebar-item"
                >
                  {section.icon} <span>{section.name}</span>
                  <span className="arrow">
                    {openSection === index ? "▲" : "▼"}
                  </span>
                </div>
                {openSection === index && (
                  <ul className="crud-menu">
                    <li>
                      <Link to={`${section.path}/`}>View List</Link>
                    </li>
                    <li>
                      <Link to={`${section.path}/add`}>Create New</Link>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area */}
        <main className="content">
          <h2>Welcome to Admin Dashboard</h2>
          <p>Select a section from the sidebar to manage data.</p>
        </main>
      </div>
    </section>
  );
};

export default AdminDashboard;
