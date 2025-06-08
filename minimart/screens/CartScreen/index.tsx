import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';

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

export default CartScreen;
