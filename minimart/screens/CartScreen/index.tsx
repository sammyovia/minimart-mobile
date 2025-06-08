// app/cartScreen.tsx
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
  StyleSheet, // Import StyleSheet for local styles
} from 'react-native';
// Import global styles and constants
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { useCart } from '../../contexts/CartContext'; // Import useCart
import { Product, CartItem } from '../../types'; // Import Product and CartItem types

// A separate component for rendering each cart item for better readability and reusability
interface CartItemProps {
  item: CartItem;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  // Ensure price is a number for calculation, assuming it's a string from Product type
  const itemPrice = parseFloat(item.product.price);

  return (
    <View style={[GlobalStyles.card, localStyles.cartItemContainer]}>
      <Image source={item.product.image} style={localStyles.cartItemImage} />
      <View style={localStyles.cartItemDetails}>
        <Text style={[GlobalStyles.bodyText, localStyles.cartItemName]}>{item.product.name}</Text>
        <Text style={[GlobalStyles.priceText, localStyles.cartItemPrice]}>
          ${itemPrice.toFixed(2)}
        </Text>
        <View style={localStyles.quantityControl}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item.product.id)}
            style={GlobalStyles.quantityButton}
          >
            <Ionicons name="remove" size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={GlobalStyles.quantityButtonText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item.product.id)}
            style={GlobalStyles.quantityButton}
          >
            <Ionicons name="add" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.product.id)}
        style={localStyles.deleteButton}
      >
        <Ionicons name="trash-outline" size={24} color={Colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = () => {
  const router = useRouter();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // Calculate subtotal, shipping, and total based on actual cart items
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const shipping = 10; // Example shipping cost
  const total = subtotal + shipping;

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

      {/* Cart Screen Header: "Your Cart" with back button */}
      <View style={[GlobalStyles.contentPadding, localStyles.cartScreenHeader]}>
        <TouchableOpacity onPress={() => router.back()} style={GlobalStyles.flexRow}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
          <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>Your Cart</Text>
        </TouchableOpacity>
        {/* Number of items can be displayed here if desired */}
        <Text style={GlobalStyles.secondaryText}>{cartItems.length} items</Text>
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
              onPress={() => router.replace('/(tabs)')} // Navigate to home
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
            <Text style={GlobalStyles.bodyText}>Subtotal</Text>
            <Text style={GlobalStyles.bodyText}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={[GlobalStyles.flexRowSpaceBetween, { marginTop: Layout.spacing.sm }]}>
            <Text style={GlobalStyles.bodyText}>Shipping</Text>
            <Text style={GlobalStyles.bodyText}>${shipping.toFixed(2)}</Text>
          </View>
          <View style={[GlobalStyles.flexRowSpaceBetween, localStyles.totalRow]}>
            <Text style={GlobalStyles.heading2}>Total</Text>
            <Text style={GlobalStyles.heading2}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={GlobalStyles.primaryButton}>
            <Text style={GlobalStyles.primaryButtonText}>Checkout (${total.toFixed(2)})</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

// Local styles specific to CartScreen
const localStyles = StyleSheet.create({
  cartScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // To push item count to the right
    marginBottom: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
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
  },
  cartItemName: {
    fontWeight: '600',
    marginBottom: Layout.spacing.xs,
  },
  cartItemPrice: {
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.sm,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
    alignSelf: 'flex-start', // Align to start of its flex container
  },
  deleteButton: {
    marginLeft: Layout.spacing.md,
    padding: Layout.spacing.sm,
  },
  orderInfoContainer: {
    backgroundColor: Colors.white,
    padding: Layout.spacing.lg,
    borderTopLeftRadius: Layout.borderRadius.lg,
    borderTopRightRadius: Layout.borderRadius.lg,
    ...Layout.shadow.medium, // Apply medium shadow
    marginTop: 'auto', // Pushes it to the bottom
  },
  orderInfoTitle: {
    marginBottom: Layout.spacing.lg,
  },
  totalRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.mediumGray,
    paddingTop: Layout.spacing.md,
    marginTop: Layout.spacing.md,
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
});