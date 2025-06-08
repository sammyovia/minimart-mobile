// ProductDetailScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Product } from '../../types';
import { styles } from './style';

const ProductDetailScreen = () => {
  const { product } = useLocalSearchParams();
  const parsedProduct: Product = JSON.parse(product as string);
  const router = useRouter();

  const [showTooltip, setShowTooltip] = useState(false);

  const handleAddToCart = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.goBack}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>

      <View style={styles.imageWrapper}>
        <Image source={parsedProduct.image} style={styles.image} />
        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

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
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Colors.success}
            style={styles.tooltipIcon}
          />
          <Text style={styles.tooltipText}>Item has been added to cart</Text>
          <TouchableOpacity onPress={() => setShowTooltip(false)}>
            <Ionicons name="close" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductDetailScreen;
