import { Stack } from 'expo-router';
import React from 'react';

export default function ViewLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="paylater"
        options={{
          title: "Pay Later",
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}