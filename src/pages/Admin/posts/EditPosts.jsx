import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Menu from "../../../components/Menu";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const EditPost = () => {
  const { post } = useParams();

  const [titlePost, setTitlePost] = useState("");
  const [content1Post, setContent1Post] = useState("");
  const [content2Post, setContent2Post] = useState("");
  const [content3Post, setContent3Post] = useState("");
  const [subtitlePost, setSubtitlePost] = useState("");
  const [descriptionPost, setDescriptionPost] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [orderPost, setOrderPost] = useState(null);
  const [userPost, setUserPost] = useState("");
  const [mediaPost, setMediaPost] = useState("");

  const [mediaFiles, setMediaFiles] = useState([]);

  const [validationError, setValidationError] = useState({});

  const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml"];
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/posts/${post}`);
      setTitlePost(res.data.title_post);
      setContent1Post(res.data.content_post);
      setContent2Post(res.data.content_post_1);
      setContent3Post(res.data.content_post_2);
      setSubtitlePost(res.data.subtitle_post);
      setDescriptionPost(res.data.description_post);
      setIsPublished(res.data.is_published);
      setUserPost(res.data.user ? res.data.user.nick_name : "");
      setMediaPost(res.data.media || []);
      console.log(res.data);
    } catch (error) {
      console.log("Erreur lors du chargement du post:", error);
    }
  };
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filteredFiles = selectedFiles.filter((file) => allowedFormats.includes(file.type));

    if (filteredFiles.length < selectedFiles.length) {
      alert("Certains fichiers ont été ignorés car ils ne sont pas dans un format valide.");
    }

    const newFiles = filteredFiles.map((file) => ({
      file,
      type: "image",
    }));

    setMediaFiles([...mediaFiles, ...newFiles]);
  };
  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Utilisateur non authentifié !");
        return;
      }
  
      const formData = new FormData();
      formData.append("title_post", titlePost);
      formData.append("content_post", content1Post);
      formData.append("content_post_1", content2Post);
      formData.append("content_post_2", content3Post);
      formData.append("subtitle_post", subtitlePost);
      formData.append("description_post", descriptionPost);
      formData.append("is_published", isPublished);
      formData.append("order_post", orderPost);
  
      const res = await axios.put(
        `http://127.0.0.1:8000/api/posts/${post}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Post mis à jour avec succès !");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Le post n'a pas été mis à jour", error);
      }
    }
  };
  
  const handleDeleteMedia = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/media/${id}`).then(getPost);
      
      console.log("Média supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du média:", error);
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
                <h4 className="card-title">Création d'un nouvel post</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="alert alert-danger">
                      <ul className="mb-0">
                        {Object.entries(validationError).map(([key, value]) => (
                          <li key={key}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Form onSubmit={updatePost}>
                    <Row>
                      <Col>
                        <Form.Group controlId="Name">
                          <Form.Label>Titre du post</Form.Label>
                          <Form.Control
                            type="text"
                            value={titlePost}
                            onChange={(event) =>
                              setTitlePost(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="Name">
                          <Form.Label>Sous-titre du post</Form.Label>
                          <Form.Control
                            type="text"
                            value={subtitlePost}
                            onChange={(event) =>
                              setSubtitlePost(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="Content1Post">
                          <Form.Label>Premier contenu du poste</Form.Label>
                          <Form.Control
                            type="text"
                            value={content1Post}
                            onChange={(event) =>
                              setContent1Post(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="Content2Post">
                          <Form.Label>Deuxième contenu d'article</Form.Label>
                          <Form.Control
                            type="text"
                            value={content2Post}
                            onChange={(event) =>
                              setContent2Post(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="Content3Post">
                          <Form.Label>Troisième contenu d'article</Form.Label>
                          <Form.Control
                            type="text"
                            value={content3Post}
                            onChange={(event) =>
                              setContent3Post(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="DescriptionPost">
                          <Form.Label>Déscription du post</Form.Label>
                          <Form.Control
                            type="text"
                            value={descriptionPost}
                            onChange={(event) =>
                              setDescriptionPost(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="DescriptionPost">
                          <Form.Label>Auteur du post</Form.Label>
                          <Form.Control type="text" value={userPost} readOnly />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="IsPublished">
                          <Form.Check
                            type="switch"
                            label="Publier"
                            checked={isPublished}
                            onChange={(event) =>
                              setIsPublished(event.target.checked ? 1 : 0)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="OrderPost">
                          <Form.Label>Ordre du post (1-10)</Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            max="10"
                            value={orderPost}
                            onChange={(event) => {
                              let value = parseInt(event.target.value, 10);
                              if (value >= 1 && value <= 10) {
                                setOrderPost(value);
                              }
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="OrderPost">
                          <Form.Label>Médias</Form.Label>
                          <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {mediaPost.length > 0 ? (
                              mediaPost.map((media, index) => (
                                <div
                                  key={index}
                                  style={{
                                    position: "relative",
                                    display: "inline-block",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <img
                                    src={`http://127.0.0.1:8000/storage/uploads/${media.media_file}`}
                                    width="75px"
                                    alt="Pas d'image"
                                    style={{
                                      borderRadius: "5px",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <button
                                    onClick={() => handleDeleteMedia(media.id)}
                                    style={{
                                      position: "absolute",
                                      top: "5px",
                                      right: "5px",
                                      background: "rgba(0, 0, 0, 0.5)",
                                      border: "none",
                                      borderRadius: "50%",
                                      padding: "5px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <FaTrash color="white" size={14} />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p>Aucune image disponible</p>
                            )}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2 w-100"
                      size="lg"
                      type="submit"
                    >
                      Enrigistrer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
