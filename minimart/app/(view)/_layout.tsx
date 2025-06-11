import { Stack } from 'expo-router';
import React from 'react';

export default function ViewLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="productDetail"
        options={{
          title: "Product Details",
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}