import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
import React from "react";

type Props = {
  inputTitle: string;
  keyboardType?: KeyboardTypeOptions;
  autoComplete?:
    | "off"
    | "username"
    | "password"
    | "email"
    | "name"
    | "tel";
  secureTextEntry?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>; // function
};

const InputBox = ({
  inputTitle,
  keyboardType,
  autoComplete,
  secureTextEntry = false,
  value,
  setValue,
}: Props) => {
  return (
    <View>
      <Text>{inputTitle}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(e) => setValue(e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    // marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default InputBox;
