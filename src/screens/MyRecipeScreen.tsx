import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Food, RootStackParamList } from "../types";

const MY_RECIPES_KEY = "@myRecipes";

export default function MyRecipeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [myRecipes, setMyRecipes] = React.useState<Food[]>([]);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [recipeToDelete, setRecipeToDelete] = React.useState<string | null>(
    null
  );

  useFocusEffect(
    useCallback(() => {
      const loadMyRecipes = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(MY_RECIPES_KEY);
          setMyRecipes(jsonValue != null ? JSON.parse(jsonValue) : []);
        } catch (e) {
          console.error("Failed to load recipes.", e);
        }
      };

      loadMyRecipes();
    }, [])
  );

  const openDeleteModal = (recipeId: string) => {
    setRecipeToDelete(recipeId);
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      const updatedRecipes = myRecipes.filter(
        (recipe) => recipe.recipeId !== recipeToDelete
      );
      await AsyncStorage.setItem(
        MY_RECIPES_KEY,
        JSON.stringify(updatedRecipes)
      );
      setMyRecipes(updatedRecipes);
    } catch (e) {
      console.error("Failed to delete recipe.", e);
    } finally {
      setModalVisible(false);
      setRecipeToDelete(null);
    }
  };

  const renderRecipeItem = ({ item }: { item: Food }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemPressableArea}
        onPress={() => navigation.navigate("RecipeDetail", { food: item })}
      >
        <Image
          source={{ uri: item.recipeImage }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.recipeName}
          </Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.cookingDescription}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RecipeForm", { foodToEdit: item })
          }
        >
          <Feather name="edit" size={hp(2.5)} color="#A0AEC0" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: wp(4) }}
          onPress={() => openDeleteModal(item.recipeId)}
        >
          <Feather name="trash-2" size={hp(2.5)} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
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
        <Text style={styles.headerTitle}>My Recipes</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RecipeForm", {})}>
          <Feather name="plus-circle" size={hp(3.5)} color="#4A5568" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {myRecipes.length > 0 ? (
        <FlatList
          data={myRecipes}
          keyExtractor={(item) => item.recipeId}
          renderItem={renderRecipeItem}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't created any recipes.</Text>
          <Text style={styles.emptySubText}>
            Tap the '+' icon to add your first one!
          </Text>
        </View>
      )}

      {/* Custom Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Delete Recipe</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this recipe? This action cannot be
              undone.
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  listContentContainer: { paddingHorizontal: wp(4), paddingTop: hp(2) },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    borderRadius: 15,
    padding: wp(3),
    marginBottom: hp(2),
  },
  itemPressableArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: { width: hp(10), height: hp(10), borderRadius: 10 },
  itemTextContainer: { flex: 1, marginLeft: wp(4) },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wp(2),
  },
  itemTitle: { fontSize: hp(2), fontWeight: "bold", color: "#2D3748" },
  itemDescription: {
    fontSize: hp(1.6),
    color: "#718096",
    marginTop: hp(0.5),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(10),
  },
  emptyText: {
    fontSize: hp(2.2),
    fontWeight: "600",
    color: "#4A5568",
    textAlign: "center",
  },
  emptySubText: {
    fontSize: hp(1.8),
    color: "#A0AEC0",
    marginTop: hp(1),
    textAlign: "center",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: wp(5),
    backgroundColor: "white",
    borderRadius: 20,
    padding: wp(6),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginBottom: hp(1.5),
  },
  modalText: {
    marginBottom: hp(3),
    textAlign: "center",
    color: "#4A5568",
    fontSize: hp(1.8),
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: "#E2E8F0",
  },
  cancelButtonText: {
    color: "#4A5568",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
