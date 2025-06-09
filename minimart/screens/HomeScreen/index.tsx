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
  StyleSheet,
  TextInput,
} from 'react-native';
import { products } from '../../data/products'; // Make sure this path is correct
import { Product } from '../../types';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[GlobalStyles.card, localStyles.productCard]}
      // ONLY pass the product ID, not the whole JSON.stringified object
      onPress={() =>
        router.push({
          pathname: '/(view)/productDetail',
          params: { productId: item.id.toString() }, // <--- Change: Pass product ID as string
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
  sectionHeader: {
    marginBottom: Layout.spacing.md,
    marginTop: Layout.spacing.sm,
  },
  productCard: {
    flex: 1,
    margin: Layout.spacing.xs,
    padding: Layout.spacing.sm,
    maxWidth: (Layout.window.width / 2) - (Layout.spacing.lg + Layout.spacing.xs * 2),
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
    height: 40,
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