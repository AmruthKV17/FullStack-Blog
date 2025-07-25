import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../Components";
import databaseService from "../Appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      (
      <Container>
        <PostForm post={post} />
      </Container>
      )
    </div>
  ) : null;
}

export default EditPost;
