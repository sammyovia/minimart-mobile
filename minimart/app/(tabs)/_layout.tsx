import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, StyleSheet, View } from 'react-native'; // Import View for the background wrapper

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
// import { useColorScheme } from '@/hooks/useColorScheme'; // Keep if you use it elsewhere


const ACTIVE_TAB_BG_COLOR = '#007AFF'; 

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACTIVE_TAB_BG_COLOR, // This affects the title text and passed 'color' prop
        headerShown: false,
        tabBarButton: HapticTab, // Keep this if HapticTab is working for you
        tabBarBackground: TabBarBackground, // Keep this if TabBarBackground is working for you
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 80, // Adjust height to accommodate the background circle and text
            paddingBottom: 20, // Adjust padding to lift icons/text from bottom
            backgroundColor: 'transparent', // Keep transparent for blur effect if TabBarBackground provides it
            borderTopWidth: 0,
            elevation: 0, // Remove Android shadow property if iOS uses transparent background
            shadowOpacity: 0, // Remove iOS shadow
          },
          default: {
            height: 65, // Example height for Android
            paddingBottom: 5, // Example padding for Android
            backgroundColor: 'white', // Default background for Android
            borderTopWidth: 0,
            elevation: 5, // For Android shadow
            shadowColor: '#000', // For iOS shadow fallback (also useful for Android)
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: Platform.OS === 'ios' ? 0 : 4, // Adjust label position relative to icon
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            // Wrapper View for the circular background
            <View style={[localStyles.tabIconWrapper, focused && localStyles.tabIconWrapperActive]}>
              <Image
                source={focused
                  ? require('../../assets/images/home.png') // Path to your active home icon (white)
                  : require('../../assets/images/home.png') // Path to your inactive home icon (black/ash)
                }
                style={localStyles.tabIcon}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <View style={[localStyles.tabIconWrapper, focused && localStyles.tabIconWrapperActive]}>
              <Image
                source={focused
                  ? require('../../assets/images/cart.png') // Path to your active cart icon
                  : require('../../assets/images/cart.png') // Path to your inactive cart icon
                }
                style={localStyles.tabIcon}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <View style={[localStyles.tabIconWrapper, focused && localStyles.tabIconWrapperActive]}>
              <Image
                source={focused
                  ? require('../../assets/images/heart.png') // Path to your active favorites icon
                  : require('../../assets/images/heart.png') // Path to your inactive favorites icon
                }
                style={localStyles.tabIcon}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={[localStyles.tabIconWrapper, focused && localStyles.tabIconWrapperActive]}>
              <Image
                source={focused
                  ? require('../../assets/images/profile.png') // Path to your active profile icon
                  : require('../../assets/images/profile.png') // Path to your inactive profile icon
                }
                style={localStyles.tabIcon}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const localStyles = StyleSheet.create({
  tabIconWrapper: {
    width: 50, // Diameter of the circular background
    height: 50, // Diameter of the circular background
    borderRadius: 25, // Half of width/height for a perfect circle
    justifyContent: 'center', // Center icon horizontally
    alignItems: 'center', // Center icon vertically
    marginBottom: 5, // Space between the icon background and the text label
    backgroundColor: 'transparent', // Default transparent background for inactive state
    // For the active state, the backgroundColor will be set by tabIconWrapperActive
  },
  tabIconWrapperActive: {
    backgroundColor: ACTIVE_TAB_BG_COLOR, // Background color when the tab is active
    borderWidth: 1, // Add border to match the screenshot
    borderColor: ACTIVE_TAB_BG_COLOR, // Border color same as background for a solid look
  },
  tabIcon: {
    width: 28, // Size of the actual image icon
    height: 28, // Size of the actual image icon
    resizeMode: 'contain', // Ensures the entire image is visible within the bounds
    // IMPORTANT: Do NOT use `tintColor` here if your active and inactive icons are
    // separate image files with their own colors (e.g., home-active.png is white, home-inactive.png is black).
    // If your images are monochrome and you want to dynamically color them, uncomment:
    // tintColor: 'white', // Example: for active icon inside colored bubble
  },
});