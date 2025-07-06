import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{ fontSize: 20, color: "blue" }}>Go Back</Text>
      </TouchableOpacity>
      <Text>My Recipe Screen</Text>
    </View>
  );
}
