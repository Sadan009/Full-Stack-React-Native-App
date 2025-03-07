import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import FooterMenu from "@/components/Menus/FooterMenu";
import { PostContext } from "@/context/postContext";
import PostCard from "@/components/PostCard";

const Home = () => {
  // global state:
  const [posts] = useContext(PostContext);
  useEffect(() => {}, [posts]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
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
