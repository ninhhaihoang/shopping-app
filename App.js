import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import HomeScreen from "../Shopping/shoppingApp/view/screens/HomeScreen";
import DetailsScreen from "../Shopping/shoppingApp/view/screens/DetailsScreen";
import Login from "../Shopping/shoppingApp/view/screens/LoginScreen";
import SignUp from "../Shopping/shoppingApp/view/screens/SignUpScreen";
import CartScreen from "../Shopping/shoppingApp/view/screens/CartScreen";
import React from "react";
import { StatusBar } from "react-native";
import COLORS from "./shoppingApp/consts/colors";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
