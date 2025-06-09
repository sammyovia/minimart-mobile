// HomeScreen.tsx
import { router } from 'expo-router';
import React, { useState } from 'react'; // Import useState
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import { products } from '../../data/products';
import { Product } from '../../types';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for categories - you can expand this with more real data
const categories = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Fashion' },
  { id: '3', name: 'Food' },
  { id: '4', name: 'Home' },
  { id: '5', name: 'Books' },
  { id: '6', name: 'Sports' },
];

const HomeScreen = () => {
  // State to manage the currently selected category filter
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id); // Default to 'Technology'

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[GlobalStyles.card, localStyles.productCard]}
      //Pass the product ID
      onPress={() =>
        router.push({
          pathname: '/(view)/productDetail',
          params: { productId: item.id.toString() }, // Pass product ID as string
        })
      }
    >
      <Image source={item.image} style={localStyles.productImage} />
      <Text style={[GlobalStyles.bodyText, localStyles.productName]}>{item.name}</Text>
      <Text style={[GlobalStyles.priceText, localStyles.productPrice]}>${item.price}</Text>
    </TouchableOpacity>
  );

  // Render function for each category item
  const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => {
    const isActive = item.id === selectedCategory;
    return (
      <TouchableOpacity
        style={[
          localStyles.categoryButton,
          isActive ? localStyles.categoryButtonActive : localStyles.categoryButtonInactive,
        ]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Text
          style={[
            localStyles.categoryButtonText,
            isActive ? localStyles.categoryButtonTextActive : localStyles.categoryButtonTextInactive,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

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

      {/* Category Filter Section */}
      <View style={localStyles.categoryFilterContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localStyles.categoryListContent}
        />
      </View>

      {/* Main Content Area */}
      {/* Moved contentPadding here to apply to the product list and its header */}
      <View style={[GlobalStyles.contentPadding, localStyles.contentWrapper]}>
        <Text style={[GlobalStyles.heading2, localStyles.sectionHeader]}>
          Smartphones, Laptops & Accessories
        </Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderProductItem} // Renamed renderItem to renderProductItem for clarity
          contentContainerStyle={localStyles.flatListContent}
          columnWrapperStyle={localStyles.columnWrapper}
        />
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  // Styles for the Category Filter section
  categoryFilterContainer: {
    // Add horizontal padding if you want space before the first category
    paddingVertical: Layout.spacing.sm,
    // Using a negative left margin to offset the FlatList's default padding,
    // ensuring categories start from the screen edge if contentPadding exists
    // in the parent, and allowing the first item to align with contentPadding.
    // If you want space on both sides, use paddingHorizontal directly on FlatList.
  },
  categoryListContent: {
    paddingHorizontal: Layout.spacing.lg, // Align with other content padding
    gap: Layout.spacing.sm, // Space between category buttons
  },
  categoryButton: {
    borderRadius: Layout.borderRadius.xl, // Fully rounded
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  categoryButtonInactive: {
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  categoryButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: Colors.white,
  },
  categoryButtonTextInactive: {
    color: Colors.textSecondary,
  },
  // Existing styles for products
  sectionHeader: {
    marginBottom: Layout.spacing.md,
    marginTop: Layout.spacing.sm, // Keep some margin above the header
  },
  productCard: {
    flex: 1,
    margin: Layout.spacing.xs,
    padding: Layout.spacing.sm,
    maxWidth: (Layout.window.width / 2) - (Layout.spacing.lg + Layout.spacing.xs * 2), // Recalculate based on outer contentPadding
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.sm,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
    height: 40, // Ensure consistent height for names
  },
  productPrice: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.primary,
  },
  flatListContent: {
    paddingBottom: Layout.spacing.lg,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;