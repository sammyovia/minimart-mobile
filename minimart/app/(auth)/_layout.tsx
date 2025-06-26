// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      {/* Login Screen */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Register Screen */}
      <Stack.Screen name="register" options={{ headerShown: false }} />

      {/* Forgot Password Screen */}
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
    </Stack>
  );
}