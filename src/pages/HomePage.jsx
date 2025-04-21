import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Menu";
import "./../styles/css/navbar.css";
import imageCarousel from "./../public/graph.jpg";
import "./../styles/css/homePage.css";
import "./../styles/css/buttonHome.css";

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
      console.error("Erreur d'enrigistrement des posts:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mainHome">
        <div className="row g-0">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                <div className="col-md-6 rightSide">
                  <h2 className="titleSlide">Combien d'énergie mon ordinateur consomme-t-il?</h2>
                <div className="carousel-caption">
                    <button className="glowing-btn btnCalc">Calculatrice en ligne</button>
                  </div>
                </div>
                <img
                  src={imageCarousel}
                  className="d-block carImg col-md-6"
                  alt="configuration"
                />
                 <h2 className="titleSlideImg">Combien d'énergie mon ordinateur consomme-t-il?</h2>
                 <button className="glowing-btn btnCalcImg">Calculatrice en ligne</button>
                </div>
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
