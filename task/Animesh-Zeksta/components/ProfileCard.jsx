import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';

const ProfileCard = ({ connection }) => {
  const calculateAge = (dob) => {
    return moment().diff(moment(dob, 'DD/MM/YYYY'), 'years');
  };

  return (
    <View style={styles.container}>
         <Image
             style={styles.image}
             source={{ uri: connection.photos[0].path }}
         />
         <View style={styles.details}>
             <Text style={styles.name}>{connection.first_name} {connection.last_name}, {calculateAge(connection.dob)}</Text>
             <Text style={styles.location}>{connection.location.city}, {connection.location.country}</Text>
             <TouchableOpacity style={styles.viewProfileButton}>
                <Text style={styles.viewProfileButtonText}>View Profile</Text>
             </TouchableOpacity>
         </View>
     </View>
  );
};

const styles = StyleSheet.create({
  container:{
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 25,
    overflow: 'hidden'
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: '#ce1694',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 70,
    paddingVertical: 30,
    alignItems: 'center',
    position: 'relative',
  },
  details: {
    backgroundColor: '#f8f9fe',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  viewProfileButton: {
    borderWidth: 2,
    borderColor: '#ce1694',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 60,
    marginTop: 10,
  },
  viewProfileButtonText:{
    color: '#ce1694',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default ProfileCard;
