import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import FooterMenu from '@/components/Menus/FooterMenu';
import { AuthContext } from '@/context/authContext';

const About = () => {
  // global state:
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
        <Text>About Page</Text>
      {/* <Text>{JSON.stringify(state, null, 4)}</Text> */}
      <FooterMenu />
    </View>
  );
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
});