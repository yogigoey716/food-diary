import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import categoriesData from "../data/categories";
import foods from "../data/foods";
import { Food, RootStackParamList } from "../types";
import Categories from "../components/categories";
import RecipeCard from "../components/RecipeCard";

const allCategories = [
  {
    idCategory: "0",
    strCategory: "All",
    strCategoryThumb:
      "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
  },
  ...categoriesData,
];

function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFoods = useMemo(() => {
    let filtered = foods;

    // 1. Filter by the active category
    if (activeCategory !== "All") {
      filtered = filtered.filter((food) => food.category === activeCategory);
    }

    // 2. Filter by the search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((food) =>
        food.recipeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderListHeader = () => (
    <View>
      {/* Header with Avatar and Bell Icon */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png",
          }}
          style={styles.avatar}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
            <Feather name="heart" size={hp(4)} color="#4A5568" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyRecipes")}
            style={{ marginLeft: wp(4) }}
          >
            <Feather name="book-open" size={hp(4)} color="#4A5568" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Punchline and Title */}
      <View style={styles.punchlineContainer}>
        <Text style={styles.punchlineText}>Hello, User</Text>
        <View>
          <Text style={styles.titleText}>Make your own food,</Text>
          <Text style={styles.titleText}>
            stay at <Text style={styles.highlightedText}>home</Text>
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search any recipe"
          placeholderTextColor={"gray"}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.searchIconContainer}>
          <Feather name="search" size={hp(2.5)} color="gray" />
        </View>
      </View>

      {/* Categories */}
      <Categories
        categories={allCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Recipes Title */}
      <View style={styles.recipesContainer}>
        <Text style={styles.recipesTitle}>Recipes</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredFoods}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: Food) => item.recipeId}
        ListHeaderComponent={renderListHeader}
        renderItem={({ item, index }) => (
          <RecipeCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View style={styles.noRecipesContainer}>
            <Text style={styles.noRecipesText}>No recipes found.</Text>
          </View>
        }
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginTop: hp(2),
  },
  headerIcons: {
    flexDirection: "row",
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
    borderRadius: hp(2.75),
  },
  punchlineContainer: {
    marginBottom: hp(2),
  },
  punchlineText: {
    fontSize: hp(1.7),
    color: "#4A5568",
  },
  titleText: {
    fontSize: hp(3.8),
    fontWeight: "bold",
    color: "#4A5568",
  },
  highlightedText: {
    color: "#FBBF24",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: "#F3F4F6",
    padding: hp(1),
    marginBottom: hp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: hp(1.7),
    paddingLeft: wp(2),
  },
  searchIconContainer: {
    backgroundColor: "white",
    borderRadius: 9999,
    padding: hp(1),
  },
  noRecipesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(10),
  },
  noRecipesText: {
    fontSize: hp(2),
    color: "gray",
  },
  recipesContainer: {
    marginTop: hp(4),
  },
  recipesTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4A5568",
    marginBottom: hp(2),
  },
});

export default HomeScreen;
