import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';

export default function ViewLayout() {
  const colorScheme = useColorScheme();

  return (
     <Stack.Screen
        name="productDetail"
        options={{
          title: "Product Details",
          headerShown: false,
          headerShadowVisible: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
  );
}
