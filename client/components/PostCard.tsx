import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EditModal from "./EditModal";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Account: undefined;
  Post: undefined;
  Myposts: undefined;
};

interface PostedBy {
  name: string;
  _id: number;
}

interface Posts {
  id: number;
  _id: number;
  title: string;
  description: string;
  postedBy: PostedBy;
  createdAt?: string;
}
type Props = {
  posts: Posts[];
  myPostScreen: boolean;
};

const PostCard = ({ posts, myPostScreen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // to update we are using post, setpost
  const [post, setPost] = useState({});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  //handle delete prompt
  const handleDeletePropmt = (id: number) => {
    Alert.alert("Attention!", "Are You Sure Want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  //delete post data
  const handleDeletePost = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.msg);
      navigation.push("Myposts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Total Post: {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((item, index) => {
        return (
          <View key={index} style={styles.card}>
            {myPostScreen && (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ marginHorizontal: 20 }}>
                  <FontAwesome5
                    name="pen"
                    size={16}
                    color={"darkblue"}
                    onPress={() => {
                      setPost(item), setModalVisible(true);
                    }}
                  />
                </Text>
                <Text>
                  <FontAwesome5
                    name="trash"
                    size={16}
                    color={"red"}
                    onPress={() => handleDeletePropmt(item?._id)}
                  />
                </Text>
              </View>
            )}
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
