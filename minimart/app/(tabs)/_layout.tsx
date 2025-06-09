import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, StyleSheet } from 'react-native'; // Import Image and StyleSheet

import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol'; // No longer needed for image icons
import TabBarBackground from '@/components/ui/TabBarBackground';
// import { useColorScheme } from '@/hooks/useColorScheme'; // Keep if you use it elsewhere

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // This will now primarily affect the title text, as images handle icon color
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            // You might need to adjust height/padding here for your custom images
            height: 80, // Example height, adjust as needed
            paddingBottom: 20, // Example padding, adjust as needed to lift icons/text
          },
          default: {
            height: 60, // Example height for Android
            paddingBottom: 5, // Example padding for Android
          },
        }),
        // Optional: Style for the tab bar label (text)
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../../assets/images/home-active.png') // Your active home icon
                : require('../../assets/images/home-active.png') // Your inactive home icon (black version)
              }
              style={localStyles.tabIcon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../../assets/images/cart.png') // Replace with your active cart icon
                : require('../../assets/images/cart.png') // Replace with your inactive cart icon
              }
              style={localStyles.tabIcon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../../assets/images/heart.png') // Replace with your active favorites icon
                : require('../../assets/images/heart.png') // Replace with your inactive favorites icon
              }
              style={localStyles.tabIcon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../../assets/images/profile.png') // Replace with your active profile icon
                : require('../../assets/images/profile.png') // Replace with your inactive profile icon
              }
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
    width: 28, // Adjust icon size to match your design
    height: 28, // Adjust icon size to match your design
    resizeMode: 'contain', // Ensures the entire image is visible within the bounds
    // If your images are already colored correctly, you might not need tintColor
    // If you want to dynamically tint a single-color icon, use:
    // tintColor: 'your_desired_color',
  },
});