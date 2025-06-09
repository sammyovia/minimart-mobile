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
  StyleSheet,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { products } from '../../data/products'; // <--- Import products data here

const ProductDetailScreen = () => {
  const { productId } = useLocalSearchParams(); //  Get productId
  const router = useRouter();
  const { addToCart } = useCart();

  // Find the product based on the ID passed
  const parsedProduct: Product | undefined = products.find(
    (p) => p.id.toString() === productId
  );

  const [showTooltip, setShowTooltip] = useState(false);

  // Handle case where product is not found (e.g., direct navigation with invalid ID)
  if (!parsedProduct) {
    return (
      <SafeAreaView style={[GlobalStyles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={GlobalStyles.bodyText}>Product not found.</Text>
        <TouchableOpacity style={GlobalStyles.primaryButton} onPress={() => router.back()}>
          <Text style={GlobalStyles.primaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart(parsedProduct);
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

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
  },
  imageWrapper: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    ...Layout.shadow.medium,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
    marginBottom: Layout.spacing.lg,
  },
  productImage: {
    width: Layout.window.width * 0.7,
    height: Layout.window.width * 0.7,
    resizeMode: 'contain',
  },
  heartIcon: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.xl,
    padding: Layout.spacing.xs,
    ...Layout.shadow.light,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: Layout.spacing.sm,
    marginBottom: Layout.spacing.xl,
  },
  productName: {
    marginBottom: Layout.spacing.sm,
  },
  productPrice: {
    marginBottom: Layout.spacing.md,
    color: Colors.primary,
  },
  productDescription: {
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});