import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
import FooterMenu from "@/components/Menus/FooterMenu";
import { PostContext } from "@/context/postContext";
import PostCard from "@/components/PostCard";
import { useFocusEffect } from "expo-router";

const Home = () => {
  // global state:
  const [posts, setPosts] = useContext(PostContext);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} setPosts={setPosts} />
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
