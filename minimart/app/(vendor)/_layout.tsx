import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native'; // Import View and Text for custom header

// Dummy icon paths for vendor tabs - replace with actual paths
const productIconInactive = require('../../assets/images/vendor-icons/products-inactive.png'); // Example path
const productIconActive = require('../../assets/images/vendor-icons/products-active.png'); // Example path
const clientsIconInactive = require('../../assets/images/vendor-icons/clients-inactive.png'); // Example path
const clientsIconActive = require('../../assets/images/vendor-icons/clients-active.png'); // Example path
const offersIconInactive = require('../../assets/images/vendor-icons/offers-inactive.png'); // Example path
const offersIconActive = require('../../assets/images/vendor-icons/offers-active.png'); // Example path

export default function VendorTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Vendor tabs will have their own custom header if needed
        tabBarActiveTintColor: '#007AFF', // Adjust primary color for vendor UI if different
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="products" // Corresponds to app/(vendor)/products.tsx
        options={{
          title: 'Products',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? productIconActive : productIconInactive}
              style={localStyles.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clients" // Corresponds to app/(vendor)/clients.tsx
        options={{
          title: 'Clients',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? clientsIconActive : clientsIconInactive}
              style={localStyles.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="offers" // Corresponds to app/(vendor)/offers.tsx
        options={{
          title: 'Offers',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? offersIconActive : offersIconInactive}
              style={localStyles.tabIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const localStyles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  // You might want a custom header for the vendor dashboard screens
  // This could be placed directly in each vendor screen, or in a shared component
  // if all vendor screens have the same top-level header structure.
});