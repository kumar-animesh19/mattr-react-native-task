import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ProfileCard from "./ProfileCard";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import axios from "axios";

const Home = () => {
  const navigation = useNavigation();
  const [connections, setConnections] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getRandomData = (array) => {
    const shuffledData = array.sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, 5);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const randomData = getRandomData(response.data);
      setConnections(randomData);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchData(); 
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <Text style={styles.filter}>Filter</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Daily Connections</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => setRefresh(!refresh)}
        >
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
