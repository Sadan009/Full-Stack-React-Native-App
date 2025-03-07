import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Ensure this matches your navigation setup
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Account: undefined;
  Post: undefined;
  Register: undefined;
};

const HeaderMenu = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [state, setState] = useContext(AuthContext);
  // Logout Fn:
  //   we will logout just by clicking on it even thou we did't used navigation,
  // because in ScreenMenu.tsx we set a condition, that if we have token
  //  then screen will be shown otherwise login - signup page will be shown;
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@auth");
      setState({
        token: "",
        user: null,
      });
      // Show logout alert
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "An error occurred during logout");
    }
    // -----------------------------------------
    // alert("Logging you out!");
    // navigation.navigate("Login");
  };
  useEffect(() => {
    if (!state.user && !state.taken) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
    // dependecy array ensures that the effects run whenever
    //  these value changes.
  }, [state.user, state.token, navigation]);
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5
          name="sign-out-alt"
          color={"red"}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});
