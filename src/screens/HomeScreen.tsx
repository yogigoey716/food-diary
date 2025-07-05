import { StyleSheet, Text, View } from "react-native";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Foodie!</Text>
      <Text style={styles.subtitle}>Your food recipe app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;
