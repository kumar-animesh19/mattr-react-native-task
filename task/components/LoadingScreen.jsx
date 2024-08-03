import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size={60} color="#ce1694" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default LoadingScreen;
