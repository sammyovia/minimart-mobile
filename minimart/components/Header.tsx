import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title or Delivery Address */}
      {title ? (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      ) : (
        <View style={styles.addressContainer}>
          <Text style={styles.deliveryText}>DELIVERY ADDRESS</Text>
          <Text style={styles.address}>Umuezike Road, Oyo State</Text>
        </View>
      )}

      {/* Notification Icon */}
      <TouchableOpacity style={styles.notificationIcon}>
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
  },
  addressContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  deliveryText: {
    fontSize: 10,
    color: 'gray',
  },
  address: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationIcon: {
    padding: 4,
  },
});

export default Header;
