import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';

// Dummy favorite products
const favorites = [
  {
    id: '1',
    name: 'Apple iPhone 16 128GB|Teal',
    price: '$700.00',
    image: require('../assets/iphone.png'), // Replace with actual image
  },
  {
    id: '2',
    name: 'M4 MacBook Air 13” 256GB|Sky Blue',
    price: '$1000.00',
    image: require('../assets/macbook.png'),
  },
];

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Your Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', margin: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { width: 60, height: 60, marginRight: 12 },
  name: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: 'bold' },
});

export default FavoritesScreen;
