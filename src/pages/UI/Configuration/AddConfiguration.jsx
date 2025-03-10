import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Menu from "../../../components/Menu";

const AddConfiguration = () => {
  //=========Configuration========
  const [nameConfig, setNameConfig] = useState("");
  const [titleConfig, setTitleConfig] = useState("");
  const [subtitleConfig, setSubtitleConfig] = useState("");
  const [descriptionConfig, setDescriptionConfig] = useState("");
  const [explicationConfig, setExplicationConfig] = useState("");
  const [imageConfig, setImageConfig] = useState(null);
  const [benchmarkConfig, setBenchmarkConfig] = useState(null);
  const [userId, setUserId] = useState(null);
  const [validationError, setValidationError] = useState({});

  //==========Components=========
  const [component, setComponent] = useState([]);
  const [components, setComponents] = useState([]);
  const [nameComponent, setNameComponent] = useState("");
  const [priceComponent, setPriceComponent] = useState("");
  const [consumptionComponent, setConsumptionComponent] = useState("");
  const [imageComponent, setImageComponent] = useState(null);
  const [releaseComponent, setReleaseComponent] = useState(null);
  const [brandComponent, setBrandComponent] = useState(null);
  const [categoryComponent, setCategoryComponent] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchComponents();
  }, []);

  useEffect(() => {
    if (component) {
      getComponent();
    }
  }, [component]);

  const fetchComponents = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/components");
      console.log("Réponse de l'API:", res.data);
      if (Array.isArray(res.data.components)) {
        setComponents(res.data.components); // ✅ Устанавливаем массив компонентов
      } else {
        console.error("Les données reçues ne sont pas un tableau:", res.data);
        setComponents([]); // Предотвращает ошибку
      }
    } catch (error) {
      console.error("Erreur lors du chargement des composants:", error);
    }
  };
  
  const getComponent = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/components/${component}`
      );
      setNameComponent(res.data.name_component);
      setPriceComponent(res.data.price_component);
      setConsumptionComponent(res.data.consumption_component);
      setImageComponent(res.data.image_component);
      setReleaseComponent(res.data.release_date_component);
      setBrandComponent(res.data.brand_id);
      setCategoryComponent(res.data.category_id);
      console.log(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement du composant:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Utilisateur non authentifié !");
        return;
      }

      const res = await axios.get("http://127.0.0.1:8000/api/currentuser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserId(res.data.data.user.id);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
    }
  };

  const addConfiguration = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Utilisateur non authentifié !");
        return;
      }

      const formData = new FormData();
      formData.append("name_config", nameConfig);
      formData.append("title_config", titleConfig);
      formData.append("subtitle_config", subtitleConfig);
      formData.append("description_config", descriptionConfig);
      formData.append("explication_config", explicationConfig);
      formData.append("user_id", userId);
      if (imageConfig) formData.append("image_config", imageConfig);
      if (benchmarkConfig) formData.append("benchmark_config", benchmarkConfig);

      await axios.post("http://127.0.0.1:8000/api/configurations", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Configuration ajoutée avec succès !");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Erreur lors de l'ajout de la configuration", error);
      }
    }
  };

  return (
    <>
      <Menu />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Ajout d'une configuration</h4>
                <hr />
                {Object.keys(validationError).length > 0 && (
                  <div className="alert alert-danger">
                    <ul>
                      {Object.entries(validationError).map(([key, value]) => (
                        <li key={key}>{value}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Form onSubmit={addConfiguration}>
                  <Form.Group controlId="nameConfig">
                    <Form.Label>Nom de la configuration</Form.Label>
                    <Form.Control
                      type="text"
                      value={nameConfig}
                      onChange={(e) => setNameConfig(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="titleConfig">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                      type="text"
                      value={titleConfig}
                      onChange={(e) => setTitleConfig(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="subtitleConfig">
                    <Form.Label>Sous-titre</Form.Label>
                    <Form.Control
                      type="text"
                      value={subtitleConfig}
                      onChange={(e) => setSubtitleConfig(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="descriptionConfig">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={descriptionConfig}
                      onChange={(e) => setDescriptionConfig(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="explicationConfig">
                    <Form.Label>Explication</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={explicationConfig}
                      onChange={(e) => setExplicationConfig(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="imageConfig">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImageConfig(e.target.files[0])}
                    />
                  </Form.Group>

                  <Form.Group controlId="benchmarkConfig">
                    <Form.Label>Benchmark</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setBenchmarkConfig(e.target.files[0])}
                    />
                  </Form.Group>
                  <Form.Label>Choisir un composant</Form.Label>
                  <Form.Control
                    as="select"
                    value={component}
                    onChange={(e) => setComponent(e.target.value)}
                  >
                    <option value="">Sélectionner un composant</option>
                    {components.map((comp) => (
                      <option key={comp.id} value={comp.id}>
                        {comp.name_component} - {comp.price_component}€
                      </option>
                    ))}
                  </Form.Control>

                  <Button
                    variant="primary"
                    className="mt-3 w-100"
                    size="lg"
                    type="submit"
                  >
                    Ajouter la configuration
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddConfiguration;
