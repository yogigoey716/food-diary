import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Food, RootStackParamList } from "../types";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
      onPress={() =>
        navigation.navigate("RecipeDetail", { recipeId: item.recipeId })
      }
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

      <Text style={styles.recipeDesciption} numberOfLines={2}>
        {item.cookingDescription}
      </Text>
    </TouchableOpacity>
  );
};

// --- Recipes Component ---
const Recipes = ({ foods }: { foods: Food[] }) => {
  return (
    <View style={styles.recipesContainer}>
      <Text style={styles.recipesTitle}>Recipes</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.recipeId}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RecipeCard item={item} index={index} />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{ paddingBottom: hp(10) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recipesContainer: {
    marginTop: hp(4),
  },
  recipesTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4A5568",
    marginBottom: hp(2),
  },
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
  recipeDesciption: {
    fontSize: hp(1.2),
    color: "#6B7280", // gray-500
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
});

export default Recipes;
