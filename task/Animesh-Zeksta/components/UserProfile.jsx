import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import data from '../data.json'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/Ionicons';

const UserProfile = () => {
    const navigation = useNavigation();
    const calculateAge = (dob) => {
        return moment().diff(moment(dob, 'DD/MM/YYYY'), 'years');
      };
  return (
    <View>
        <View>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
                <Icon name="close" size={30} color="#ce1694" />
            </TouchableOpacity>
            <SwiperFlatList
                autoplay
                autoplayDelay={3}
                autoplayLoop
                index={0}
                showPagination
                paginationStyle={styles.pagination}
                paginationActiveColor="#ce1694"
                paginationDefaultColor="#ccc"
            >
            {data[0].photos.map((source, index) => (
                <View style={styles.slide} key={index}>
                    <Image style={styles.image} source={source.path} />
                </View>
            ))}
            </SwiperFlatList> 
        </View>
        <View>
            <View style={styles.details}>
                <Text style={styles.name}>{data[0].first_name} {data[0].last_name}, {calculateAge(data[0].dob)}</Text>
                <Text style={styles.location}>{data[0].location.city}, {data[0].location.country}</Text>
                <Text style={styles.description}>{ data[0].bio }</Text>
                <Text style={styles.interestText}> Interests </Text>
                <View style={styles.interestRow}>
                    {data[0].interests.map((interest,index) => (
                        <View style={styles.interestCol} key={index}>
                            <Text style={styles.interest}> {interest.name} </Text>
                        </View >
                    ))}
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: 400,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        bottom: 10,
    },
    details: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 20
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '400'
    },
    description: {
        paddingVertical: 20,
        fontSize: 15,
    },
    interestText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    interestRow: {
        flexDirection: 'row',
        marginVertical: 10
    },
    interestCol: {
        paddingHorizontal:20,
        paddingVertical:5,
        marginHorizontal:3,
        backgroundColor: '#ce1694',
        borderRadius: 15,
    },
    interest: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 11
    },
});  

export default UserProfile;