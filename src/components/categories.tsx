import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Image,
} from "react-native";

import { Category } from "../types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// --- Categories Component ---
const Categories = ({
  activeCategory,
  setActiveCategory,
  categories,
}: {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: Category[];
}) => {
  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              activeCategory === item.strCategory && styles.activeCategory,
            ]}
            onPress={() => setActiveCategory(item.strCategory)}
          >
            <View
              style={[
                styles.categoryImageContainer,
                activeCategory === item.strCategory &&
                  styles.activeCategoryImageContainer,
              ]}
            >
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryText}>{item.strCategory}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesList: {
    paddingHorizontal: wp(1),
  },
  categoryItem: {
    alignItems: "center",
    marginRight: wp(4),
  },
  activeCategory: {
    // You can add styles for the active category if you want
  },
  categoryImageContainer: {
    borderRadius: 9999,
    padding: hp(1),
    backgroundColor: "#F3F4F6",
  },
  activeCategoryImageContainer: {
    backgroundColor: "#FBBF24",
  },
  categoryImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
  },
  categoryText: {
    marginTop: hp(1),
    fontSize: hp(1.6),
    color: "#4A5568",
  },
});

export default Categories;
