import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MainTab from "./app/navigation/MainTab";

export default function App() {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
}
