import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import FooterMenu from "@/components/Menus/FooterMenu";
import { PostContext } from "@/context/postContext";
import PostCard from "@/components/PostCard";

const Home = () => {
  // global state:
  const [posts, setPosts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  // refresh control:
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={posts} myPostScreen={false} />
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    // marginTop: 40,
  },
});
