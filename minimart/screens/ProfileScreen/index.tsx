import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/adaptive-icon.png')} // Replace with user avatar
          style={styles.avatar}
        />
        <Text style={styles.name}>Sammy Igbinovia</Text>
        <Text style={styles.email}>sammy@cuzradio.com</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.option}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.option}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.option}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={[styles.option, { color: 'red' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  email: { fontSize: 14, color: 'gray' },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  row: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  option: {
    fontSize: 16,
  },
});

export default ProfileScreen;
