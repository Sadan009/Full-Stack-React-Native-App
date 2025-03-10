import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Account: undefined;
  Post: undefined;
  Myposts: undefined;
};
 //     navigation.push("Myposts");
 
 

type Props = {
  modalVisible: boolean;
  setModalVisible: Function;
  post: any;
};

const EditModal = ({ modalVisible, setModalVisible, post }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Myposts">>();

  // Handle update post:
  const updatePostHandle = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${id}`, {
        title,
        description,
      });
      setLoading(false);
      alert(data?.msg);
      navigation.push("Myposts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  // initial post data:
  useEffect(() => {
    setTitle(post?.title);
    setDescription(post?.description);
  }, [post]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
            <Text style={styles.modalText}>Update Your Posts</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Title</Text>
            <TextInput
              onChangeText={(text) => setTitle(text)}
              value={title}
              style={styles.inputBox}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Description
            </Text>
            <TextInput
              onChangeText={(text) => setDescription(text)}
              value={description}
              style={[styles.inputBox, styles.desc]}
              multiline={true}
              numberOfLines={4}
            />
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  updatePostHandle(post && post._id),
                    setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {loading ? "Please wait" : "UPDATE"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>CANCEL</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    textAlignVertical: "top",
    marginBottom: 20,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  desc: {
    height: 100,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    width: 110,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
});
