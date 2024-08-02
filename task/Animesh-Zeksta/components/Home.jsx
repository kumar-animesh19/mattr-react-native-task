import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ProfileCard from "./ProfileCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL } from "@env";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [connections, setConnections] = useState([]);
  const filters = useRef({
    gender: null,
    age: null,
    value: null,
  });

  const filterData = (data) => {
    let { gender, age, value } = filters.current;
    if (gender || age || value) {
      if (gender) {
        data = data.filter((item) => item.gender === gender);
      }
      if (age) {
        const [minAge, maxAge] = parseAgeRange(age);
        data = data.filter((item) => {
          const age = moment().diff(moment(item.dob, "DD/MM/YYYY"), "years");
          return age >= minAge && age <= maxAge;
        });
      }
      const randomData = getRandomData(data);
      setConnections(randomData);
    } else {
      const randomData = getRandomData(data);
      setConnections(randomData);
    }
  };

  const parseAgeRange = (ageRange) => {
    if (ageRange === "40+") {
      return [40, Infinity];
    }
    const [minAge, maxAge] = ageRange.split("-").map(Number);
    return [minAge, maxAge];
  };

  const getRandomData = (array) => {
    const shuffledData = array.sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, 5);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      filterData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    filters.current = {
      gender: undefined,
      age: undefined,
      value: undefined,
    };
    fetchData();
  };

  useEffect(() => {
    filters.current = {
      gender: route.params?.gender,
      age: route.params?.age,
      value: route.params?.value,
    };
    fetchData();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <Text style={styles.filter}>Filter</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Daily Connections</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {connections.map((connection, index) => (
          <ProfileCard key={index} connection={connection} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "#e8dfe5",
  },
  filter: {
    textAlign: "right",
    color: "#ce1694",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  refreshButton: {
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#ce1694",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  refreshButtonText: {
    color: "#ce1694",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 30,
  },
});

export default Home;
