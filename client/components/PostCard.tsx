import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

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
type Props = {
  posts: Post[];
};

const PostCard = ({ posts }: Props) => {
  // get posts:
  // const getAllPosts = async () => {
  //   setLoding(false);
  //   try {
  //     const { data } = await axios.get(`/post/get-all-posts`);
  //     setLoding(false);
  //     setPosts(data?.posts);
  //   } catch (error) {
  //     console.log(error);
  //     setLoding(false);
  //   }
  // };

  // // posts on initial time:
  // useEffect(() => {
  //   getAllPosts();
  //     // just keep the track of posts so when we navigate to the
  //     // create post to home screen it will show proper data instead
  //     // of null value we are facing the issue.
  //     // issue with [posts]: if we define the posts in the dependecy
  //     // array the server will run infinte time.
  //     // find a new solution??
  //     // solution -> this useEffect and getAllPosts() is in the
  //     // postContext.js file from where we are trying to get it globally
  //     // so i changed and moved these two functions here and passed some
  //     //  props : and all set the issue is fixed.
  // }, []);
  return (
    <View>
      <Text style={styles.heading}>Total Post: {posts?.length}</Text>
      {posts?.map((item, index) => {
        return (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Title: {item?.title}</Text>
            <Text style={styles.desc}>Desc: {item?.description}</Text>
            <View style={styles.footer}>
              {item?.postedBy?.name && (
                <Text>
                  <FontAwesome5 name="user" /> {item?.postedBy?.name}
                </Text>
              )}

              <Text>
                <FontAwesome5 name="clock" color={"orange"} />{" "}
                {moment(item?.createdAt).format("DD:MM:YYYY")}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  heading: {
    color: "green",
    fontSize: 20,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});
