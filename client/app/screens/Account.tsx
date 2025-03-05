import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FooterMenu from "@/components/Menus/FooterMenu";
import { AuthContext } from "@/context/authContext";

// Define your navigation stack parameters
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Account: undefined;
  Post: undefined;
};

interface ErrorResponse {
  message?: string;
}

interface User {
  name?: string;
  email?: string;
  role?: string;
  // other user properties
}

interface UpdateResponse {
  success: boolean;
  msg: string;
  updatedUser: User;
}

const Account = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Account">>();
  const [state, setState] = useContext(AuthContext);
  const user = state?.user || {};
  // local state:
  // // Initialize state with user data or empty strings
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  // handle update user data:
  const handleUpdate = async () => {
    try {
      setLoading(true);
      // pass the data to network :
      const { data } = await axios.put<UpdateResponse>(
        "/update-user",
        {
          name,
          password,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${state?.token && state?.token}`,
          },
        }
      );
      setLoading(false);
      setState({ ...state, user: data?.updatedUser });
      // alert(data && data.msg);
      Alert.alert("Sucess", data?.msg || "Profile Updated", [
        {
          text: "OK",
          onPress: () => {
            setState({ token: "", user: null });
            AsyncStorage.removeItem("@auth");
            // navigation.navigate("Login");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ]);
      setPassword("");
    } catch (error) {
      // type guard to check if it's an AxiosError:
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        const errorMessage = errorResponse.message || "Registration failed";
        Alert.alert("Error: ", errorMessage);
        console.log(error.response?.data);
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occured ";
        Alert.alert("Error", errorMessage);
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnv6DjrIGcuGgyJfmvstqYQQ8BZC1OOhNwA&s",
            }}
            style={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>
        <Text style={styles.warningText}>
          You can only update you're Name and Password*
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            // secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            style={styles.inputBox}
            value={state?.user?.role}
            editable={false}
          />
        </View>
        {/* update button */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? "Please Wait" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  warningText: {
    color: "red",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "semibold",
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "green",
    fontSize: 10,
    height: 40,
    width: 170,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    fontSize: 16,
    color: "white",
  },
});
