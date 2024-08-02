import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useRoute, useNavigation } from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/Ionicons';

const OtherProfile = () => {  
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { connection } = route.params;
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
            {connection.photos.map((source, index) => (
                <View style={styles.slide} key={index}>
                    <Image style={styles.image} source={source.path} />
                </View>
            ))}
            </SwiperFlatList> 
        </View>
        <View>
            <View style={styles.details}>
                <Text style={styles.name}>{connection.first_name} {connection.last_name}, {calculateAge(connection.dob)}
                    <TouchableOpacity onPress={()=> setLiked(!liked)} style={styles.likeButton}>
                        <Icon name={liked ? "heart" : "heart-outline"} size={30} color="red" />
                    </TouchableOpacity>
                </Text>
                <Text style={styles.location}>{connection.location.city}, {connection.location.country}</Text>
                <Text style={styles.description}>{ connection.bio }</Text>
                <Text style={styles.interestText}> Interests </Text>
                <View style={styles.interestRow}>
                    {connection.interests.map((interest,index) => (
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
        height: 500,
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
    likeButton: {
        paddingLeft: 50,
    },
});  

export default OtherProfile;