import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainTab from "./navigation/MainTab";

interface Alert {
  id: number;
  type: "accident" | "traffic" | "construction" | "warning";
  title: string;
  description: string;
  time: string;
  distance: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  opacity?: number;
  verified?: boolean;
  verificationCount?: number;
  verifiedBy?: string;
}

export default function Alerts() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"nearest" | "latest" | "verified">(
    "nearest",
  );

  const tabs = [
    { key: "nearest", label: "Gần nhất" },
    { key: "latest", label: "Mới nhất" },
    { key: "verified", label: "Đã xác minh" },
  ];

  // Data cho tab "Gần nhất"
  const nearestAlerts: Alert[] = [
    {
      id: 1,
      type: "accident",
      title: "Tai nạn giao thông",
      description: "Đường Nguyễn Trãi, Quận 5. Xe máy va chạm xe hơi.",
      time: "5 PHÚT TRƯỚC",
      distance: "Cách 300m",
      icon: "car-crash",
      iconColor: "#f97316",
      bgColor: "rgba(249, 115, 22, 0.2)",
    },
    {
      id: 2,
      type: "traffic",
      title: "Kẹt xe nghiêm trọng",
      description: "Ngã tư Bảy Hiền. Di chuyển rất chậm hướng về trung tâm.",
      time: "15 PHÚT TRƯỚC",
      distance: "Cách 1.2km",
      icon: "traffic-light",
      iconColor: "#eab308",
      bgColor: "rgba(234, 179, 8, 0.2)",
    },
    {
      id: 3,
      type: "construction",
      title: "Công trình thi công",
      description: "Đường Lê Lợi. Rào chắn một phần làn đường.",
      time: "1 GIỜ TRƯỚC",
      distance: "Cách 2.5km",
      icon: "excavator",
      iconColor: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.2)",
      opacity: 0.6,
    },
  ];

  // Data cho tab "Mới nhất"
  const latestAlerts: Alert[] = [
    {
      id: 11,
      type: "accident",
      title: "Tai nạn giao thông",
      description: "Đường Nguyễn Trãi, Quận 5. Xe máy va chạm mạnh.",
      time: "VỪA XONG",
      distance: "Cách 800m",
      icon: "alert-circle",
      iconColor: "#f97316",
      bgColor: "rgba(249, 115, 22, 0.2)",
    },
    {
      id: 12,
      type: "traffic",
      title: "Kẹt xe tăng cường",
      description: "Vòng xoay Dân Chủ. Mật độ phương tiện tăng nhanh.",
      time: "2 PHÚT TRƯỚC",
      distance: "Cách 2.1km",
      icon: "traffic-light",
      iconColor: "#eab308",
      bgColor: "rgba(234, 179, 8, 0.2)",
    },
    {
      id: 13,
      type: "construction",
      title: "Sửa chữa đường dây",
      description: "Đường Võ Văn Tần. Có xe cẩu đang thi công.",
      time: "5 PHÚT TRƯỚC",
      distance: "Cách 1.4km",
      icon: "excavator",
      iconColor: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.2)",
    },
  ];

  // Data cho tab "Đã xác minh"
  const verifiedAlerts: Alert[] = [
    {
      id: 21,
      type: "accident",
      title: "Tai nạn liên hoàn",
      description: "Vòng xoay Dân Chủ. 3 xe máy va chạm, đang chờ CSGT.",
      time: "2 PHÚT TRƯỚC",
      distance: "Quận 3",
      icon: "home-alert",
      iconColor: "#34c759",
      bgColor: "rgba(52, 199, 89, 0.2)",
      verified: true,
      verificationCount: 12,
    },
    {
      id: 22,
      type: "traffic",
      title: "Ùn tắc kéo dài",
      description: "Cầu Kênh Tẻ hướng Quận 4 sang Quận 7. Di chuyển cực chậm.",
      time: "10 PHÚT TRƯỚC",
      distance: "Quận 4",
      icon: "traffic-light",
      iconColor: "#34c759",
      bgColor: "rgba(52, 199, 89, 0.2)",
      verified: true,
      verifiedBy: "CSGT",
    },
    {
      id: 23,
      type: "warning",
      title: "Hố ga mất nắp",
      description: "Đường Tôn Đức Thắng. Nguy hiểm cho phương tiện nhỏ.",
      time: "45 PHÚT TRƯỚC",
      distance: "Quận 1",
      icon: "alert",
      iconColor: "#34c759",
      bgColor: "rgba(52, 199, 89, 0.2)",
      verified: true,
      verificationCount: 5,
    },
  ];

  const getCurrentAlerts = () => {
    switch (activeTab) {
      case "latest":
        return latestAlerts;
      case "verified":
        return verifiedAlerts;
      default:
        return nearestAlerts;
    }
  };

  const getStatsText = () => {
    switch (activeTab) {
      case "latest":
        return "CÓ 5 BÁO CÁO MỚI TRONG 15 PHÚT QUA";
      case "verified":
        return "8 BÁO CÁO ĐÃ XÁC THỰC BỞI CỘNG ĐỒNG";
      default:
        return "CÓ 3 BÁO CÁO TRONG VÒNG 2KM";
    }
  };

  const getHeaderIcon = () => {
    switch (activeTab) {
      case "latest":
        return "clock-outline";
      case "verified":
        return "shield-check";
      default:
        return "navigation";
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case "latest":
        return "Cảnh báo Mới nhất";
      case "verified":
        return "Cảnh báo Đã xác minh";
      default:
        return "Cảnh báo gần bạn";
    }
  };

  const handleConfirm = (alertId: number, isConfirmed: boolean) => {
    console.log(`Alert ${alertId} confirmed: ${isConfirmed}`);
    // Xử lý logic xác nhận
  };

  const handleLocationPress = () => {
    console.log("Location button pressed");
    // Xử lý logic khi bấm nút location
  };

  const handleCreateReport = () => {
    router.push("/createReport");
  };

  const alerts = getCurrentAlerts();

  return (
    <View style={styles.container}>
      {/* Content Area */}
      <SafeAreaView style={styles.content}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <MaterialCommunityIcons
                name={getHeaderIcon() as any}
                size={24}
                color="#34c759"
              />
              <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
            </View>
          </View>

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => setActiveTab(tab.key as any)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.key && styles.tabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ScrollView Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Header */}
          <View style={styles.statsHeader}>
            <Text style={styles.statsText}>{getStatsText()}</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>
                {activeTab === "verified" ? "ĐANG CẬP NHẬT" : "TRỰC TIẾP"}
              </Text>
            </View>
          </View>

          {/* Alert Cards */}
          {alerts.map((alert, index) => (
            <View
              key={alert.id}
              style={[
                styles.alertCard,
                alert.opacity ? { opacity: alert.opacity } : {},
              ]}
            >
              {/* Alert Content */}
              <View style={styles.alertContent}>
                <View
                  style={[styles.alertIcon, { backgroundColor: alert.bgColor }]}
                >
                  <MaterialCommunityIcons
                    name={alert.icon as any}
                    size={32}
                    color={alert.iconColor}
                  />
                </View>

                <View style={styles.alertDetails}>
                  <View style={styles.alertHeader}>
                    <View style={styles.alertTitleContainer}>
                      <Text style={styles.alertTitle}>{alert.title}</Text>
                      {alert.verified && (
                        <MaterialCommunityIcons
                          name="check-decagram"
                          size={18}
                          color="#34c759"
                        />
                      )}
                    </View>
                    <Text style={styles.alertTime}>{alert.time}</Text>
                  </View>
                  <Text style={styles.alertDescription}>
                    {alert.description}
                  </Text>
                  <View style={styles.distanceContainer}>
                    {activeTab === "verified" ? (
                      <>
                        <MaterialCommunityIcons
                          name="map-marker"
                          size={18}
                          color="#34c759"
                        />
                        <Text style={styles.distanceText}>
                          {alert.distance}
                        </Text>
                      </>
                    ) : (
                      <>
                        <MaterialCommunityIcons
                          name="map-marker-distance"
                          size={18}
                          color="#34c759"
                        />
                        <Text style={styles.distanceText}>
                          {alert.distance}
                        </Text>
                      </>
                    )}
                  </View>

                  {/* Verification info cho tab "Đã xác minh" */}
                  {activeTab === "verified" && alert.verified && (
                    <View style={styles.verificationInfo}>
                      <View style={styles.verificationBadge}>
                        <MaterialCommunityIcons
                          name={
                            alert.verifiedBy ? "shield-check" : "account-group"
                          }
                          size={16}
                          color="#34c759"
                        />
                        <Text style={styles.verificationText}>
                          {alert.verifiedBy
                            ? `Đã xác thực bởi ${alert.verifiedBy}`
                            : `${alert.verificationCount} xác nhận`}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>

              {/* Confirmation Buttons - Hiện cho tất cả các tab */}
              {index < 2 && (
                <View style={styles.confirmationSection}>
                  <Text style={styles.confirmationQuestion}>
                    {activeTab === "verified"
                      ? "Sự việc vẫn còn tiếp diễn?"
                      : "Vẫn còn ở đó?"}
                  </Text>
                  <View style={styles.confirmationButtons}>
                    <TouchableOpacity
                      style={[styles.confirmButton, styles.confirmYes]}
                      onPress={() => handleConfirm(alert.id, true)}
                    >
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color="#000000"
                      />
                      <Text style={styles.confirmYesText}>CÓ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.confirmButton, styles.confirmNo]}
                      onPress={() => handleConfirm(alert.id, false)}
                    >
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={20}
                        color="#ffffff"
                      />
                      <Text style={styles.confirmNoText}>KHÔNG</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Bottom Spacing for MainTab */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Location Button - Fixed position phía trên FAB */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleLocationPress}
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={24}
            color="#000000"
          />
        </TouchableOpacity>

        {/* FAB Button */}
        <TouchableOpacity style={styles.fab} onPress={handleCreateReport}>
          <MaterialCommunityIcons name="plus" size={32} color="#000000" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* MainTab */}
      <MainTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: "rgba(0,0,0,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  tabsContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingBottom: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#34c759",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8e8e93",
  },
  tabTextActive: {
    color: "#34c759",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  statsText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8e8e93",
    letterSpacing: 1.2,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    backgroundColor: "#34c759",
    borderRadius: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#34c759",
  },
  alertCard: {
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    overflow: "hidden",
  },
  alertContent: {
    padding: 16,
    flexDirection: "row",
    gap: 16,
  },
  alertIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  alertDetails: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  alertTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 22,
  },
  alertTime: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8e8e93",
    letterSpacing: 0.5,
  },
  alertDescription: {
    fontSize: 14,
    color: "#8e8e93",
    marginTop: 4,
    lineHeight: 18,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  distanceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#34c759",
  },
  verificationInfo: {
    marginTop: 8,
  },
  verificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  verificationText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#34c759",
  },
  confirmationSection: {
    backgroundColor: "rgba(44,44,46,0.5)",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  confirmationQuestion: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
    marginBottom: 12,
  },
  confirmationButtons: {
    flexDirection: "row",
    gap: 8,
  },
  confirmButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  confirmYes: {
    backgroundColor: "#34c759",
  },
  confirmYesText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  confirmNo: {
    backgroundColor: "#ff3b30",
  },
  confirmNoText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
  },
  locationButton: {
    position: "absolute",
    right: 24,
    bottom: 164,
    width: 56,
    height: 56,
    backgroundColor: "#34c759",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#34c759",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 96,
    width: 56,
    height: 56,
    backgroundColor: "#34c759",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#34c759",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
