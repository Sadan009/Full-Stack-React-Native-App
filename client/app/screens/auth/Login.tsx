import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useContext } from "react";
import InputBox from "@/components/Forms/InputBox";
import SubmitButton from "@/components/Forms/SubmitButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login",
  "Home"
>;

const Login = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {
  // global state:
  const [state, setState] = useContext(AuthContext);

  // States:
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function
  // Button function:
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/login", { email, password });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.msg);
      navigation.navigate("Home");
      console.log("Login Data => ", { email, password });
      console.log(await AsyncStorage.getItem("@auth"));
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Enter correct email and password!");
      console.log("Login error: ", error);
      setLoading(false);
    }
  };
  // temp function to check localStorage Data:
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("local storage ==> ", data);
  };
  getLocalStorageData();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>

      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="off"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton
        handleSubmit={handleSubmit}
        btnTitle="Login"
        loading={loading}
      />
      {/* <Text>{JSON.stringify({name, email,password}, null, 4)}</Text> */}
      <Text style={styles.linkText}>
        Don't have an account?
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Register
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 200,
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  linkText: {
    fontSize: 17,
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});
