import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator, // For loading state
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Import useLocalSearchParams and useRouter
import { products } from '../../data/products'; // Import your products data
import { Product } from '../../types'; // Import your Product type definition
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext'; // Assuming you have a CartContext

const ProductDetailScreen = () => {
  const router = useRouter();
  const { productId } = useLocalSearchParams(); // Get parameters from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Assuming you have an addToCart function in your CartContext

  useEffect(() => {
    if (productId) {
      // Find the product from your products array based on the productId
      const foundProduct = products.find(p => p.id.toString() === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Handle case where product is not found (e.g., navigate back, show error)
        console.warn(`Product with ID ${productId} not found.`);
        // Optionally, navigate back or show an error message
        // router.back();
      }
    }
    setLoading(false); // Set loading to false once product search is complete
  }, [productId]); // Rerun effect if productId changes

  if (loading) {
    return (
      <View style={[GlobalStyles.screenContainer, localStyles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={GlobalStyles.bodyText}>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
        <View style={[GlobalStyles.header, { borderBottomWidth: 0 }]}>
            <TouchableOpacity onPress={() => router.back()} style={GlobalStyles.flexRow}>
                <Ionicons name="arrow-back" size={24} color={Colors.text} />
                <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>Product Not Found</Text>
            </TouchableOpacity>
        </View>
        <View style={localStyles.centered}>
          <Text style={[GlobalStyles.bodyText, { textAlign: 'center' }]}>
            Sorry, the product you are looking for could not be found.
          </Text>
          <TouchableOpacity
            style={[GlobalStyles.primaryButton, { marginTop: Layout.spacing.md }]}
            onPress={() => router.back()}
          >
            <Text style={GlobalStyles.primaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
      {/* Header with back button and product name */}
      <View style={[GlobalStyles.header, { borderBottomWidth: 0 }]}>
        <TouchableOpacity onPress={() => router.back()} style={GlobalStyles.flexRow}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
          <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>{product.name}</Text>
        </TouchableOpacity>
      </View>

      <View style={localStyles.content}>
        <Image source={product.image} style={localStyles.productImage} />
        <Text style={localStyles.productName}>{product.name}</Text>
        <Text style={localStyles.productPrice}>${parseFloat(product.price).toFixed(2)}</Text>
        <Text style={localStyles.productDescription}>{product.description}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[GlobalStyles.primaryButton, localStyles.addToCartButton]}
          onPress={() => {
            addToCart(product); // Add the product to cart
            // Optional: Show a confirmation message or navigate to cart
            // router.push('/cart');
          }}
        >
          <Text style={GlobalStyles.primaryButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
    alignItems: 'center', // Center content horizontally
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  productImage: {
    width: '100%',
    height: 250, // Adjust as needed
    resizeMode: 'contain',
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.lg,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
    color: Colors.text,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Layout.spacing.md,
  },
  productDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
    lineHeight: 24,
  },
  addToCartButton: {
    marginTop: 'auto', // Push to the bottom of the content area
    width: '100%',
  },
});

export default ProductDetailScreen;