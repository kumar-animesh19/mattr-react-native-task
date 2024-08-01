import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Filter = () => {
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
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical:50,
        marginHorizontal: 15
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
        marginVertical: 10,
    },
});  

export default Filter;