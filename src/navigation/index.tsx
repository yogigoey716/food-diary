import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";

export type RootStackParamList = {
  Welcome: undefined; // `undefined` means the route takes no params
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
