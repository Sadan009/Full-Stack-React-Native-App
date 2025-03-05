import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FooterMenu from "@/components/Menus/FooterMenu";

const Post = () => {
  return (
    <View style={styles.container}>
      <Text>Post Page</Text>

      <FooterMenu />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
});
