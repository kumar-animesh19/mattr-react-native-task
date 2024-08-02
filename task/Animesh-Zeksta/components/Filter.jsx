import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomRadioButton from "./CustomRadioButton";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const Filter = () => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState();
  const [selectedAge, setSelectedAge] = useState();
  const [selectedValue, setSelectedValue] = useState();

  const genderOptions = [
    { label: "MALE", value: "male" },
    { label: "FEMALE", value: "female" },
  ];

  const ageOptions = [
    { label: "20-24", value: "20-24" },
    { label: "25-30", value: "25-30" },
    { label: "30-40", value: "30-40" },
    { label: "40+", value: "40+" },
  ];

  const handleClearAll = () => {
    setSelectedGender();
    setSelectedAge();
    setSelectedValue();
  };

  const handleApplyFilter = () => {
    navigation.navigate("Activity", {
      gender: selectedGender,
      age: selectedAge,
      value: selectedValue,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.filterText}>Filter</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.cancelText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.radioGroupContainer}>
        <Text style={styles.gender}>Gender</Text>
        <CustomRadioButton
          options={genderOptions}
          selectedOption={selectedGender}
          onSelect={setSelectedGender}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.radioGroupContainer}>
        <Text style={styles.gender}>Age Ranges</Text>
        <CustomRadioButton
          options={ageOptions}
          selectedOption={selectedAge}
          onSelect={setSelectedAge}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.radioGroupContainer}>
        <Text style={styles.gender}>Sort by</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="--- Select ---" value="" />
            <Picker.Item label="Score" value="score" />
            <Picker.Item label="Date Joined" value="date joined" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleApplyFilter}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    backgroundColor: "#e8dfe5",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  cancelText: {
    color: "#ce1694",
    fontSize: 16,
    fontWeight: "bold",
  },
  filterText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  gender: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  radioGroupContainer: {
    marginHorizontal: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#ce1694",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginTop: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Filter;
