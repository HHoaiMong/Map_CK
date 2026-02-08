// app/navigation/AppNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProfileScreen from "../profile";
import ProfileEditScreenAdvanced from "../Profileeditscreenadvanced";

export type RootStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreenAdvanced} />
    </Stack.Navigator>
  );
}
