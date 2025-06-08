// ProductDetailScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet, // Import StyleSheet for local styles
} from 'react-native';
// Import global styles and constants
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Product } from '../../types'; // Make sure this path is correct
import { useCart } from '../../contexts/CartContext'; // Import useCart

const ProductDetailScreen = () => {
  const { product } = useLocalSearchParams();
  const parsedProduct: Product = JSON.parse(product as string);
  const router = useRouter();
  const { addToCart } = useCart(); // Use the addToCart function from context

  const [showTooltip, setShowTooltip] = useState(false);

  const handleAddToCart = () => {
    addToCart(parsedProduct); // Add the parsed product to the cart
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <SafeAreaView
      style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}
    >
      {/* Top Header Section: Logo, Delivery Address, Notification */}
      <View style={[GlobalStyles.header, { borderBottomWidth: 0, paddingTop: Layout.spacing.md }]}>
        <View style={GlobalStyles.logo}>
          <Text style={GlobalStyles.logoText}>Full Logo</Text>
        </View>

        <View style={GlobalStyles.deliveryAddressContainer}>
          <Text style={GlobalStyles.deliveryAddressLabel}>DELIVERY ADDRESS</Text>
          <Text style={GlobalStyles.deliveryAddressText}>Umuezike Road, Oyo State</Text>
        </View>

        <TouchableOpacity style={GlobalStyles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color={Colors.darkGray} />
        </TouchableOpacity>
      </View>

      {/* Main Content View with padding */}
      <View style={[GlobalStyles.contentPadding, localStyles.container]}>
        {/* Go Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={localStyles.goBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
          <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>Go back</Text>
        </TouchableOpacity>

        {/* Product Image Wrapper */}
        <View style={localStyles.imageWrapper}>
          <Image source={parsedProduct.image} style={localStyles.productImage} />
          {/* Heart Icon (Favorite) */}
          <TouchableOpacity style={localStyles.heartIcon}>
            <Ionicons name="heart-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Product Info Container */}
        <View style={localStyles.infoContainer}>
          <Text style={[GlobalStyles.heading2, localStyles.productName]}>{parsedProduct.name}</Text>
          <Text style={[GlobalStyles.priceText, localStyles.productPrice]}>${parsedProduct.price}</Text>
          <Text style={[GlobalStyles.bodyText, localStyles.productDescription]}>
            {parsedProduct.description}
          </Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={GlobalStyles.primaryButton} onPress={handleAddToCart}>
          <Text style={GlobalStyles.primaryButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        {/* Tooltip for "Item has been added to cart" */}
        {showTooltip && (
          <View style={GlobalStyles.tooltipContainer}>
            <View style={GlobalStyles.tooltipBar} />
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.success}
              style={GlobalStyles.tooltipIcon}
            />
            <Text style={GlobalStyles.tooltipText}>Item has been added to cart</Text>
            <TouchableOpacity onPress={() => setShowTooltip(false)} style={GlobalStyles.tooltipCloseButton}>
              <Ionicons name="close" size={20} color={Colors.darkGray} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

// Local styles specific to ProductDetailScreen
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    // GlobalStyles.contentPadding handles horizontal padding
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg, // Space below "Go back"
    marginTop: Layout.spacing.md, // Space from header if no back button in header
  },
  imageWrapper: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    ...Layout.shadow.medium, // Slightly more prominent shadow for main product image
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl, // Padding around the image inside its wrapper
    marginBottom: Layout.spacing.lg,
  },
  productImage: {
    width: Layout.window.width * 0.7, // Adjust as needed, e.g., 70% of screen width
    height: Layout.window.width * 0.7, // Keep aspect ratio
    resizeMode: 'contain',
  },
  heartIcon: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.xl, // Makes it circular
    padding: Layout.spacing.xs,
    ...Layout.shadow.light,
  },
  infoContainer: {
    flex: 1, // Allows info to take available space
    paddingHorizontal: Layout.spacing.sm, // Minor horizontal padding for info
    marginBottom: Layout.spacing.xl, // Space before the Add to Cart button
  },
  productName: {
    marginBottom: Layout.spacing.sm,
  },
  productPrice: {
    marginBottom: Layout.spacing.md,
    color: Colors.primary, // Highlight price with primary color
  },
  productDescription: {
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});