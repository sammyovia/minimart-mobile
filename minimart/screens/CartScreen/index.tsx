// CartScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from '../../types'; // Ensure your Product and CartItem types are correctly defined here

interface CartItemProps {
  item: CartItem;
  increaseQuantity: (productId: number) => void; // Fixed product.Id to productId
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const itemPrice = parseFloat(item.product.price);

  return (
    <View style={[GlobalStyles.card, localStyles.cartItemContainer]}>
      <Image source={item.product.image} style={localStyles.cartItemImage} />
      <View style={localStyles.cartItemDetails}>
        {/* Product Name */}
        <Text style={localStyles.cartItemNameText}>{item.product.name}</Text>
        {/* Price and "In stock" */}
        <Text style={localStyles.cartItemPriceText}>${itemPrice.toFixed(2)}</Text>
        <Text style={localStyles.inStockText}>In stock</Text>
        {/* Quantity Control */}
        <View style={localStyles.quantityControl}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item.product.id)}
            style={localStyles.quantityButton}
          >
            <Ionicons name="remove" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
          <Text style={localStyles.quantityButtonText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item.product.id)}
            style={localStyles.quantityButton}
          >
            <Ionicons name="add" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => removeFromCart(item.product.id)}
        style={localStyles.deleteButton}
      >
        <Ionicons name="trash-outline" size={24} color={Colors.darkGray} /> {/* Changed color to darkGray */}
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = () => {
  const router = useRouter();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <SafeAreaView
      style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}
    >
      {/* Top Header Section: Logo, Delivery Address, Notification */}
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

      {/* Cart Screen Header: "Your Cart" with back button */}
      <View style={[GlobalStyles.contentPadding, localStyles.cartScreenHeader]}>
        <TouchableOpacity onPress={() => router.back()} style={GlobalStyles.flexRow}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
          <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>Your Cart</Text>
        </TouchableOpacity>
        <Text style={localStyles.itemCountText}>{cartItems.length} items</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <CartItemComponent
            item={item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        )}
        contentContainerStyle={localStyles.cartListContent}
        ListEmptyComponent={
          <View style={localStyles.emptyCartContainer}>
            <Ionicons name="cart-outline" size={80} color={Colors.darkGray} />
            <Text style={[GlobalStyles.bodyText, localStyles.emptyCartText]}>Your cart is empty.</Text>
            <TouchableOpacity
              style={[GlobalStyles.primaryButton, { marginTop: Layout.spacing.lg }]}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={GlobalStyles.primaryButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Order Info and Checkout Button (only show if cart is not empty) */}
      {cartItems.length > 0 && (
        <View style={localStyles.orderInfoContainer}>
          <Text style={[GlobalStyles.heading2, localStyles.orderInfoTitle]}>Order Info</Text>
          <View style={GlobalStyles.flexRowSpaceBetween}>
            <Text style={localStyles.orderInfoLabel}>Subtotal</Text>
            <Text style={localStyles.orderInfoValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={[GlobalStyles.flexRowSpaceBetween, { marginTop: Layout.spacing.sm }]}>
            <Text style={localStyles.orderInfoLabel}>Shipping</Text>
            <Text style={localStyles.orderInfoValue}>${shipping.toFixed(2)}</Text>
          </View>
          <View style={[GlobalStyles.flexRowSpaceBetween, localStyles.totalRow]}>
            <Text style={localStyles.totalLabel}>Total</Text>
            <Text style={localStyles.totalValue}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={[GlobalStyles.primaryButton, localStyles.checkoutButton]}>
            <Text style={GlobalStyles.primaryButtonText}>Checkout (${total.toFixed(2)})</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const localStyles = StyleSheet.create({
  cartScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
  },
  itemCountText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  cartListContent: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.sm,
    marginBottom: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md, // Match card styling
    backgroundColor: Colors.white, // Match card background
    ...Layout.shadow.light, // Add subtle shadow for each item card
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.sm,
    marginRight: Layout.spacing.md,
    resizeMode: 'contain',
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.xs, // Add some vertical padding inside details
  },
  cartItemNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  cartItemPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Layout.spacing.xs,
  },
  inStockText: {
    fontSize: 12,
    color: Colors.success, // Use a green color for "In stock"
    marginBottom: Layout.spacing.sm,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: Layout.borderRadius.md,
    // Adjust padding to make buttons look better
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    padding: Layout.spacing.xs,
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginHorizontal: Layout.spacing.sm, // Space between number and buttons
  },
  deleteButton: {
    marginLeft: Layout.spacing.md,
    padding: Layout.spacing.sm,
    // Add margin to align with the bottom of the card content
    alignSelf: 'flex-end',
    marginBottom: Layout.spacing.xs, // Push it slightly up from the very bottom edge
  },
  orderInfoContainer: {
    backgroundColor: Colors.white,
    padding: Layout.spacing.lg,
    borderTopLeftRadius: Layout.borderRadius.lg,
    borderTopRightRadius: Layout.borderRadius.lg,
    ...Layout.shadow.medium,
    marginTop: 'auto',
  },
  orderInfoTitle: {
    marginBottom: Layout.spacing.lg,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  orderInfoLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  orderInfoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.mediumGray,
    paddingTop: Layout.spacing.md,
    marginTop: Layout.spacing.md,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xxl,
  },
  emptyCartText: {
    marginTop: Layout.spacing.md,
    color: Colors.darkGray,
  },
  checkoutButton: {
    width: '100%',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    marginTop: Layout.spacing.lg,
  },
});