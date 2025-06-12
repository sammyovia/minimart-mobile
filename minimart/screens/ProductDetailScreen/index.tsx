import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext';
import { router, useLocalSearchParams } from "expo-router";
import { Product } from '../../types'; // Ensure Product type is imported

const GREEN_SUCCESS = '#4CAF50';
const GREEN_BORDER = '#2E7D32';

const ProductDetailScreen = () => {
  const { productDetail } = useLocalSearchParams();
  const ProductString = Array.isArray(productDetail) ? productDetail[0] : productDetail;
  const product: Product | null = ProductString ? JSON.parse(ProductString) : null;

  const [showAddToCartTooltip, setShowAddToCartTooltip] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
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

      <View style={[GlobalStyles.contentPadding, localStyles.goBackButtonContainer]}>
        <TouchableOpacity onPress={() => router.back()} style={GlobalStyles.flexRow}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
          <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>Go back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        <View style={localStyles.imageContainer}>
          <Image source={product.image} style={localStyles.productImage} />
          <TouchableOpacity
            style={localStyles.favoriteIcon}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite ? Colors.danger : Colors.darkGray}
            />
          </TouchableOpacity>
        </View>

        <Text style={localStyles.productName}>{product.name}</Text>
        <Text style={localStyles.productPrice}>${parseFloat(product.price).toFixed(2)}</Text>
        <Text style={localStyles.aboutThisItem}>About this item</Text>
        <Text style={localStyles.productDescription}>{product.description}</Text>

        <Text style={localStyles.sectionTitle}>Quantity</Text>
        <View style={localStyles.quantityControl}>
            <TouchableOpacity style={GlobalStyles.quantityButton}>
                <Ionicons name="remove" size={20} color={Colors.text} />
            </TouchableOpacity>
            <Text style={GlobalStyles.quantityButtonText}>1</Text>
            <TouchableOpacity style={GlobalStyles.quantityButton}>
                <Ionicons name="add" size={20} color={Colors.text} />
            </TouchableOpacity>
        </View>

        <Text style={localStyles.sectionTitle}>Colors</Text>
        <View style={localStyles.colorOptions}>
            <TouchableOpacity style={[localStyles.colorBubble, { backgroundColor: '#ADD8E6' }]} />
            <TouchableOpacity style={[localStyles.colorBubble, { backgroundColor: '#FFA07A' }]} />
            <TouchableOpacity style={[localStyles.colorBubble, { backgroundColor: '#90EE90' }]} />
        </View>

        <View style={{ height: Layout.spacing.lg * 2 }} />
      </ScrollView>

      {showAddToCartTooltip && (
        <View style={localStyles.tooltipContainer}>
          <View style={localStyles.tooltipContent}>
            <Ionicons name="checkmark-circle" size={20} color={GREEN_SUCCESS} style={localStyles.tooltipIcon} />
            <Text style={localStyles.tooltipText}>Item has been added to cart</Text>
          </View>
          <TouchableOpacity onPress={() => setShowAddToCartTooltip(false)} style={localStyles.tooltipCloseButton}>
            <Ionicons name="close" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      )}

      <View style={localStyles.addToCartButtonFixedContainer}>
        <TouchableOpacity
          style={[GlobalStyles.primaryButton, localStyles.addToCartButton]}
          onPress={() => {
            addToCart(product);
            setShowAddToCartTooltip(true);
            setTimeout(() => {
              setShowAddToCartTooltip(false);
            }, 3000);
          }}
        >
          <Text style={GlobalStyles.primaryButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const localStyles = StyleSheet.create({
  goBackButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.lg * 3,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: Layout.borderRadius.md,
  },
  favoriteIcon: {
    position: 'absolute',
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 999,
    padding: Layout.spacing.xs,
    ...Layout.shadow.light,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
    color: Colors.text,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Layout.spacing.md,
  },
  aboutThisItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    alignSelf: 'flex-start',
    marginBottom: Layout.spacing.sm,
    marginTop: Layout.spacing.md,
  },
  productDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'left',
    marginBottom: Layout.spacing.lg,
    lineHeight: 20,
    alignSelf: 'flex-start',
  },
  addToCartButtonFixedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Layout.borderRadius.lg,
    borderTopRightRadius: Layout.borderRadius.lg,
    ...Layout.shadow.light,
    zIndex: 10,
  },
  addToCartButton: {
    width: '100%',
  },
  tooltipContainer: {
    backgroundColor: Colors.white,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: GREEN_BORDER,
    ...Layout.shadow.light,
    width: '95%',
    justifyContent: 'space-between',
    position: 'absolute',
    top: Layout.spacing.lg,
    alignSelf: 'center',
    zIndex: 10,
  },
  tooltipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tooltipIcon: {
    marginRight: Layout.spacing.sm,
  },
  tooltipText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  tooltipCloseButton: {
    // --- CHANGED BACKGROUND COLOR HERE ---
    backgroundColor: Colors.mediumGray, // Changed from Colors.danger to an ash-like gray
    padding: 4,
    borderRadius: 20,
    marginLeft: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.mediumGray, // Keeping border color consistent with background
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    alignSelf: 'flex-start',
    marginBottom: Layout.spacing.sm,
    marginTop: Layout.spacing.md,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
    alignSelf: 'flex-start',
    marginBottom: Layout.spacing.lg,
  },
  colorOptions: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.lg,
  },
  colorBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
});