import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/app/screens/Home";
import Register from "@/app/screens/auth/Register";
import Login from "@/app/screens/auth/Login";
import { AuthContext } from "@/context/authContext";
import HeaderMenu from "./HeaderMenu";
import Post from "@/app/screens/Post";
import About from "@/app/screens/About";
import Account from "@/app/screens/Account";

const ScreenMenu = () => {
  // global state:
  const [state] = useContext(AuthContext);
  // Authenticated user condition : true / false:
  const authneticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {authneticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;

const styles = StyleSheet.create({});
