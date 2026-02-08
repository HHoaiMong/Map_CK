import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MainTab() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "index", icon: "home" as const, route: "/", label: "Trang chủ" },
    {
      name: "alerts",
      icon: "notifications" as const,
      route: "/alerts",
      label: "Cảnh báo",
    },
    {
      name: "profile",
      icon: "person" as const,
      route: "/profile",
      label: "Cá nhân",
    },
    {
      name: "explore",
      icon: "search" as const,
      route: "/explore",
      label: "Khám phá",
    },
    {
      name: "news",
      icon: "newspaper" as const,
      route: "/news",
      label: "Tin tức",
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? "#00f2ff" : "rgba(255,255,255,0.3)"}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#000000",
    height: 80,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 0.5,
  },
  labelActive: {
    color: "#00f2ff",
  },
});
