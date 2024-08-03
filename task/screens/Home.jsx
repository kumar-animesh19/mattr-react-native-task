import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ProfileCard from "../components/ProfileCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL } from "@env";
import axios from "axios";
import moment from "moment";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = useRef({
    gender: null,
    age: null,
    value: null,
  });

  const parseAgeRange = useCallback((ageRange) => {
    return ageRange === "40+"
      ? [40, Infinity]
      : ageRange.split("-").map(Number);
  }, []);

  const getRandomData = useCallback((array) => {
    return array.sort(() => Math.random() - 0.5).slice(0, 5);
  }, []);

  const filterData = useCallback(
    (data) => {
      const { gender, age, value } = filters.current;
      if (gender) data = data.filter((item) => item.gender === gender);
      if (age) {
        const [minAge, maxAge] = parseAgeRange(age);
        data = data.filter((item) => {
          const itemAge = moment().diff(
            moment(item.dob, "DD/MM/YYYY"),
            "years"
          );
          return itemAge >= minAge && itemAge <= maxAge;
        });
      }
      if (value) {
        data = data.sort((a, b) =>
          value === "score"
            ? moment(b.score).diff(moment(a.score))
            : moment(b.created_at).diff(moment(a.created_at))
        );
      }
      setConnections(getRandomData(data));
    },
    [parseAgeRange, getRandomData]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      filterData(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filterData]);

  const handleRefresh = () => {
    filters.current = { gender: null, age: null, value: null };
    fetchData();
  };

  useEffect(() => {
    filters.current = {
      gender: route.params?.gender,
      age: route.params?.age,
      value: route.params?.value,
    };
    fetchData();
  }, [route.params, fetchData]);

  return (
    <View style={styles.container}>
      {loading && <LoadingScreen />}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <Text style={styles.filter}>Filter</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Daily Connections</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {connections.map((connection) => (
          <ProfileCard key={connection.id} connection={connection} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#e8dfe5",
  },
  headerContainer: {
    paddingTop: 45,
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
    alignSelf: "center",
  },
  refreshButton: {
    borderWidth: 2,
    borderColor: "#ce1694",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 60,
    marginVertical: 10,
    alignSelf: "center",
  },
  refreshButtonText: {
    color: "#ce1694",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
