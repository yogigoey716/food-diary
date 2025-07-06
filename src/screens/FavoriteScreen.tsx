import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { useAppSelector } from "../hooks/reduxHooks";
import foods from "../data/foods";
import { Food, RootStackParamList } from "../types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 1. Get favorite recipe IDs from the Redux store
  const favoriteIds = useAppSelector((state) => state.favorites.favorites);

  // 2. Filter the main foods array to get the full data for favorite recipes
  const favoriteFoods = foods.filter((food) =>
    favoriteIds.includes(food.recipeId)
  );

  // Component to render each item in the list
  const renderFavoriteItem = ({ item }: { item: Food }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("RecipeDetail", { food: item })}
    >
      <Image source={{ uri: item.recipeImage }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.recipeName}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.cookingDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={hp(3.5)} color="#4A5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={{ width: hp(3.5) }} />
      </View>

      {/* Content */}
      {favoriteFoods.length > 0 ? (
        <FlatList
          data={favoriteFoods}
          keyExtractor={(item) => item.recipeId}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You have no favorite recipes yet.
          </Text>
          <Text style={styles.emptySubText}>Go find some you love!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  headerTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4A5568",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    borderRadius: 15,
    padding: wp(3),
    marginBottom: hp(2),
  },
  itemImage: {
    width: hp(10),
    height: hp(10),
    borderRadius: 10,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: wp(4),
  },
  itemTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#2D3748",
  },
  itemDescription: {
    fontSize: hp(1.6),
    color: "#718096",
    marginTop: hp(0.5),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.2),
    fontWeight: "600",
    color: "#4A5568",
  },
  emptySubText: {
    fontSize: hp(1.8),
    color: "#A0AEC0",
    marginTop: hp(1),
  },
});
