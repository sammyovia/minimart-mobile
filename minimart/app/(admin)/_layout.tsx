import { Stack } from 'expo-router';
import React from 'react';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard" // Corresponds to app/(admin)/dashboard.tsx
        options={{
          headerShown: false,
          title: "Admin Dashboard"
        }}
      />
      {/* Add other admin-specific screens here (e.g., User Management, Reports) */}
    </Stack>
  );
}