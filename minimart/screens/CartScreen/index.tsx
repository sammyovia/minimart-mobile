// CartScreen.tsx
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/types';

const cartItems = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max',
    price: 1200,
    quantity: 1,
    image: require('../assets/iphone.png'),
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    price: 2500,
    quantity: 1,
    image: require('../assets/macbook.png'),
  },
  {
    id: '3',
    name: 'Apple Watch Series 8',
    price: 350,
    quantity: 1,
    image: require('../assets/watch.png'),
  },
];

const CartScreen = () => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <Text style={styles.quantity}>x{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Cart" />
      <View style={styles.cartHeader}>
        <Text style={styles.cartTitle}>Your Cart (3 items)</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.orderInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Subtotal</Text>
          <Text style={styles.infoValue}>${subtotal}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Shipping</Text>
          <Text style={styles.infoValue}>${shipping}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTotal}>Total</Text>
          <Text style={styles.infoTotal}>${total}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout</Text>
        <Text style={styles.checkoutText}>${total}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  cartHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  cartTitle: {
    ...Typography.heading,
    fontSize: 16,
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    ...Typography.body,
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  quantity: {
    fontWeight: '600',
    color: Colors.muted,
  },
  listContent: {
    paddingBottom: 150,
  },
  orderInfo: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    color: Colors.muted,
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
