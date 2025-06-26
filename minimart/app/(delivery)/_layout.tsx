// app/(delivery)/_layout.tsx (NEW FILE)
import { Stack } from 'expo-router';
import React from 'react';

export default function DeliveryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="orders" // Corresponds to app/(delivery)/orders.tsx
        options={{
          headerShown: false, // Custom header within the screen
          title: "Delivery Orders",
          animation: "slide_from_right", // Optional animation for the screen transition
        }}
      />
      {/* Add other delivery-specific screens here */}
    </Stack>
  );
}