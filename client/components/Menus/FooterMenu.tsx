import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Post: undefined;
  About: undefined;
  Account: undefined;
};

type FooterMenuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FooterMenu = () => {
  const navigation = useNavigation<FooterMenuNavigationProp>();
  // Hooks:
  const route = useRoute();

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigation("Home")}>
        <FontAwesome5
          name="home"
          style={styles.iconStyle}
          color={route.name === "Home" && "orange"}
        />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("Post")}>
        <FontAwesome5
          name="plus-square"
          style={styles.iconStyle}
          color={route.name === "Post" && "orange"}
        />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("About")}>
        <FontAwesome5
          name="info-circle"
          style={styles.iconStyle}
          color={route.name === "About" && "orange"}
        />
        <Text>About</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("Account")}>
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Account" && "orange"}
        />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterMenu;

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
