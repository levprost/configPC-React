import {
  Card,
  Row,
  Col,
  Image,
  Container,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { FaUser, FaCalendarAlt, FaCommentDots, FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowConfiguration = () => {
  const { configuration } = useParams();
  const [configData, setConfigData] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [score, setScore] = useState([]);
  const [userComment, setUserComment] = useState(null);
  const [commentFavorite, setCommentFavorite] = useState("");
  const [ratingFavorite, setRatingFavorite] = useState(3);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    displayConfig();
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserComment(res.data.data.user.id);
    } catch (error) {
      console.error("Erreur de récupération de l'utilisateur:", error);
    }
  };

  const displayConfig = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/configurations/${configuration}`
      );
      setConfigData(res.data.configuration);
      setRatings(res.data.ratings);
      setScore(res.data.score);
    } catch (error) {
      console.log("Erreur lors du chargement de la configuration:", error);
    }
  };

  const addRating = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Utilisateur non authentifié !");
        return;
      }

      const formData = new FormData();
      formData.append("comment_favorite", commentFavorite);
      formData.append("rating_favorite", ratingFavorite);
      formData.append("configuration_id", configuration);
      formData.append("user_id", userComment);

      await axios.post(
        "http://127.0.0.1:8000/api/UserConfigurations",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCommentFavorite("");
      setRatingFavorite(3);

      displayConfig();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Le commentaire n'a pas été créé", error);
      }
    }
  };

  if (!configData) {
    return (
      <p className="text-center mt-5">Chargement de la configuration...</p>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center">{configData.title_config}</h2>
              <h5 className="text-center text-muted">
                {configData.subtitle_config}
              </h5>
              <hr />
              <div className="d-flex justify-content-between text-muted">
                <span>
                  <FaUser /> Auteur ID: {configData.user_id}
                </span>
                <span>
                  <FaCalendarAlt /> Publié le:{" "}
                  {new Date(configData.created_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </Card.Body>

            <Card.Body>
              <p>{configData.explication_config}</p>
              <blockquote className="blockquote text-muted">
                {configData.description_config}
              </blockquote>
            </Card.Body>

            <Card.Body>
              <h4 className="mb-3">Images</h4>
              <Row>
                <Col md={6}>
                  <Image
                    src={configData.image_config}
                    alt="Configuration"
                    thumbnail
                    className="shadow-sm rounded w-100"
                  />
                </Col>
                <Col md={6}>
                  <Image
                    src={configData.benchmark_config}
                    alt="Benchmark"
                    thumbnail
                    className="shadow-sm rounded w-100"
                  />
                </Col>
              </Row>
            </Card.Body>

            <Card.Body>
              <h4 className="mb-3">
                <FaStar /> Évaluations
              </h4>
              <p>
                Score total: <strong>{score[0]?.total_score || 0}</strong>
              </p>
              <p>
                Note moyenne:{" "}
                <strong>
                  {score[0]?.avg_score
                    ? parseFloat(score[0].avg_score).toFixed(2)
                    : "N/A"}
                </strong>
              </p>

              {ratings.length > 0 ? (
                <ListGroup variant="flush">
                  {ratings.map((rating, index) => (
                    <ListGroup.Item
                      key={index}
                      className="border-0 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{rating.nick_name}</strong> -{" "}
                        <span className="text-warning">
                          {rating.rating_favorite} ★
                        </span>
                        <p className="mb-1">{rating.comment_favorite}</p>
                        <small className="text-muted">
                          Posté le{" "}
                          {new Date(rating.created_at).toLocaleDateString(
                            "fr-FR"
                          )}
                        </small>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">Aucune évaluation pour le moment.</p>
              )}
            </Card.Body>

            {ratings.some((rating) => rating.user_id === userComment) ? (
              <p className="text-muted">
                Vous avez déjà laissé un commentaire.
              </p>
            ) : (
              <Card.Body>
                <h4 className="mb-3">Ajouter une évaluation</h4>
                <Form onSubmit={addRating}>
                  <Form.Group controlId="rating">
                    <Form.Label>Votre note (1 à 5):</Form.Label>
                    <Form.Control
                      as="select"
                      value={ratingFavorite}
                      onChange={(e) => setRatingFavorite(e.target.value)}
                      required
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} ★
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Votre commentaire:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={commentFavorite}
                      onChange={(e) => setCommentFavorite(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {validationError && (
                    <p className="text-danger mt-2">
                      {validationError.comment_favorite}
                    </p>
                  )}
                  <Button variant="primary" type="submit" className="mt-3">
                    Publier
                  </Button>
                </Form>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowConfiguration;
