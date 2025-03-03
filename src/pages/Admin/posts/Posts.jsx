import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../../components/Menu";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [post, setPost] = useState([]);



  useEffect(() => {
    displayPosts();
  }, []);

  const displayPosts = async () => {
      await axios.get("http://127.0.0.1:8000/api/posts").then((res) => {
          setPost(res.data);
    });
  };

  const deletePost = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/posts/${id}`).then(displayPosts);
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titre du poste</th>
              <th>sous-titre du poste</th>
              <th>Premier contenu du poste</th>
              <th>Deuxième contenu du poste</th>
              <th>Troisième contenu du poste</th>
              <th>Description du poste</th>
              <th>Auteur du poste</th>
            </tr>
          </thead>
          <tbody>
            {post.map((post) => (
              <tr key={post.id}>
                <td>{post.title_post}</td>
                <td>{post.subtitle_post}</td>
                <td>{post.content_post_1}</td>
                <td>{post.content_post_2}</td>
                <td>{post.content_post_3}</td>
                <td>{post.description_post}</td>
                <td>{post.user_id}</td>
                
                <Link
                  to={`/admin/posts/edit/${post.id}`}
                  className="btn btn-success me-2"
                >
                  Edit
                </Link>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deletePost(post.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Posts;
