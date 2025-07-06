import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native"; // Keep this for type safety
import { RootStackParamList, Food } from "../types"; // Import Food interface
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { addFavorite, removeFavorite } from "../redux/favoriteSlice"; // Import actions
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

export default function RecipeDetailScreen() {
  // Get the passed Food object from navigation params
  const route = useRoute<RouteProp<RootStackParamList, "RecipeDetail">>();
  const { food } = route.params;
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.includes(food.recipeId);

  const handleToggleFavorite = () => {
    isFavorite
      ? dispatch(removeFavorite(food.recipeId))
      : dispatch(addFavorite(food.recipeId));
  };
  return (
    <ScrollView style={styles.container}>
      {/* Recipe Image */}
      <Image source={{ uri: food.recipeImage }} style={styles.image} />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        {/* Title and Favorite Icon */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{food.recipeName}</Text>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Feather
              name="heart"
              size={hp(3.5)}
              color={isFavorite ? "#FBBF24" : "#A0AEC0"}
            />
          </TouchableOpacity>
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsContainer}>
          {food.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.ingredientText}>
                {ingredient.measure} {ingredient.ingredientName}
              </Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{food.recipeInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: hp(40),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    top: hp(6),
    left: wp(4),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: wp(4),
    marginTop: hp(2),
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    color: "#4A5568",
    width: wp(70),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "600",
    marginVertical: hp(1.5),
    color: "#4A5568",
  },
  ingredientsContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  bulletPoint: {
    height: hp(1),
    width: hp(1),
    borderRadius: hp(0.5),
    backgroundColor: "#FBBF24",
    marginRight: wp(3),
  },
  ingredientText: {
    fontSize: hp(1.8),
    color: "#6B7280",
  },
  instructions: {
    fontSize: hp(1.8),
    lineHeight: hp(2.6),
    color: "#4A5568",
  },
});
