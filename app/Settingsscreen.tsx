import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  expanded?: boolean;
  onToggleExpand?: () => void;
  children?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  expanded = false,
  onToggleExpand,
  children,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onToggleExpand || onPress}
        style={styles.settingItem}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon as any} size={24} color="#475569" />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <MaterialIcons
              name={"expand_more" as any}
              size={20}
              color="#94a3b8"
              style={[styles.chevron, expanded && styles.chevronRotated]}
            />
          </View>
        </View>
      </TouchableOpacity>
      {expanded && children && (
        <View style={styles.expandedContent}>{children}</View>
      )}
    </View>
  );
};

interface ThemeOption {
  id: string;
  label: string;
  selected: boolean;
}

interface NavigationMode {
  id: string;
  label: string;
  selected: boolean;
}

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [expandedItems, setExpandedItems] = useState({
    theme: true,
    navigation: true,
  });

  const [themeOptions, setThemeOptions] = useState<ThemeOption[]>([
    { id: "dark", label: "Chế độ tối", selected: true },
    { id: "light", label: "Chế độ sáng", selected: false },
    { id: "auto", label: "Tự động", selected: false },
  ]);

  const [navigationModes, setNavigationModes] = useState<NavigationMode[]>([
    { id: "driving", label: "Lái xe", selected: true },
    { id: "walking", label: "Đi bộ", selected: false },
    { id: "transit", label: "Phương tiện công cộng", selected: false },
  ]);

  const toggleExpand = (key: keyof typeof expandedItems) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectTheme = (id: string) => {
    setThemeOptions((prev) =>
      prev.map((option) => ({
        ...option,
        selected: option.id === id,
      })),
    );
  };

  const selectNavigation = (id: string) => {
    setNavigationModes((prev) =>
      prev.map((mode) => ({
        ...mode,
        selected: mode.id === id,
      })),
    );
  };

  const containerBgColor = darkMode ? "#000000" : "#ffffff";
  const textColor = darkMode ? "#ffffff" : "#0f172a";
  const separatorColor = darkMode ? "#18212f" : "#f1f5f9";
  const itemBgColor = darkMode ? "#18212f" : "#f8fafc";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: containerBgColor }]}
    >
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={containerBgColor}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Cài đặt</Text>
        <TouchableOpacity style={styles.closeButton} activeOpacity={0.7}>
          <MaterialIcons name={"close" as any} size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Theme Settings */}
        <SettingItem
          icon="dark_mode"
          title="Giao diện"
          subtitle="Chế độ tối, sáng, tự động"
          expanded={expandedItems.theme}
          onToggleExpand={() => toggleExpand("theme")}
        >
          <View
            style={[
              styles.optionsContainer,
              { marginLeft: 16, marginRight: 12 },
            ]}
          >
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => selectTheme(option.id)}
                style={[
                  styles.option,
                  option.selected && [
                    styles.optionSelected,
                    { backgroundColor: itemBgColor },
                  ],
                  !option.selected && { backgroundColor: "transparent" },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    option.selected
                      ? { color: textColor }
                      : { color: "#64748b" },
                  ]}
                >
                  {option.label}
                </Text>
                {option.selected && (
                  <MaterialIcons
                    name={"check_circle" as any}
                    size={22}
                    color="#3b82f6"
                  />
                )}
                {!option.selected && <View style={styles.radioButton} />}
              </TouchableOpacity>
            ))}
          </View>
        </SettingItem>

        <View style={[styles.separator, { backgroundColor: separatorColor }]} />

        {/* Application & Display Settings */}
        <SettingItem
          icon="map"
          title="Ứng dụng và chế độ hiển thị"
          subtitle="Giao diện, cài đặt bản đồ, khả năng tiếp cận"
        />

        {/* Navigation Settings */}
        <SettingItem
          icon="navigation"
          title="Chỉ đường"
          subtitle="Lái xe, đi bộ, phương tiện công cộng"
          expanded={expandedItems.navigation}
          onToggleExpand={() => toggleExpand("navigation")}
        >
          <View
            style={[
              styles.optionsContainer,
              { marginLeft: 16, marginRight: 12 },
            ]}
          >
            {navigationModes.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                onPress={() => selectNavigation(mode.id)}
                style={[
                  styles.option,
                  mode.selected && [
                    styles.optionSelected,
                    { backgroundColor: itemBgColor },
                  ],
                  !mode.selected && { backgroundColor: "transparent" },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    mode.selected ? { color: textColor } : { color: "#64748b" },
                  ]}
                >
                  {mode.label}
                </Text>
                {mode.selected && (
                  <MaterialIcons
                    name={"check_circle" as any}
                    size={22}
                    color="#3b82f6"
                  />
                )}
                {!mode.selected && <View style={styles.radioButton} />}
              </TouchableOpacity>
            ))}
          </View>
        </SettingItem>

        {/* Your Vehicle */}
        <SettingItem
          icon="directions_car"
          title="Xe của bạn"
          subtitle="Loại đường cơ, xe có kết nối Internet"
        />

        {/* Location & Privacy */}
        <SettingItem
          icon="location_on"
          title="Vị trí và quyền riêng tư"
          subtitle="Dòng thời gian, nhật ký trên Maps, hồ sơ"
        />

        {/* Offline Maps */}
        <SettingItem
          icon="cloud_off"
          title="Bản đồ ngoại tuyến"
          subtitle="Tùy chọn tải xuống, bản cập nhật"
        />

        {/* Notifications */}
        <SettingItem
          icon="notifications"
          title="Thông báo"
          subtitle="Lời nhắc, đề xuất"
        />

        {/* About & Terms */}
        <SettingItem icon="info" title="Giới thiệu và điều khoản" subtitle="" />

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={[styles.logoutText, { color: textColor }]}>
              Đăng xuất khỏi bản đồ
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  chevron: {
    marginRight: 4,
  },
  chevronRotated: {
    transform: [{ rotate: "180deg" }],
  },
  expandedContent: {
    marginLeft: 16,
    marginRight: 12,
    marginBottom: 8,
    gap: 2,
  },
  optionsContainer: {
    gap: 2,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  optionSelected: {
    backgroundColor: "#f8fafc",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "400",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cbd5e1",
  },
  separator: {
    height: 1,
    marginLeft: 64,
    marginRight: 12,
    marginBottom: 4,
  },
  logoutContainer: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: "500",
    paddingVertical: 16,
  },
  homeIndicator: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    width: 134,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(148, 163, 184, 0.3)",
  },
});
