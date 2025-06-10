import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext';
import { router, useLocalSearchParams } from "expo-router";

// Define a consistent green color for success/border, if not already in Colors.ts
// Add this to your constants/Colors.ts if it doesn't exist
// export const Colors = {
//   ...
//   success: '#4CAF50', // A common green color
//   successBorder: '#2E7D32', // A slightly darker green for the border
// };
const GREEN_SUCCESS = '#4CAF50'; // Using a direct hex code for demonstration
const GREEN_BORDER = '#2E7D32'; // Using a direct hex code for demonstration

const ProductDetailScreen = () => {
  const { productDetail } = useLocalSearchParams();

  const ProductString = Array.isArray(productDetail)
    ? productDetail[0] // Handle case where productDetail is an array
    : productDetail;
  const product = ProductString ? JSON.parse(ProductString) : null;

  const [showAddToCartTooltip, setShowAddToCartTooltip] = useState(false);
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite icon

  // Handle case where product is not found or not parsed
  if (!product) {
    return (
      <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
        {/* Consistent Top Header */}
        <View style={[GlobalStyles.header, { borderBottomWidth: 0, paddingTop: Layout.spacing.md }]}>
          <View style={GlobalStyles.logo}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }}>Full Logo</Text>
          </View>
          <View style={GlobalStyles.deliveryAddressContainer}>
            <Text style={GlobalStyles.deliveryAddressLabel}>DELIVERY ADDRESS</Text>
            <Text style={GlobalStyles.deliveryAddressText}>Umuezike Road, Oyo State</Text>
          </View>
          <TouchableOpacity style={GlobalStyles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
        </View>

        {/* Go back button (as per Figma layout) */}
        <View style={[GlobalStyles.contentPadding, localStyles.goBackButtonContainer]}>
          <TouchableOpacity onPress={() => router.back()} style={GlobalStyles.flexRow}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
            <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>Product Details</Text>
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
      {/* Consistent Top Header */}
      <View style={[GlobalStyles.header, { borderBottomWidth: 0, paddingTop: Layout.spacing.md }]}>
        <View style={GlobalStyles.logo}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }}>Full Logo</Text>
        </View>
        <View style={GlobalStyles.deliveryAddressContainer}>
          <Text style={GlobalStyles.deliveryAddressLabel}>DELIVERY ADDRESS</Text>
          <Text style={GlobalStyles.deliveryAddressText}>Umuezike Road, Oyo State</Text>
        </View>
        <TouchableOpacity style={GlobalStyles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color={Colors.darkGray} />
        </TouchableOpacity>
      </View>

      {/* Go back button (as per Figma layout) */}
      <View style={[GlobalStyles.contentPadding, localStyles.goBackButtonContainer]}>
        <TouchableOpacity onPress={() => router.back()} style={GlobalStyles.flexRow}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
          <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>Go back</Text>
        </TouchableOpacity>
      </View>

      {/* Product Details Content */}
      <View style={localStyles.content}>
        {/* Product Image with Heart Icon */}
        <View style={localStyles.imageContainer}>
          <Image source={product.image} style={localStyles.productImage} />
          <TouchableOpacity
            style={localStyles.favoriteIcon}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite ? Colors.danger : Colors.darkGray} // Assuming Colors.danger for red heart
            />
          </TouchableOpacity>
        </View>

        <Text style={localStyles.productName}>{product.name}</Text>
        <Text style={localStyles.productPrice}>${parseFloat(product.price).toFixed(2)}</Text>
        <Text style={localStyles.aboutThisItem}>About this item</Text>
        <Text style={localStyles.productDescription}>{product.description}</Text>

        {/* Tooltip message */}
        {showAddToCartTooltip && (
          <View style={localStyles.tooltipContainer}>
            <Ionicons name="checkmark-circle" size={20} color={GREEN_SUCCESS} style={localStyles.tooltipIcon} />
            <Text style={localStyles.tooltipText}>Item has been added to cart</Text>
            <TouchableOpacity onPress={() => setShowAddToCartTooltip(false)} style={localStyles.tooltipCloseButton}>
              <Ionicons name="close" size={20} color={Colors.white} /> {/* Close button on tooltip */}
            </TouchableOpacity>
          </View>
        )}

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[GlobalStyles.primaryButton, localStyles.addToCartButton]}
          onPress={() => {
            addToCart(product);
            setShowAddToCartTooltip(true);

            // Hide the tooltip after 3 seconds (as per Figma's transient nature)
            setTimeout(() => {
              setShowAddToCartTooltip(false);
            }, 3000); // 3000 milliseconds = 3 seconds
          }}
        >
          <Text style={GlobalStyles.primaryButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  // New Header & Go Back Button styles
  goBackButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // To push any other elements to the right if added
    marginBottom: Layout.spacing.lg, // Space below the go-back row
    marginTop: Layout.spacing.md, // Space between header and go-back
  },
  // Main content padding and alignment
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg, // Use horizontal padding for consistency
    alignItems: 'center', // Center content horizontally
    paddingTop: Layout.spacing.md, // Add some top padding below the go-back button
  },
  centered: { // Used for "Product Not Found" screen
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  // Product Image and Favorite Icon Container
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // Maintain aspect ratio for the image container
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    position: 'relative', // For absolute positioning of favorite icon
  },
  productImage: {
    width: '100%',
    height: '100%', // Take full height of container
    resizeMode: 'contain',
    borderRadius: Layout.borderRadius.md,
  },
  favoriteIcon: {
    position: 'absolute',
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 999, // Make it perfectly round
    padding: Layout.spacing.xs,
    ...Layout.shadow.light, // Add a subtle shadow
  },
  // Text Styles (adjusted to match Figma)
  productName: {
    fontSize: 22, // Adjusted font size
    fontWeight: 'bold',
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
    color: Colors.text,
  },
  productPrice: {
    fontSize: 20, // Adjusted font size
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Layout.spacing.md,
  },
  aboutThisItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    alignSelf: 'flex-start', // Align to left
    marginBottom: Layout.spacing.sm,
    marginTop: Layout.spacing.md, // Space above this header
  },
  productDescription: {
    fontSize: 14, // Adjusted font size
    color: Colors.textSecondary, // Adjusted color
    textAlign: 'left', // Aligned to left
    marginBottom: Layout.spacing.lg,
    lineHeight: 20, // Adjusted line height for readability
    alignSelf: 'flex-start', // Ensure it aligns left within its parent
  },
  addToCartButton: {
    marginTop: 'auto',
    width: '100%',
  },
  // New and Updated Tooltip Styles (as per Figma design)
  tooltipContainer: {
    backgroundColor: Colors.white, // White background
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md, // Space between tooltip and button
    flexDirection: 'row', // For icon and text alignment
    alignItems: 'center', // Vertically center icon and text
    borderLeftWidth: 4, // Green border on the left
    borderLeftColor: GREEN_BORDER, // Specific green color for border
    ...Layout.shadow.light, // Add subtle shadow for pop-up effect
    width: '95%', // Make it almost full width
    justifyContent: 'space-between', // Space out content and close button
    position: 'absolute', // Position it to float above content
    top: Layout.spacing.lg, // Position from top
    alignSelf: 'center', // Center horizontally
    zIndex: 10, // Ensure it's above other content
  },
  tooltipIcon: {
    marginRight: Layout.spacing.xs, // Space between icon and text
  },
  tooltipText: {
    color: Colors.darkGray, // Text color
    fontSize: 14,
    fontWeight: '500',
    flex: 1, // Allow text to take remaining space
  },
  tooltipCloseButton: {
    padding: Layout.spacing.xs,
  },
});

export default ProductDetailScreen;