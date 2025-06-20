import React, { useEffect, useState } from "react";
import databaseService from "../Appwrite/config";
import { Container, PostCard } from "../Components";
import { set } from "react-hook-form";

const AllPosts = () => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    databaseService.listPosts([]).then((posts) => {
      if (posts) {
        setposts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            // <PostCard $id={post.$id} {...post}/>
            <div key={post.$id} className="p-4 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
