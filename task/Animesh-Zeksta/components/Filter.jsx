import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomRadioButton from './CustomRadioButton';
import RNPickerSelect from 'react-native-picker-select';

const Filter = () => {
    const [selectedGender, setSelectedGender] = useState('male');
    const [selectedAge, setSelectedAge] = useState('25-30');
    const [selectedValue, setSelectedValue] = useState('score');

    const genderOptions = [
        { label: 'MALE', value: 'male' },
        { label: 'FEMALE', value: 'female' }
    ];

    const ageOptions = [
        { label: '20-24', value: '20-24' },
        { label: '25-30', value: '25-30' },
        { label: '30-40', value: '30-40' },
        { label: '40+', value: '40+' },
    ];

    const handleValueChange = (value) => {
        setSelectedValue(value);
    };
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.filterText}>Filter</Text>
            <TouchableOpacity>
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
            <RNPickerSelect
                onValueChange={handleValueChange}
                value={selectedValue}
                items={[
                { label: 'Score', value: 'score' },
                { label: 'Date Joined', value: 'date joined' },
                ]}
                style={styles.input}
            />
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical:50,
        marginHorizontal: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    cancelText:{
        color: '#ce1694',
        fontSize: 16,
        fontWeight: 'bold'
    },
    filterText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    gender: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10
    },
    radioGroupContainer: {
        marginHorizontal: 15
    },
    input: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
    button: {
        backgroundColor: '#ce1694',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 60,
        marginTop: 200,
    },
    buttonText:{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});  

export default Filter;