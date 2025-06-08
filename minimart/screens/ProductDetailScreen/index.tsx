import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/types';
import { Product } from '../../types';

const ProductDetailScreen = () => {
  const { product } = useLocalSearchParams();
  const parsedProduct: Product = JSON.parse(product as string);

  const [showTooltip, setShowTooltip] = useState(false);

  const handleAddToCart = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <View style={styles.container}>
      <Image source={parsedProduct.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{parsedProduct.name}</Text>
        <Text style={styles.price}>{parsedProduct.price}</Text>
        <Text style={styles.description}>{parsedProduct.description}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      {showTooltip && (
        <View style={styles.tooltipContainer}>
          <View style={styles.tooltipBar} />
          <Ionicons name="checkmark-circle" size={24} color={Colors.success} style={styles.tooltipIcon} />
          <Text style={styles.tooltipText}>Item has been added to cart</Text>
          <TouchableOpacity onPress={() => setShowTooltip(false)}>
            <Ionicons name="close" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  name: {
    ...Typography.heading,
    marginBottom: 10,
  },
  price: {
    ...Typography.subheading,
    color: Colors.primary,
    marginBottom: 10,
  },
  description: {
    ...Typography.body,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tooltipContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  tooltipBar: {
    height: '100%',
    width: 4,
    backgroundColor: Colors.success,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    marginRight: 10,
  },
  tooltipIcon: {
    marginRight: 8,
  },
  tooltipText: {
    flex: 1,
    color: Colors.text,
  },
});

export default ProductDetailScreen;
