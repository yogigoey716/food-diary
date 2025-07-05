import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  // add other routes here if needed
};

export default function SplashScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View style={[styles.ring, { padding: ring2padding }]}>
        <Animated.View style={[styles.ring, { padding: ring1padding }]}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2024/08/29/02/47/italian-9005494_1280.png",
            }}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBBF24",
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 3,
  },
});
