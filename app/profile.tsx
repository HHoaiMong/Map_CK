import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "./contexts/userContext";
import MainTab from "./navigation/MainTab";

// ==================== TYPES ====================
interface StatCard {
  icon: string;
  value: string;
  label: string;
  color: string;
}

interface MenuItem {
  id: number;
  icon: string;
  label: string;
  iconColor: string;
  bgColor: string;
}

interface SettingItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  expandable: boolean;
  subSettings?: SubSetting[];
}

interface SubSetting {
  id: string;
  label: string;
  enabled: boolean;
}

interface ExpandedSections {
  [key: number]: boolean;
}

interface Report {
  id: number;
  title: string;
  location: string;
  date: string;
  status: "verified" | "pending" | "rejected";
  category: string;
  categoryIcon: string;
  categoryColor: string;
}

interface SavedLocation {
  id: number;
  name: string;
  address: string;
  category: "home" | "work" | "favorite" | "other";
  latitude: number;
  longitude: number;
  savedDate: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  icon: string;
  timestamp: string;
  read: boolean;
}

// ==================== MAIN COMPONENT ====================
export default function ProfileTab() {
  const router = useRouter();
  const { user } = useUser();

  // ==================== MAIN SCREENS STATE ====================
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<
    | "profile"
    | "reportHistory"
    | "savedLocations"
    | "notifications"
    | "securityPrivacy"
  >("profile");

  // ==================== SETTINGS STATE ====================
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {},
  );
  const [subSettingsState, setSubSettingsState] = useState<{
    [key: string]: boolean;
  }>({
    "giao-dien-dark": true,
    "giao-dien-light": false,
    "giao-dien-auto": true,
    "ung-dung-che-do": true,
    "chi-duong-lai-xe": true,
    "chi-duong-di-bo": true,
    "chi-duong-giao-thong": false,
    "xe-dong-co": true,
    "xe-ket-noi-internet": true,
    "vi-tri-dong-thoi-gian": true,
    "vi-tri-nhat-ky": true,
    "vi-tri-ho-so": false,
    "ban-do-tuy-chon": true,
    "ban-do-cap-nhat": true,
    "thong-bao-nho-nhan": true,
    "thong-bao-de-xuat": true,
  });

  // ==================== REPORT HISTORY STATE ====================
  const [filterStatus, setFilterStatus] = useState<
    "all" | "verified" | "pending" | "rejected"
  >("all");

  const reports: Report[] = [
    {
      id: 1,
      title: "Tai nạn giao thông",
      location: "Đường Nguyễn Huệ, TP.HCM",
      date: "20/01/2024 14:30",
      status: "verified",
      category: "Tai nạn",
      categoryIcon: "alert-circle",
      categoryColor: "#ef4444",
    },
    {
      id: 2,
      title: "Tắc đường nặng",
      location: "Cầu Sài Gòn, TP.HCM",
      date: "19/01/2024 08:15",
      status: "verified",
      category: "Tắc đường",
      categoryIcon: "traffic-light",
      categoryColor: "#f59e0b",
    },
    {
      id: 3,
      title: "Công trình đường bộ",
      location: "Đường Lê Lợi, TP.HCM",
      date: "18/01/2024 10:45",
      status: "pending",
      category: "Công trình",
      categoryIcon: "hammer-wrench",
      categoryColor: "#8b5cf6",
    },
    {
      id: 4,
      title: "Tình trạng đường xấu",
      location: "Đường Trường Chinh, TP.HCM",
      date: "17/01/2024 16:20",
      status: "verified",
      category: "Đường xấu",
      categoryIcon: "road",
      categoryColor: "#6b7280",
    },
    {
      id: 5,
      title: "Phương tiện bị hỏng",
      location: "Đại lộ Thăng Long, Hà Nội",
      date: "16/01/2024 09:00",
      status: "rejected",
      category: "Phương tiện",
      categoryIcon: "car-broken",
      categoryColor: "#dc2626",
    },
    {
      id: 6,
      title: "Cảnh báo tốc độ",
      location: "Đường Bạch Đằng, Hải Phòng",
      date: "15/01/2024 13:30",
      status: "verified",
      category: "Tốc độ",
      categoryIcon: "speedometer",
      categoryColor: "#f97316",
    },
  ];

  // ==================== SAVED LOCATIONS STATE ====================
  const [locations, setLocations] = useState<SavedLocation[]>([
    {
      id: 1,
      name: "Nhà riêng",
      address: "Đường Nguyễn Huệ, Quận 1, TP.HCM",
      category: "home",
      latitude: 10.7769,
      longitude: 106.7009,
      savedDate: "15/01/2024",
    },
    {
      id: 2,
      name: "Nơi làm việc",
      address: "Tòa nhà Sài Gòn Trade, TP.HCM",
      category: "work",
      latitude: 10.7758,
      longitude: 106.7018,
      savedDate: "10/01/2024",
    },
    {
      id: 3,
      name: "Quán cà phê yêu thích",
      address: "Đường Lê Lợi, Quận 1, TP.HCM",
      category: "favorite",
      latitude: 10.7745,
      longitude: 106.6995,
      savedDate: "08/01/2024",
    },
    {
      id: 4,
      name: "Trung tâm thương mại",
      address: "Crescent Mall, Quận 7, TP.HCM",
      category: "other",
      latitude: 10.7326,
      longitude: 106.7261,
      savedDate: "05/01/2024",
    },
  ]);

  // ==================== NOTIFICATIONS STATE ====================
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Báo cáo được xác nhận",
      message:
        "Báo cáo của bạn về tai nạn giao thông đã được xác nhận bởi cộng đồng.",
      type: "success",
      icon: "check-circle",
      timestamp: "2 giờ trước",
      read: false,
    },
    {
      id: 2,
      title: "Cảnh báo giao thông",
      message: "Có tắc đường nặng trên tuyến đường bạn thường đi.",
      type: "warning",
      icon: "alert-circle",
      timestamp: "5 giờ trước",
      read: false,
    },
    {
      id: 3,
      title: "Cập nhật ứng dụng",
      message: "Phiên bản 2.5.0 đã sẵn sàng cập nhật với các tính năng mới.",
      type: "info",
      icon: "information-outline",
      timestamp: "1 ngày trước",
      read: true,
    },
    {
      id: 4,
      title: "Hạng badge mới",
      message: "Bạn đã đạt được hạng 'Nước mắt' với 100 báo cáo xác nhận.",
      type: "success",
      icon: "star",
      timestamp: "3 ngày trước",
      read: true,
    },
  ]);

  // ==================== SECURITY & PRIVACY STATE ====================
  const [securitySettings, setSecuritySettings] = useState<{
    [key: number]: boolean;
  }>({
    1: true,
    2: false,
    3: true,
  });

  const [privacySettings, setPrivacySettings] = useState<{
    [key: number]: boolean;
  }>({
    1: true,
    2: false,
    3: true,
    4: false,
  });

  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] =
    useState(false);

  // ==================== DATA ====================
  const stats: StatCard[] = [
    {
      icon: "bullhorn",
      value: user.stats.reports.toString(),
      label: "Báo cáo",
      color: "#3b82f6",
    },
    {
      icon: "check-circle",
      value: user.stats.confirmations.toString(),
      label: "Xác nhận",
      color: "#4ade80",
    },
    {
      icon: "trophy-award",
      value: `${(user.stats.points / 1000).toFixed(1)}k`,
      label: "Điểm",
      color: "#fbbf24",
    },
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      icon: "history",
      label: "Lịch sử báo cáo",
      iconColor: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      id: 2,
      icon: "bookmark",
      label: "Địa điểm đã lưu",
      iconColor: "#ec4899",
      bgColor: "rgba(236, 72, 153, 0.1)",
    },
    {
      id: 3,
      icon: "bell-ring",
      label: "Thông báo",
      iconColor: "#fbbf24",
      bgColor: "rgba(251, 191, 36, 0.1)",
    },
    {
      id: 4,
      icon: "shield-account",
      label: "Bảo mật & Quyền riêng tư",
      iconColor: "#9ca3af",
      bgColor: "rgba(156, 163, 175, 0.1)",
    },
  ];

  const settingsItems: SettingItem[] = [
    {
      id: 1,
      icon: "weather-night",
      title: "Giao diện",
      description: "Chế độ tối, sáng, tự động",
      expandable: true,
      subSettings: [
        { id: "giao-dien-dark", label: "Chế độ tối", enabled: true },
        { id: "giao-dien-light", label: "Chế độ sáng", enabled: false },
        { id: "giao-dien-auto", label: "Tự động", enabled: true },
      ],
    },
    {
      id: 2,
      icon: "map-outline",
      title: "Ứng dụng và chế độ hiển thị",
      description: "Giao diện, cài đặt bản đồ, khả năng tiếp cận",
      expandable: true,
      subSettings: [
        {
          id: "ung-dung-che-do",
          label: "Bật chế độ hiển thị",
          enabled: true,
        },
      ],
    },
    {
      id: 3,
      icon: "navigation",
      title: "Chỉ đường",
      description: "Lái xe, đi bộ, phương tiện công cộng",
      expandable: true,
      subSettings: [
        { id: "chi-duong-lai-xe", label: "Lái xe", enabled: true },
        { id: "chi-duong-di-bo", label: "Đi bộ", enabled: true },
        {
          id: "chi-duong-giao-thong",
          label: "Phương tiện công cộng",
          enabled: false,
        },
      ],
    },
    {
      id: 4,
      icon: "car",
      title: "Xe của bạn",
      description: "Loại động cơ, xe có kết nối Internet",
      expandable: true,
      subSettings: [
        { id: "xe-dong-co", label: "Xe động cơ", enabled: true },
        {
          id: "xe-ket-noi-internet",
          label: "Xe có kết nối Internet",
          enabled: true,
        },
      ],
    },
    {
      id: 5,
      icon: "map-marker",
      title: "Vị trí và quyền riêng tư",
      description: "Dòng thời gian, nhật ký trên Maps, hồ sơ",
      expandable: true,
      subSettings: [
        { id: "vi-tri-dong-thoi-gian", label: "Dòng thời gian", enabled: true },
        { id: "vi-tri-nhat-ky", label: "Nhật ký trên Maps", enabled: true },
        { id: "vi-tri-ho-so", label: "Hồ sơ", enabled: false },
      ],
    },
    {
      id: 6,
      icon: "cloud-off-outline",
      title: "Bản đồ ngoại tuyến",
      description: "Tùy chọn tải xuống, bản cập nhật",
      expandable: true,
      subSettings: [
        {
          id: "ban-do-tuy-chon",
          label: "Tùy chọn tải xuống",
          enabled: true,
        },
        { id: "ban-do-cap-nhat", label: "Bản cập nhật", enabled: true },
      ],
    },
    {
      id: 7,
      icon: "bell-outline",
      title: "Thông báo",
      description: "Lời nhắc, đề xuất",
      expandable: true,
      subSettings: [
        { id: "thong-bao-nho-nhan", label: "Lời nhắc", enabled: true },
        { id: "thong-bao-de-xuat", label: "Đề xuất", enabled: true },
      ],
    },
  ];

  const securityOptions = [
    {
      id: 1,
      icon: "shield-check",
      title: "Xác thực hai yếu tố",
      description: "Bảo vệ tài khoản của bạn bằng xác thực hai yếu tố",
      hasToggle: true,
    },
    {
      id: 2,
      icon: "fingerprint",
      title: "Khóa sinh trắc học",
      description: "Sử dụng vân tay hoặc khuôn mặt để mở khóa ứng dụng",
      hasToggle: true,
    },
    {
      id: 3,
      icon: "lock",
      title: "Thay đổi mật khẩu",
      description: "Cập nhật mật khẩu của bạn thường xuyên",
      hasToggle: false,
    },
  ];

  const privacyOptions = [
    {
      id: 1,
      icon: "eye",
      title: "Hồ sơ công khai",
      description: "Cho phép người khác xem hồ sơ của bạn",
      hasToggle: true,
    },
    {
      id: 2,
      icon: "map",
      title: "Chia sẻ vị trí thời gian thực",
      description: "Chia sẻ vị trí của bạn với bạn bè",
      hasToggle: true,
    },
    {
      id: 3,
      icon: "history",
      title: "Lịch sử vị trí",
      description: "Lưu lịch sử vị trí của bạn để cải thiện dịch vụ",
      hasToggle: true,
    },
    {
      id: 4,
      icon: "email",
      title: "Email tiếp thị",
      description: "Nhận email về các tính năng và cập nhật mới",
      hasToggle: true,
    },
  ];

  // ==================== HANDLERS ====================

  // Settings Handlers
  const toggleSection = (itemId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleSubSetting = (settingId: string) => {
    setSubSettingsState((prev) => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };

  // Report History Handlers
  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "#4ade80";
      case "pending":
        return "#fbbf24";
      case "rejected":
        return "#f87171";
      default:
        return "#6b7280";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "verified":
        return "Đã xác nhận";
      case "pending":
        return "Đang chờ";
      case "rejected":
        return "Từ chối";
      default:
        return "Chưa xác định";
    }
  };

  const filteredReports =
    filterStatus === "all"
      ? reports
      : reports.filter((r) => r.status === filterStatus);

  // Saved Locations Handlers
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "home":
        return "home";
      case "work":
        return "briefcase";
      case "favorite":
        return "heart";
      case "other":
        return "map-marker";
      default:
        return "map-marker";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "home":
        return "Nhà riêng";
      case "work":
        return "Nơi làm việc";
      case "favorite":
        return "Yêu thích";
      case "other":
        return "Khác";
      default:
        return "Khác";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "home":
        return "#3b82f6";
      case "work":
        return "#8b5cf6";
      case "favorite":
        return "#ec4899";
      case "other":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const handleDeleteLocation = (id: number) => {
    Alert.alert(
      "Xóa địa điểm",
      "Bạn có chắc chắn muốn xóa địa điểm này không?",
      [
        {
          text: "Hủy",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            setLocations(locations.filter((loc) => loc.id !== id));
          },
          style: "destructive",
        },
      ],
    );
  };

  // Notifications Handlers
  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "#4ade80";
      case "warning":
        return "#fbbf24";
      case "error":
        return "#f87171";
      case "info":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Security & Privacy Handlers
  const handleSecurityToggle = (id: number) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrivacyToggle = (id: number) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteAccountPress = () => {
    setShowDeleteAccountConfirm(true);
  };

  const confirmDeleteAccount = () => {
    console.log("User confirmed account deletion");
    setShowDeleteAccountConfirm(false);
    setShowSettings(false);
    setCurrentScreen("profile");
    // Thêm logic xóa tài khoản ở đây
  };

  const cancelDeleteAccount = () => {
    setShowDeleteAccountConfirm(false);
  };

  const handleLogoutPress = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    console.log("User confirmed logout");
    setShowLogoutConfirm(false);
    setShowSettings(false);
    setCurrentScreen("profile");
    // Thêm logic đăng xuất ở đây
    // router.push("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleEditProfile = () => {
    router.push("/Profileeditscreenadvanced");
  };

  const handleMenuPress = (id: number) => {
    if (id === 1) {
      setCurrentScreen("reportHistory");
    } else if (id === 2) {
      setCurrentScreen("savedLocations");
    } else if (id === 3) {
      setCurrentScreen("notifications");
    } else if (id === 4) {
      setCurrentScreen("securityPrivacy");
    }
  };

  // ==================== RENDER METHODS ====================

  const renderProfileScreen = () => (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowSettings(true)}
          >
            <MaterialCommunityIcons name="cog" size={24} color="#d1d5db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hồ sơ Cá nhân</Text>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleEditProfile}
          >
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={24}
              color="#d1d5db"
            />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarRing}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              </View>
              {user.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>VERIFIED</Text>
                </View>
              )}
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.memberSince}>
                Thành viên từ {user.memberSince}
              </Text>

              {/* Trust Score Badge */}
              <View style={styles.trustBadge}>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={18}
                  color="#3b82f6"
                />
                <Text style={styles.trustText}>
                  Độ tin cậy: {user.trustScore}%
                </Text>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <TouchableOpacity
                key={index}
                style={styles.statCard}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={stat.icon as any}
                  size={24}
                  color={stat.color}
                />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section Title */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>HOẠT ĐỘNG & THIẾT LẬP</Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={() => handleMenuPress(item.id)}
              >
                <View style={styles.menuLeft}>
                  <View
                    style={[
                      styles.menuIconContainer,
                      { backgroundColor: item.bgColor },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={24}
                      color={item.iconColor}
                    />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#4b5563"
                />
              </TouchableOpacity>
            ))}

            {/* Logout Button */}
            <View style={styles.logoutSection}>
              <TouchableOpacity
                style={styles.logoutButton}
                activeOpacity={0.7}
                onPress={handleLogoutPress}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color="#f87171"
                />
                <Text style={styles.logoutText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerVersion}>
              Phiên bản 2.4.0 (Build 108)
            </Text>
            <Text style={styles.footerCopyright}>
              CỘNG ĐỒNG GIAO THÔNG VIỆT NAM
            </Text>
          </View>

          {/* Bottom Spacing for MainTab */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation - MainTab Component */}
      <MainTab />
    </View>
  );

  const renderReportHistoryScreen = () => (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen("profile")}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#d1d5db"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lịch sử báo cáo</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{reports.length}</Text>
            <Text style={styles.statLabel}>Tổng báo cáo</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {reports.filter((r) => r.status === "verified").length}
            </Text>
            <Text style={styles.statLabel}>Đã xác nhận</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {reports.filter((r) => r.status === "pending").length}
            </Text>
            <Text style={styles.statLabel}>Đang chờ</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterStatus === "all" && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus("all")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterStatus === "all" && styles.filterButtonTextActive,
              ]}
            >
              Tất cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterStatus === "verified" && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus("verified")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterStatus === "verified" && styles.filterButtonTextActive,
              ]}
            >
              Xác nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterStatus === "pending" && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus("pending")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterStatus === "pending" && styles.filterButtonTextActive,
              ]}
            >
              Chờ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterStatus === "rejected" && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus("rejected")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterStatus === "rejected" && styles.filterButtonTextActive,
              ]}
            >
              Từ chối
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reports List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredReports.length > 0 ? (
            <View style={styles.reportsList}>
              {filteredReports.map((report) => (
                <TouchableOpacity
                  key={report.id}
                  style={styles.reportCard}
                  activeOpacity={0.7}
                >
                  {/* Left - Icon */}
                  <View
                    style={[
                      styles.reportIcon,
                      {
                        backgroundColor: `${report.categoryColor}20`,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={report.categoryIcon as any}
                      size={24}
                      color={report.categoryColor}
                    />
                  </View>

                  {/* Middle - Info */}
                  <View style={styles.reportInfo}>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                    <Text style={styles.reportLocation}>
                      📍 {report.location}
                    </Text>
                    <Text style={styles.reportDate}>{report.date}</Text>
                  </View>

                  {/* Right - Status */}
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: `${getStatusColor(report.status)}20`,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(report.status) },
                      ]}
                    >
                      {getStatusLabel(report.status)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="history"
                size={64}
                color="#4b5563"
              />
              <Text style={styles.emptyText}>Không có báo cáo</Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );

  const renderSavedLocationsScreen = () => (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen("profile")}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#d1d5db"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Địa điểm đã lưu</Text>
          <TouchableOpacity style={styles.addButton}>
            <MaterialCommunityIcons name="plus" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {/* Info Bar */}
        <View style={styles.infoBar}>
          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            color="#3b82f6"
          />
          <Text style={styles.infoText}>
            {locations.length} địa điểm được lưu
          </Text>
        </View>

        {/* Locations List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {locations.length > 0 ? (
            <View style={styles.locationsList}>
              {locations.map((location) => (
                <View key={location.id} style={styles.locationCard}>
                  {/* Left - Icon */}
                  <View
                    style={[
                      styles.locationIcon,
                      {
                        backgroundColor: `${getCategoryColor(location.category)}20`,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={getCategoryIcon(location.category) as any}
                      size={24}
                      color={getCategoryColor(location.category)}
                    />
                  </View>

                  {/* Middle - Info */}
                  <View style={styles.locationInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.locationName}>{location.name}</Text>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryLabel}>
                          {getCategoryLabel(location.category)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.locationAddress}>
                      {location.address}
                    </Text>
                    <Text style={styles.locationDate}>
                      Lưu: {location.savedDate}
                    </Text>
                  </View>

                  {/* Right - Actions */}
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons
                        name="directions"
                        size={20}
                        color="#3b82f6"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDeleteLocation(location.id)}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={20}
                        color="#f87171"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="bookmark-outline"
                size={64}
                color="#4b5563"
              />
              <Text style={styles.emptyText}>Chưa lưu địa điểm nào</Text>
              <Text style={styles.emptySubtext}>
                Nhấn + để thêm địa điểm yêu thích
              </Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );

  const renderNotificationsScreen = () => (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen("profile")}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#d1d5db"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông báo</Text>
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.markAllText}>Đánh dấu hết</Text>
          </TouchableOpacity>
        </View>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <View style={styles.unreadBadgeContainer}>
            <View style={styles.unreadBadge}>
              <MaterialCommunityIcons
                name="bell-ring"
                size={16}
                color="#ffffff"
              />
              <Text style={styles.unreadCount}>
                {unreadCount} thông báo chưa đọc
              </Text>
            </View>
          </View>
        )}

        {/* Notifications List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {notifications.length > 0 ? (
            <View style={styles.notificationsList}>
              {notifications.map((notification) => (
                <View
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.read && styles.notificationCardUnread,
                  ]}
                >
                  {/* Left - Icon */}
                  <TouchableOpacity
                    style={[
                      styles.notificationIcon,
                      {
                        backgroundColor: `${getTypeColor(notification.type)}20`,
                      },
                    ]}
                    onPress={() => handleMarkAsRead(notification.id)}
                  >
                    <MaterialCommunityIcons
                      name={notification.icon as any}
                      size={24}
                      color={getTypeColor(notification.type)}
                    />
                  </TouchableOpacity>

                  {/* Middle - Info */}
                  <View style={styles.notificationInfo}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.timestamp}
                    </Text>
                  </View>

                  {/* Right - Actions */}
                  <View style={styles.notificationActions}>
                    {!notification.read && <View style={styles.unreadDot} />}
                    <TouchableOpacity
                      onPress={() => handleDeleteNotification(notification.id)}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={20}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={64}
                color="#4b5563"
              />
              <Text style={styles.emptyText}>Không có thông báo</Text>
              <Text style={styles.emptySubtext}>
                Tất cả thông báo đã được xóa
              </Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );

  const renderSecurityPrivacyScreen = () => (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen("profile")}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#d1d5db"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bảo mật & Quyền riêng tư</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Security Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader2}>
              <MaterialCommunityIcons
                name="shield-outline"
                size={20}
                color="#3b82f6"
              />
              <Text style={styles.sectionTitle2}>Bảo Mật</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Bảo vệ tài khoản của bạn khỏi truy cập trái phép
            </Text>

            <View style={styles.optionsList}>
              {securityOptions.map((option, index) => (
                <View
                  key={option.id}
                  style={[
                    styles.optionItem,
                    index === securityOptions.length - 1 && styles.lastOption,
                  ]}
                >
                  <View style={styles.optionIconContainer}>
                    <MaterialCommunityIcons
                      name={option.icon as any}
                      size={24}
                      color="#3b82f6"
                    />
                  </View>

                  <View style={styles.optionInfo2}>
                    <Text style={styles.optionTitle2}>{option.title}</Text>
                    <Text style={styles.optionDescription2}>
                      {option.description}
                    </Text>
                  </View>

                  {option.hasToggle && (
                    <Switch
                      value={securitySettings[option.id]}
                      onValueChange={() => handleSecurityToggle(option.id)}
                      trackColor={{ false: "#4b5563", true: "#3b82f6" }}
                      thumbColor={
                        securitySettings[option.id] ? "#60a5fa" : "#9ca3af"
                      }
                    />
                  )}
                  {!option.hasToggle && (
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#6b7280"
                    />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Privacy Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader2}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="#8b5cf6"
              />
              <Text style={styles.sectionTitle2}>Quyền Riêng Tư</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Kiểm soát cách dữ liệu của bạn được sử dụng
            </Text>

            <View style={styles.optionsList}>
              {privacyOptions.map((option, index) => (
                <View
                  key={option.id}
                  style={[
                    styles.optionItem,
                    index === privacyOptions.length - 1 && styles.lastOption,
                  ]}
                >
                  <View style={styles.optionIconContainer}>
                    <MaterialCommunityIcons
                      name={option.icon as any}
                      size={24}
                      color="#8b5cf6"
                    />
                  </View>

                  <View style={styles.optionInfo2}>
                    <Text style={styles.optionTitle2}>{option.title}</Text>
                    <Text style={styles.optionDescription2}>
                      {option.description}
                    </Text>
                  </View>

                  {option.hasToggle && (
                    <Switch
                      value={privacySettings[option.id]}
                      onValueChange={() => handlePrivacyToggle(option.id)}
                      trackColor={{ false: "#4b5563", true: "#8b5cf6" }}
                      thumbColor={
                        privacySettings[option.id] ? "#a78bfa" : "#9ca3af"
                      }
                    />
                  )}
                  {!option.hasToggle && (
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#6b7280"
                    />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color="#3b82f6"
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Bảo vệ dữ liệu của bạn</Text>
              <Text style={styles.infoText}>
                Dữ liệu của bạn được mã hóa end-to-end và không bao giờ được
                chia sẻ với bên thứ ba mà không có sự đồng ý của bạn.
              </Text>
            </View>
          </View>

          {/* Danger Zone */}
          <View style={styles.dangerSection}>
            <Text style={styles.dangerTitle}>Vùng Nguy Hiểm</Text>
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={handleDeleteAccountPress}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={20}
                color="#f87171"
              />
              <Text style={styles.dangerButtonText}>
                Xóa tài khoản vĩnh viễn
              </Text>
            </TouchableOpacity>
            <Text style={styles.dangerWarning}>
              Hành động này không thể được hoàn tác. Tất cả dữ liệu của bạn sẽ
              bị xóa.
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );

  // ==================== MAIN RENDER ====================
  return (
    <>
      {currentScreen === "profile" && renderProfileScreen()}
      {currentScreen === "reportHistory" && renderReportHistoryScreen()}
      {currentScreen === "savedLocations" && renderSavedLocationsScreen()}
      {currentScreen === "notifications" && renderNotificationsScreen()}
      {currentScreen === "securityPrivacy" && renderSecurityPrivacyScreen()}

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalSafeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Settings Header */}
            <View style={styles.settingsHeader}>
              <Text style={styles.settingsHeaderTitle}>Cài đặt</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowSettings(false)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#d1d5db"
                />
              </TouchableOpacity>
            </View>

            {/* Settings Content */}
            <ScrollView
              style={styles.settingsScrollView}
              contentContainerStyle={styles.settingsScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.settingsList}>
                {settingsItems.map((item, index) => (
                  <View key={item.id}>
                    {/* Main Setting Item */}
                    <TouchableOpacity
                      style={styles.settingItem}
                      onPress={() => {
                        if (item.expandable) {
                          toggleSection(item.id);
                        }
                      }}
                      activeOpacity={0.6}
                    >
                      <View style={styles.settingIconContainer}>
                        <MaterialCommunityIcons
                          name={item.icon as any}
                          size={24}
                          color="#9ca3af"
                        />
                      </View>
                      <View
                        style={[
                          styles.settingContent,
                          index === settingsItems.length - 1 &&
                            !item.expandable &&
                            styles.lastItem,
                        ]}
                      >
                        <Text style={styles.settingTitle}>{item.title}</Text>
                        {item.description !== "" && (
                          <Text style={styles.settingDescription}>
                            {item.description}
                          </Text>
                        )}
                      </View>

                      {/* Chevron Icon */}
                      {item.expandable && (
                        <MaterialCommunityIcons
                          name={
                            expandedSections[item.id]
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={24}
                          color="#6b7280"
                        />
                      )}
                    </TouchableOpacity>

                    {/* Expandable Sub-Settings */}
                    {item.expandable && expandedSections[item.id] && (
                      <View style={styles.subSettingsContainer}>
                        {item.subSettings?.map((subSetting, subIndex) => (
                          <View
                            key={subSetting.id}
                            style={[
                              styles.subSettingItem,
                              subIndex === item.subSettings!.length - 1 &&
                                styles.lastSubSetting,
                            ]}
                          >
                            <Text style={styles.subSettingLabel}>
                              {subSetting.label}
                            </Text>
                            <Switch
                              value={subSettingsState[subSetting.id]}
                              onValueChange={() =>
                                toggleSubSetting(subSetting.id)
                              }
                              trackColor={{
                                false: "#4b5563",
                                true: "#3b82f6",
                              }}
                              thumbColor={
                                subSettingsState[subSetting.id]
                                  ? "#60a5fa"
                                  : "#9ca3af"
                              }
                            />
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}

                {/* Logout Button in Settings */}
                <View style={styles.logoutContainerSettings}>
                  <TouchableOpacity
                    style={styles.logoutButtonSettings}
                    onPress={handleLogoutPress}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.logoutTextSettings}>
                      Đăng xuất khỏi bản đồ
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Spacing */}
              <View style={{ height: 40 }} />
            </ScrollView>

            {/* Home Indicator */}
            <View style={styles.homeIndicator} />
          </SafeAreaView>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutConfirm}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelLogout}
      >
        <View style={styles.logoutConfirmOverlay}>
          <View style={styles.logoutConfirmDialog}>
            {/* Icon */}
            <View style={styles.confirmIconContainer}>
              <MaterialCommunityIcons name="logout" size={48} color="#f87171" />
            </View>

            {/* Title */}
            <Text style={styles.confirmTitle}>Đăng Xuất</Text>

            {/* Message */}
            <Text style={styles.confirmMessage}>
              Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng không?
            </Text>

            {/* Buttons */}
            <View style={styles.confirmButtonsContainer}>
              <TouchableOpacity
                style={[styles.confirmButton, styles.cancelButton]}
                onPress={cancelLogout}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Không</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmButton, styles.logoutConfirmButton]}
                onPress={confirmLogout}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutConfirmButtonText}>Có</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Account Confirmation Modal */}
      <Modal
        visible={showDeleteAccountConfirm}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDeleteAccount}
      >
        <View style={styles.logoutConfirmOverlay}>
          <View style={styles.logoutConfirmDialog}>
            {/* Icon */}
            <View style={styles.confirmIconContainer}>
              <MaterialCommunityIcons
                name="trash-can"
                size={48}
                color="#f87171"
              />
            </View>

            {/* Title */}
            <Text style={styles.confirmTitle}>Xóa Tài Khoản</Text>

            {/* Message */}
            <Text style={styles.confirmMessage}>
              Bạn có chắc chắn muốn xóa tài khoản vĩnh viễn không? Hành động này
              không thể được hoàn tác.
            </Text>

            {/* Buttons */}
            <View style={styles.confirmButtonsContainer}>
              <TouchableOpacity
                style={[styles.confirmButton, styles.cancelButton]}
                onPress={cancelDeleteAccount}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Không</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmButton, styles.deleteConfirmButton]}
                onPress={confirmDeleteAccount}
                activeOpacity={0.7}
              >
                <Text style={styles.deleteConfirmButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  // ==================== COMMON STYLES ====================
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(10, 10, 10, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.3,
    flex: 1,
    textAlign: "center",
  },
  addButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  markAllButton: {
    paddingHorizontal: 8,
  },
  markAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3b82f6",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // ==================== PROFILE SCREEN ====================
  profileHeader: {
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarRing: {
    width: 112,
    height: 112,
    borderRadius: 56,
    padding: 4,
    borderWidth: 2,
    borderColor: "rgba(59, 130, 246, 0.4)",
    backgroundColor: "#1a1a1a",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 52,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#4ade80",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0a0a0a",
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 1,
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 12,
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
    borderRadius: 20,
  },
  trustText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3b82f6",
  },
  // ==================== STATS ====================
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 16,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.5,
  },
  statBox: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3b82f6",
    marginBottom: 4,
  },
  // ==================== SECTION ====================
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 1.5,
  },
  sectionHeader2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle2: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#6b7280",
    marginBottom: 16,
  },
  // ==================== MENU ====================
  menuContainer: {
    paddingHorizontal: 16,
    paddingBottom: 48,
    gap: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
  },
  logoutSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(153, 27, 27, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(153, 27, 27, 0.2)",
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f87171",
  },
  // ==================== FOOTER ====================
  footer: {
    alignItems: "center",
    paddingBottom: 64,
    gap: 4,
  },
  footerVersion: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4b5563",
  },
  footerCopyright: {
    fontSize: 10,
    fontWeight: "500",
    color: "#374151",
    fontStyle: "italic",
    letterSpacing: 1.2,
  },
  // ==================== SETTINGS MODAL ====================
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  modalSafeArea: {
    flex: 1,
  },
  settingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  settingsHeaderTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsScrollView: {
    flex: 1,
  },
  settingsScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  settingsList: {
    gap: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  settingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
  },
  settingContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(39, 39, 42, 0.5)",
    paddingBottom: 12,
    paddingTop: 12,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: "#ffffff",
    lineHeight: 22,
  },
  settingDescription: {
    fontSize: 14,
    color: "#71717a",
    marginTop: 2,
    lineHeight: 18,
  },
  // ==================== SUB SETTINGS ====================
  subSettingsContainer: {
    backgroundColor: "rgba(39, 39, 42, 0.3)",
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  subSettingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(75, 85, 99, 0.3)",
  },
  lastSubSetting: {
    borderBottomWidth: 0,
  },
  subSettingLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#e5e7eb",
  },
  // ==================== LOGOUT IN SETTINGS ====================
  logoutContainerSettings: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  logoutButtonSettings: {
    paddingVertical: 16,
  },
  logoutTextSettings: {
    fontSize: 17,
    fontWeight: "500",
    color: "#ffffff",
  },
  // ==================== HOME INDICATOR ====================
  homeIndicator: {
    position: "absolute",
    bottom: 8,
    left: "50%",
    marginLeft: -67,
    width: 134,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  // ==================== CONFIRMATION MODALS ====================
  logoutConfirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoutConfirmDialog: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    maxWidth: 320,
    width: "100%",
  },
  confirmIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(248, 113, 113, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  confirmMessage: {
    fontSize: 15,
    fontWeight: "400",
    color: "#d1d5db",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  confirmButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d1d5db",
  },
  logoutConfirmButton: {
    backgroundColor: "rgba(248, 113, 113, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.3)",
  },
  logoutConfirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f87171",
  },
  deleteConfirmButton: {
    backgroundColor: "rgba(248, 113, 113, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.3)",
  },
  deleteConfirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f87171",
  },
  // ==================== REPORT HISTORY ====================
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  filterButtonActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#d1d5db",
  },
  filterButtonTextActive: {
    color: "#ffffff",
  },
  reportsList: {
    paddingHorizontal: 16,
    gap: 12,
    paddingTop: 12,
  },
  reportCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  reportLocation: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9ca3af",
    marginBottom: 4,
  },
  reportDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6b7280",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  // ==================== SAVED LOCATIONS ====================
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  infoText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#3b82f6",
  },
  locationsList: {
    paddingHorizontal: 16,
    gap: 12,
    paddingTop: 12,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  locationInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  locationName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#3b82f6",
    borderRadius: 6,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
  },
  locationAddress: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9ca3af",
    marginBottom: 4,
  },
  locationDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6b7280",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  // ==================== NOTIFICATIONS ====================
  unreadBadgeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  unreadBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(248, 113, 113, 0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.2)",
  },
  unreadCount: {
    fontSize: 13,
    fontWeight: "500",
    color: "#f87171",
  },
  notificationsList: {
    paddingHorizontal: 16,
    gap: 8,
    paddingTop: 12,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  notificationCardUnread: {
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    fontWeight: "400",
    color: "#d1d5db",
    marginBottom: 6,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6b7280",
  },
  notificationActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3b82f6",
  },
  // ==================== SECURITY & PRIVACY ====================
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  optionsList: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    overflow: "hidden",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(42, 42, 42, 0.5)",
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  optionInfo2: {
    flex: 1,
  },
  optionTitle2: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 2,
  },
  optionDescription2: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9ca3af",
  },
  infoBox: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
    marginBottom: 4,
  },
  infoBoxText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9ca3af",
    lineHeight: 18,
  },
  dangerSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f87171",
    marginBottom: 12,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(248, 113, 113, 0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.3)",
    marginBottom: 8,
  },
  dangerButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f87171",
  },
  dangerWarning: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6b7280",
  },
  // ==================== EMPTY STATE ====================
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6b7280",
    marginTop: 8,
  },
});
