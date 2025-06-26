// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';
// import { CartProvider } from '../contexts/CartContext'; // Import cart context

// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <CartProvider>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="(view)" options={{ headerShown: false }}/>
//       </Stack>
//       <StatusBar style="light" /> {/* or "light" depending on your preference */}
//     </CartProvider>
//   );
// }

import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar'; // Import StatusBar for styling
import 'react-native-reanimated'; // Keep if you use it

import { AuthProvider, useAuth } from '../contexts/AuthContext'; // Import AuthProvider and useAuth
import { CartProvider } from '../contexts/CartContext'; // Import CartProvider

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Main App component that handles routing based on auth state
function RootNavigator() {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const router = Stack.router; // Access router from Stack

  // Manage fonts (existing from your code)
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'), // Ensure Ionicons are loaded
    // Add any other custom fonts you use
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Handle redirection based on authentication state and user role
  useEffect(() => {
    if (!fontsLoaded || isLoadingAuth) {
      // Still loading fonts or authenticating, do nothing yet
      return;
    }

    if (!isAuthenticated) {
      // If not authenticated, always go to login
      router.replace('/login');
    } else {
      // If authenticated, route based on user role
      switch (user?.role) {
        case 'customer':
          router.replace('/(tabs)'); // Go to customer's main tabs
          break;
        case 'vendor':
          router.replace('/(vendor)/products'); // Go to vendor's main screen/dashboard
          break;
        case 'delivery':
          router.replace('/(delivery)/orders'); // Go to delivery's main screen
          break;
        case 'admin':
          router.replace('/(admin)/dashboard'); // Go to admin's main screen
          break;
        default:
          // Fallback or error case
          router.replace('/login');
          break;
      }
    }
  }, [isAuthenticated, user?.role, fontsLoaded, isLoadingAuth]);


  if (!fontsLoaded || isLoadingAuth) {
    return null; // Keep splash screen visible while fonts load or auth checks
  }

  return (
    <Stack>
      {/* Login Screen (accessible only when not authenticated) */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Customer-specific screens (wrapped in tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Vendor-specific screens (will have their own layout for tabs) */}
      <Stack.Screen name="(vendor)" options={{ headerShown: false }} />

      {/* Delivery-specific screens */}
      <Stack.Screen name="(delivery)" options={{ headerShown: false }} />

      {/* Admin-specific screens */}
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />

      {/* Other general view screens (like productDetail, potentially shared) */}
      {/* Important: Ensure this is correctly setup if productDetail is outside a specific role's stack */}
      <Stack.Screen
        name="(view)/productDetail" // Assuming productDetail is directly under (view)
        options={{
          headerShown: false,
          presentation: "modal", // Product detail opens as a modal
          animation: "slide_from_bottom",
        }}
      />
      {/* Any other shared or specific screens can be added here */}
    </Stack>
  );
}

// Wrap your entire app with AuthProvider and CartProvider
export default function LayoutWrapper() {
  return (
    <AuthProvider>
      <CartProvider>
        <RootNavigator />
        <StatusBar style="dark" /> {/* Or "light" depending on your preference */}
      </CartProvider>
    </AuthProvider>
  );
}
