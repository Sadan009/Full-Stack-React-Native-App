import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import InputBox from "@/components/Forms/InputBox";
import SubmitButton from "@/components/Forms/SubmitButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios, { AxiosError } from "axios";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface ErrorResponse {
  message?: string;
}

const Register = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  // States:
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function
  // Button function:
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/register", { name, email, password });
      alert(data && data.msg);
      navigation.navigate("Login");
      console.log("Register Data => ", { name, email, password });

      setEmail("");
      setPassword("");
      setName("");
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Register</Text>
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <InputBox inputTitle="Name" value={name} setValue={setName} />
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
          btnTitle="Register"
          loading={loading}
        />
        {/* <Text>{JSON.stringify({name, email,password}, null, 4)}</Text> */}
        <Text style={styles.linkText}>
          Already Registered?
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            Login
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: 200,
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

export default Register;
