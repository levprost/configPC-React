import { Card, Row, Col, Image, Container } from "react-bootstrap";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowPost = () => {
  const { post } = useParams(); // 🔹 Берем ID поста из URL (как "post")
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    displayPost();
  }, [post]);

  const displayPost = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/posts/${post}`);
      setPostData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Erreur lors du chargement du post:", error);
    }
  };

  if (!postData) {
    return <p className="text-center mt-5">Chargement du post...</p>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg p-4">
            {/* Заголовок и дата */}
            <Card.Body>
              <h2 className="text-center">{postData.title_post}</h2>
              <h5 className="text-center text-muted">{postData.subtitle_post}</h5>
              <hr />
              <div className="d-flex justify-content-between text-muted">
                <span>
                  <FaUser /> Auteur: {postData.user ? postData.user.nick_name : "Inconnu"}
                </span>
                <span>
                  <FaCalendarAlt /> Publié le:{" "}
                  {new Date(postData.created_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </Card.Body>

            {/* Контент статьи */}
            <Card.Body>
              <p>{postData.content_post}</p>
              {postData.content_post_1 && <p>{postData.content_post_1}</p>}
              {postData.content_post_2 && <p>{postData.content_post_2}</p>}
              <blockquote className="blockquote text-muted">{postData.description_post}</blockquote>
            </Card.Body>

            {/* Медиафайлы */}
            <Card.Body>
              <h4 className="mb-3">Médias</h4>
              {postData.media && postData.media.length > 0 ? (
                <Row>
                  {postData.media.map((media, index) => (
                    <Col key={index} md={4} className="mb-3">
                      <Image
                        src={`http://127.0.0.1:8000/storage/uploads/${media.media_file}`}
                        alt="Média"
                        thumbnail
                        className="shadow-sm rounded"
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-muted">Aucun média disponible.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowPost;
