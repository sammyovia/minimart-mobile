import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { products } from '../../data/products';
import { Product } from '../../types';


const HomeScreen = () => {

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: '/productDetail',
        params: { product: JSON.stringify(item) }, // Assuming 'id' is a string in the URL
      })} // Using Expo Router
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smartphones, Laptops & Accessories</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  image: { width: 100, height: 100, marginBottom: 10 },
  name: { fontSize: 14, textAlign: 'center' },
  price: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
});

export default HomeScreen;
