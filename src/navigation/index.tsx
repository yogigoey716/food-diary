import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import MyRecipeScreen from "../screens/MyRecipeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import RecipeFormScreen from "../screens/RecipeFormScreen";

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
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="MyRecipes" component={MyRecipeScreen} />
        <Stack.Screen name="RecipeForm" component={RecipeFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
