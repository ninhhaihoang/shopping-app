import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import HomeScreen from "../Shopping/shoppingApp/view/screens/HomeScreen";
import DetailsScreen from "../Shopping/shoppingApp/view/screens/DetailsScreen";
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
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
