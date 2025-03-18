import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { AiOutlineLink } from "react-icons/ai";
import "../../../styles/css/postsList.css";
import "../../../styles/css/main.css";
import bgCard from './../../../public/graph.jpg';
import Menu from "./../../../components/Menu";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    displayPosts();
    console.log(media);
  }, [currentPage, media]);

  const displayPosts = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/posts?page=${currentPage}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
        setCurrentPage(res.data.current_page);
        setTotalPages(res.data.last_page);
        setMedia(res.data.media);
      });
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
    <div className="main">
    <Menu/>
      <div className="container mx-auto mt-4">
        <div className="row d-flex justify-content-center">
          {posts &&
            posts.map((post) => (
              <div key={post.id} className="col-md-4 mb-4">
                <div className="card me-auto">
                  {post.media &&
                  Array.isArray(post.media) &&
                  post.media.length > 0 ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/uploads/${post.media[0].media_file}`}
                      className="card-img-top"
                      alt={post.title_post}
                    />
                  ) : (
                    <img
                      src={bgCard}
                      className="card-img-top"
                      alt=""
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{post.title_post}</h5>
                    <h6 className="card-subtitle mb-2 border-bottom">
                      {post.subtitle_post}
                    </h6>
                    <p className="card-text">{post.description_post}</p>
                    <Button
                      href={`/showpost/${post.id}`}
                      className="btnList"
                    >
                       <AiOutlineLink className="icon" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="pagination d-flex justify-content-center mt-4">
        <Button
          className="btnPage"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="btnPage"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>

    </>
  );
};

export default PostsList;
