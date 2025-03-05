import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../config.local";
// context:
const AuthContext = createContext();

// provider:
const AuthProvider = ({ children }) => {
  //   global state:
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //   default axios setting:
  axios.defaults.headers.common["Authorization"] = `Bearer ${state?.token}`;
  axios.defaults.baseURL = API_BASE_URL;

  //   initial local storage data:
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      // parse: Convert a valid JSON string to an Javscript object;
      let loginData = JSON.parse(data);
      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
