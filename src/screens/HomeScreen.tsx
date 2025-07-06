import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Import data and types
import categories from "../data/categories";
import foods from "../data/foods";
import { RootStackParamList } from "../types";
import Recipes from "../components/recipes";
import Categories from "../components/categories";

function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [foodList, setFoodList] = useState(foods);

  const filteredFoods = foodList.filter((food) => {
    if (activeCategory === "All") {
      return food;
    } else {
      return food.category === activeCategory;
    }
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={styles.scrollView}
      >
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
          />
          <View style={styles.searchIconContainer}>
            <Feather name="search" size={hp(2.5)} color="gray" />
          </View>
        </View>

        {/* Categories */}
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        {/* Recipes */}
        {filteredFoods.length === 0 ? (
          <View style={styles.noRecipesContainer}>
            <Text style={styles.noRecipesText}>
              No recipes found for this category.
            </Text>
          </View>
        ) : (
          <Recipes foods={filteredFoods} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: wp(4),
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
});

export default HomeScreen;
