// HomeScreen.tsx
import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet, // Import StyleSheet for local styles
  TextInput, // For the search bar
} from 'react-native';
import { products } from '../../data/products'; // Make sure this path is correct
import { Product } from '../../types'; // Make sure this path is correct
import { GlobalStyles } from '../../styles/GlobalStyles'; // Import global styles
import { Colors } from '../../constants/Colors'; // Import Colors
import { Layout } from '../../constants/Layout'; // Import Layout
import { Ionicons } from '@expo/vector-icons'; // For search icon and notification icon

const HomeScreen = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[GlobalStyles.card, localStyles.productCard]} // Apply global card style + local spacing/sizing
      onPress={() =>
        router.push({
          pathname: '/(view)/productDetail',
          params: { product: JSON.stringify(item) },
        })
      }
    >
      <Image source={item.image} style={localStyles.productImage} />
      <Text style={[GlobalStyles.bodyText, localStyles.productName]}>{item.name}</Text>
      <Text style={[GlobalStyles.priceText, localStyles.productPrice]}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
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

      {/* Search Bar */}
      <View style={GlobalStyles.searchInputContainer}>
        <Ionicons name="search" size={20} color={Colors.darkGray} style={GlobalStyles.searchIcon} />
        <TextInput
          style={GlobalStyles.searchInput}
          placeholder="Search..."
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      {/* Main Content Area */}
      <View style={[GlobalStyles.contentPadding, localStyles.contentWrapper]}>
        <Text style={[GlobalStyles.heading2, localStyles.sectionHeader]}>
          Smartphones, Laptops & Accessories
        </Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={localStyles.flatListContent}
          columnWrapperStyle={localStyles.columnWrapper} // For spacing between columns
        />
      </View>
    </SafeAreaView>
  );
};

// Local styles for HomeScreen, specific to its layout and components
const localStyles = StyleSheet.create({
  contentWrapper: {
    flex: 1, // Allow content to take remaining space
  },
  sectionHeader: {
    marginBottom: Layout.spacing.md,
    marginTop: Layout.spacing.sm,
  },
  productCard: {
    flex: 1, // Allows cards to share space in a column
    margin: Layout.spacing.xs, // Small margin around each card
    padding: Layout.spacing.sm,
    maxWidth: (Layout.window.width / 2) - (Layout.spacing.lg + Layout.spacing.xs * 2), // Calculate max width for 2 columns with padding
    alignItems: 'center',
  },
  productImage: {
    width: '100%', // Take full width of card
    height: 120, // Fixed height for consistency
    resizeMode: 'contain', // Or 'cover' depending on desired crop
    marginBottom: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.sm,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
    height: 40, // Fixed height for two lines of text to prevent jumpy layout
  },
  productPrice: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.primary, // Price highlighted with primary color
  },
  flatListContent: {
    paddingBottom: Layout.spacing.lg, // Padding at the bottom of the list
  },
  columnWrapper: {
    justifyContent: 'space-between', // Distribute items evenly in a row
  },
});

export default HomeScreen;