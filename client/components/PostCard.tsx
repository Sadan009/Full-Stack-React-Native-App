import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";

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
  return (
    <View>
      <Text style={styles.heading}>Total Post: {posts?.length}</Text>
      {posts?.map((item, index) => {
        return (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Title: {item?.title}</Text>
            <Text style={styles.desc}>Desc: {item?.description}</Text>
            <View style={styles.footer}>
              <Text>
                <FontAwesome5 name="user" /> {item?.postedBy?.name}
              </Text>
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
