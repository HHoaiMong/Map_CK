import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "./contexts/userContext"; // ← chữ thường

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="alerts" />
        <Stack.Screen name="news" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="navigation" />
        <Stack.Screen name="screens" />
      </Stack>
    </UserProvider>
  );
}
