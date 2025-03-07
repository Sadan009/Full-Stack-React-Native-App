import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

// context:
const PostContext = createContext();

const PostProvider = ({ children }) => {
  // Global state
  const [loading, setLoding] = useState(false);
  const [posts, setPosts] = useState([]);

  //   get posts:
  const getAllPosts = async () => {
    setLoding(false);
    try {
      const { data } = await axios.get(`/post/get-all-posts`);
      setLoding(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoding(false);
    }
  };

  // posts on initial time:
  useEffect(() => {
    getAllPosts();
    // just keep the track of posts so when we navigate to the 
    // create post to home screen it will show proper data instead 
    // of null value we are facing the issue.
  }, [posts]);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
