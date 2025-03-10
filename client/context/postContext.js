import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

// context:
const PostContext = createContext();

const PostProvider = ({ children }) => {
  // Global state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  //   get posts:
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/post/get-all-posts`);
      setPosts(data?.posts);
      setLoading(false);
      return data?.posts;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return undefined;
    }
  };

  // posts on initial time:
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
