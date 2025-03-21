import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Menu";
import "./../styles/css/navbar.css";
import imageCarousel from "./../public/graph.jpg";
import "./../styles/css/homePage.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    displayPosts();
  }, []);

  const displayPosts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/posts/order");
      console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.error("Ошибка загрузки постов:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mainHome">
        <div className="row">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={imageCarousel}
                  className="d-block carImg"
                  alt="configuration"
                />
                <p className="carousel-caption"></p>
              </div>

              {posts.map((post, index) => (
                <div key={post.id} className="carousel-item">
                  {post.media && post.media.length > 0 ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/uploads/${post.media[0].media_file}`}
                      className="d-block carImg"
                      alt={post.title_post}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/800x400"
                      className="d-block w-100"
                      alt={post.title_post}
                    />
                  )}
                  <div className="carousel-caption">
                    <p>{post.title_post}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Кнопки управления каруселью */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
