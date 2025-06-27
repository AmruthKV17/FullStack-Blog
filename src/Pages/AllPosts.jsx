import React, { useEffect, useState } from "react";
import databaseService from "../Appwrite/config";
import { Container, PostCard } from "../Components";
import { set } from "react-hook-form";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const [posts, setposts] = useState([]);
  // const selector = useSelector();
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    databaseService.listPosts([Query.and([
      Query.equal('userId',userData.$id),
      Query.equal('status','active')
    ])]).then((posts) => {
      if (posts) {
        setposts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {
        posts.length > 0 ?
        <div className="gap-2 columns-2 md:columns-4">
          { posts.map((post) => (
            // <PostCard $id={post.$id} {...post}/>
            <div key={post.$id} className="h-autow-full aspect-square mb-2">
              <PostCard {...post} />
            </div>
          )) }
        </div>
        : (
          <h4 className="mx-auto">You haven't uploaded any posts!</h4>
        )
      }
      </Container>
    </div>
  );
};

export default AllPosts;
