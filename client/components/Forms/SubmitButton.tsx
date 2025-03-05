import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type Props = {
  handleSubmit: any;
  btnTitle: string;
  loading: boolean;
};

const SubmitButton = ({ handleSubmit, btnTitle, loading }: Props) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
      <Text style={styles.btnText}>{loading ? "Please wait" : btnTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    height: 50,
    backgroundColor: "#1e2225",
    marginHorizontal: 30,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 20,
  },
  btnText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "400",
  },
});

export default SubmitButton;
