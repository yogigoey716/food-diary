import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Food, RootStackParamList } from "../types";

const RecipeCard = ({ item, index }: { item: Food; index: number }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // Create a masonry effect by making even/odd cards different heights
  const isEven = index % 2 === 0;
  return (
    <TouchableOpacity
      style={[
        styles.recipeCard,
        { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
      ]}
      onPress={() => navigation.navigate("RecipeDetail", { food: item })}
    >
      <Image
        source={{ uri: item.recipeImage }}
        style={[
          styles.recipeImage,
          { height: index % 3 === 0 ? hp(25) : hp(35) },
        ]}
        resizeMode="cover"
      />
      <Text style={styles.recipeName} numberOfLines={2}>
        {item.recipeName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    flex: 1,
    marginBottom: hp(2),
    justifyContent: "flex-start",
  },
  recipeImage: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  recipeName: {
    fontSize: hp(1.5),
    fontWeight: "600",
    color: "#4A5568",
    marginTop: hp(1),
  },
});

export default RecipeCard;
