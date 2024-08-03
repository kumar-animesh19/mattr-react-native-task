import React, { useState, useCallback, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const ProfileCard = memo(({ connection, index }) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState({ uri: connection.photos[0].path });

  const calculateAge = useCallback((dob) => {
    return moment().diff(moment(dob, "DD/MM/YYYY"), "years");
  }, []);

  const handleViewProfile = useCallback(() => {
    navigation.navigate("OtherProfile", { connection });
  }, [navigation, connection]);

  const handleImageError = () => setImageUri(require("../assets/pic.png"));

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imageUri}
        onError={handleImageError}
      />
      {index === 0 && (
        <View style={styles.topMatchLabel}>
          <Text style={styles.topMatchText}>Top Match</Text>
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.name}>
          {connection.first_name} {connection.last_name},{" "}
          {calculateAge(connection.dob)}
        </Text>
        <Text style={styles.location}>
          {connection.location.city}, {connection.location.country}
        </Text>
        <TouchableOpacity
          style={styles.viewProfileButton}
          onPress={handleViewProfile}
        >
          <Text style={styles.viewProfileButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 25,
    overflow: "hidden",
    width: 320,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  topMatchLabel: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "black",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1,
  },
  topMatchText: {
    color: "white",
    fontWeight: "bold",
  },
  details: {
    backgroundColor: "#f8f9fe",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "400",
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  viewProfileButton: {
    borderWidth: 2,
    borderColor: "#ce1694",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 60,
    marginTop: 10,
  },
  viewProfileButtonText: {
    color: "#ce1694",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileCard;
