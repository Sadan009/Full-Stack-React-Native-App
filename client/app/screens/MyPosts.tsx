import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FooterMenu from "@/components/Menus/FooterMenu";
import axios from "axios";
import PostCard from "@/components/PostCard";

interface PostedBy {
  name: string;
  _id: number;
}

interface Post {
  id: number;
  title: string;
  description: string;
  postedBy: PostedBy;
  createdAt?: string;
}

const MyPosts = () => {
  //state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-posts");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default MyPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    // marginTop: 40,
  },
  footer: {
    backgroundColor: "#ffffff",
  },
});
