import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomRadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionContainer,
            selectedOption === option.value && styles.selectedOption,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === option.value && styles.selectedText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  optionContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    margin: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 25,
  },
  selectedOption: {
    backgroundColor: "#ce1694",
  },
  optionText: {
    fontSize: 14,
  },
  selectedText: {
    color: "white",
  },
});

export default CustomRadioButton;
