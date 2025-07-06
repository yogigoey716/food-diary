import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Food, Ingredient, RootStackParamList } from "../types";

const MY_RECIPES_KEY = "@myRecipes";

export default function RecipeFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "RecipeForm">>();
  const { foodToEdit } = route.params || {};

  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [cookingDescription, setCookingDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  React.useEffect(() => {
    if (foodToEdit) {
      setRecipeName(foodToEdit.recipeName);
      setRecipeImage(foodToEdit.recipeImage);
      setCookingDescription(foodToEdit.cookingDescription);
      setIngredients(
        foodToEdit.ingredients
          .map((ing) => `${ing.measure}, ${ing.ingredientName}`)
          .join("\n")
      );
      setInstructions(foodToEdit.recipeInstructions);
    }
  }, [foodToEdit]);

  const handleSaveRecipe = async () => {
    if (!recipeName || !ingredients || !instructions) {
      Alert.alert(
        "Missing Information",
        "Please fill out the recipe name, ingredients, and instructions."
      );
      return;
    }

    // Here we assume "1 cup, Sugar" format, one per line.
    const ingredientsArray: Ingredient[] = ingredients
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const parts = line.split(",");
        return {
          measure: parts[0]?.trim() || "",
          ingredientName: parts[1]?.trim() || "",
        };
      });

    try {
      const existingRecipesJson = await AsyncStorage.getItem(MY_RECIPES_KEY);
      const existingRecipes: Food[] = existingRecipesJson
        ? JSON.parse(existingRecipesJson)
        : [];

      let updatedRecipes: Food[];

      if (foodToEdit) {
        updatedRecipes = existingRecipes.map((recipe) => {
          if (recipe.recipeId === foodToEdit.recipeId) {
            return {
              ...recipe, // Keep original IDs and other static data
              recipeName,
              recipeImage:
                recipeImage ||
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop",
              cookingDescription,
              recipeInstructions: instructions,
              ingredients: ingredientsArray,
            };
          }
          return recipe;
        });
      } else {
        const newRecipe: Food = {
          recipeId: `custom_${Date.now()}`,
          recipeName,
          recipeImage:
            recipeImage ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop",
          cookingDescription,
          recipeInstructions: instructions,
          ingredients: ingredientsArray,
          category: "Custom",
          idFood: `custom_${Date.now()}`,
          idCategory: "custom",
          alternateDrink: null,
          recipeCategory: "Custom",
          recipeOrigin: "Home",
          recipeTags: "Custom",
        };
        updatedRecipes = [...existingRecipes, newRecipe];
      }

      await AsyncStorage.setItem(
        MY_RECIPES_KEY,
        JSON.stringify(updatedRecipes)
      );

      Alert.alert("Success", "Your recipe has been saved!");
      navigation.goBack();
    } catch (e) {
      console.error("Failed to save the recipe.", e);
      Alert.alert("Error", "Could not save the recipe. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={hp(3.5)} color="#4A5568" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {foodToEdit ? "Edit Recipe" : "Add New Recipe"}
          </Text>

          <View style={{ width: hp(3.5) }} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Recipe Name*</Text>
          <TextInput
            style={styles.input}
            value={recipeName}
            onChangeText={setRecipeName}
            placeholder="e.g., Grandma's Cookies"
          />

          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={recipeImage}
            onChangeText={setRecipeImage}
            placeholder="https://example.com/image.jpg"
            keyboardType="url"
          />

          <Text style={styles.label}>Short Description</Text>
          <TextInput
            style={styles.input}
            value={cookingDescription}
            onChangeText={setCookingDescription}
            placeholder="A short, tasty description"
            multiline
          />

          <Text style={styles.label}>Ingredients*</Text>
          <Text style={styles.subLabel}>
            One per line, format: "Amount, Name" (e.g., "1 cup, Flour")
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder={"1 cup, Flour\n2, Eggs\n1/2 cup, Sugar"}
            multiline
          />

          <Text style={styles.label}>Instructions*</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={instructions}
            onChangeText={setInstructions}
            placeholder={"1. Preheat oven...\n2. Mix ingredients..."}
            multiline
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveRecipe}
          >
            <Text style={styles.saveButtonText}>
              {foodToEdit ? "Update Recipe" : "Save Recipe"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {},
  headerTitle: { fontSize: hp(2.5), fontWeight: "bold", color: "#4A5568" },
  formContainer: { padding: wp(4) },
  label: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: hp(1),
  },
  subLabel: {
    fontSize: hp(1.6),
    color: "gray",
    marginBottom: hp(1),
    marginTop: -hp(1),
  },
  input: {
    backgroundColor: "#F7FAFC",
    borderRadius: 10,
    padding: hp(1.5),
    fontSize: hp(1.8),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  textArea: {
    height: hp(15),
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#FBBF24",
    padding: hp(2),
    borderRadius: 15,
    alignItems: "center",
    marginTop: hp(2),
  },
  saveButtonText: {
    fontSize: hp(2),
    color: "white",
    fontWeight: "bold",
  },
});
