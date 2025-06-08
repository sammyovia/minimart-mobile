// HomeScreen.tsx
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { products } from '../../data/products';
import { Product } from '../../types';
import { styles } from './style'; // ← Importing from style.ts

const HomeScreen = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/productDetail',
          params: { product: JSON.stringify(item) },
        })
      }
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

export default HomeScreen;
