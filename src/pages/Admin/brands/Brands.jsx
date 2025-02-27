import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../../components/Menu";
import axios from "axios";

const Brand = () => {
  const [brand, setBrand] = useState([]);
  const [component, setComponents] = useState([]);

  useEffect(() => {
    displayBrand();
    fetchComponents();
  }, []); // Sans les crochets ça tourne en boucle

  const displayBrand = async () => {
    await axios.get("http://127.0.0.1:8000/api/brands").then((res) => {
      setBrand(res.data);
    });
  };
  const fetchComponents = async () => {
    await axios.get("http://127.0.0.1:8000/api/components").then((res) => {
      setComponents(res.data);
    });
  };
  const deleteBrand = (id) => {
    axios.delete(`http:/127.0.0.1:8000/api/brand/${id}`).then(displayBrand);
  };
  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <div className="row">
          <thead>
            <tr>
              <th>Nom de marque</th>
              <th>Logo de marque</th>
              <th>Description de la marque</th>
              <th>Сouleur de marque</th>
            </tr>
          </thead>
          <tbody>
            {brand.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.name_brand}</td>
                <td>
                    <img
                      src={`http://127.0.0.1:8000/storage/uploads/${brand.logo_brand}`}
                      width="75px" alt = "pas d'images"
                    />
                </td>
                <td>{brand.description_brand}</td>
                <td>{brand.color_brand}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteBrand(brand.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    </div>
  );
};

export default Brand;