import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import moment from "moment";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;

const OtherProfile = () => {
  const [liked, setLiked] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const { connection } = route.params;

  const calculateAge = (dob) => {
    return moment().diff(moment(dob, "DD/MM/YYYY"), "years");
  };

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / screenWidth);
    setCurrentPage(index);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.imageCarousel}
        >
          {connection.photos.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.path }}
              style={styles.image}
            />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {connection.photos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: currentPage === index ? "#ce1694" : "#bbb",
                },
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.likeButton}>
          <Text style={styles.name}>
            {connection.first_name} {connection.last_name},{" "}
            {calculateAge(connection.dob)}
          </Text>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Icon
              name={liked ? "heart" : "heart-outline"}
              size={30}
              color="red"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.location}>
          {connection.location.city}, {connection.location.country}
        </Text>
        <Text style={styles.description}>{connection.bio}</Text>
        <Text style={styles.interestText}>Interests</Text>
        <View style={styles.interestRow}>
          {connection.interests.map((interest, index) => (
            <View style={styles.interestCol} key={index}>
              <Text style={styles.interest}>{interest.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  carouselContainer: {
    position: "relative",
  },
  imageCarousel: {
    height: 400,
  },
  image: {
    width: screenWidth,
    height: 400,
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  details: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  location: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "400",
  },
  description: {
    paddingVertical: 20,
    fontSize: 15,
  },
  interestText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  interestRow: {
    flexDirection: "row",
    marginVertical: 10,
  },
  interestCol: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 3,
    backgroundColor: "#ce1694",
    borderRadius: 15,
  },
  interest: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 11,
  },
  likeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OtherProfile;
