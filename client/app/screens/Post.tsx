import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import FooterMenu from "@/components/Menus/FooterMenu";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { PostContext } from "@/context/postContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface ErrorResponse {
  message?: string;
}

const Post = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {
  // global state:
  const [posts, setPosts] = useContext(PostContext);
  // local state:
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [loading, setLoading] = useState(false);

  // handle form data / post Data :
  const handlePost = async () => {
    try {
      setLoading(true);
      // Validate:
      if (title && !description) {
        alert("Please add post description");
      }
      if (!title && description) {
        alert("Please add post title");
      } else if (!title && !description) {
        alert("Please enter post title and descripttion");
      }
      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.msg);
      navigation.navigate("Home");
    } catch (error) {
      // type guard to check if it's an AxiosError:
      if (!title || !description) {
        return;
      } else {
        alert((error && error) || "Unexpected Error");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a post</Text>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.inputBox}
            placeholder="add post title"
            placeholderTextColor="grey"
            value={title}
            onChangeText={(e) => setTitle(e)}
          />
          <TextInput
            style={[{ height: 120, paddingVertical: 10 }, styles.inputBox]}
            placeholder="add post description"
            placeholderTextColor="grey"
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(e) => setDescription(e)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-square" size={18} /> Create post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
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
  heading: {
    color: "blue",
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  postBtn: {
    flexDirection: "row",
    backgroundColor: "blue",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
