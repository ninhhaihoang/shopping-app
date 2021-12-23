import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
} from "react-native";
import LoginView from "../components/LoginView";

const Login = () => {
  return (
      <SafeAreaView style={styles.container}>
        <LoginView />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;


