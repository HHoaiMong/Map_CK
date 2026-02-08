import { ThemedText } from "@/components";
import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface IncidentType {
  id: string;
  icon: IconSymbolName;
  iconColor: string;
  title: string;
  subtitle: string;
}

export default function ReportModal() {
  const router = useRouter();

  const incidentTypes: IncidentType[] = [
    {
      id: "traffic",
      icon: "traffic", // ❌ không tồn tại → sửa bên dưới
      iconColor: Colors.accent.jam,
      title: "Kẹt xe",
      subtitle: "Đang ùn tắc",
    },
    {
      id: "accident",
      icon: "car-crash", // ❌ MaterialIcons không có
      iconColor: Colors.accent.hazard,
      title: "Tai nạn",
      subtitle: "Va chạm giao thông",
    },
    {
      id: "police",
      icon: "local-police", // ❌ sai format
      iconColor: Colors.primary,
      title: "Cảnh sát",
      subtitle: "Trạm kiểm soát",
    },
    {
      id: "construction",
      icon: "construction",
      iconColor: Colors.accent.jam,
      title: "Công trình",
      subtitle: "Sửa chữa đường",
    },
    {
      id: "hazard",
      icon: "warning",
      iconColor: Colors.accent.hazard,
      title: "Nguy hiểm",
      subtitle: "Vật cản trên đường",
    },
    {
      id: "other",
      icon: "more-horiz",
      iconColor: "rgba(255, 255, 255, 0.6)",
      title: "Khác",
      subtitle: "Sự cố khác",
    },
  ];

  const fixedIncidentTypes: IncidentType[] = [
    {
      id: "traffic",
      icon: "traffic", // ❌ đổi thành icon hợp lệ
      iconColor: Colors.accent.jam,
      title: "Kẹt xe",
      subtitle: "Đang ùn tắc",
    },
    {
      id: "accident",
      icon: "car-repair",
      iconColor: Colors.accent.hazard,
      title: "Tai nạn",
      subtitle: "Va chạm giao thông",
    },
    {
      id: "police",
      icon: "local-police",
      iconColor: Colors.primary,
      title: "Cảnh sát",
      subtitle: "Trạm kiểm soát",
    },
    {
      id: "construction",
      icon: "construction",
      iconColor: Colors.accent.jam,
      title: "Công trình",
      subtitle: "Sửa chữa đường",
    },
    {
      id: "hazard",
      icon: "warning",
      iconColor: Colors.accent.hazard,
      title: "Nguy hiểm",
      subtitle: "Vật cản trên đường",
    },
    {
      id: "other",
      icon: "more-horiz",
      iconColor: "rgba(255, 255, 255, 0.6)",
      title: "Khác",
      subtitle: "Sự cố khác",
    },
  ];

  const handleIncidentSelect = (type: string) => {
    console.log("Selected incident:", type);
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background */}
      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSvpJzFAeVWSggkm_CIrJzKqHhvXRNZDa-qOFtEOtCTvZhCmCpYYwuwr2XbkJk3cuwBdrGItZt85Eecn47qkiVUcJ3QkL27ENVgI-O3leksm9CteIe7j4_jx9GfEmuphkEcbZ48j8NG7nR2aMlLjBJzfKSlBV6Y19g2RBeBVv3b9kBnTQFmiWwn7d5hXIJJQ0ZHpjkF8z8yYfswl84aD8o-1tDfe1l-yTXuj5vyOComd2bdsbUthrOUnz-6_DssXXw1lF3uD43m8zA",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />

      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <TouchableOpacity
          style={styles.handleContainer}
          onPress={() => router.back()}
        >
          <View style={styles.handle} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Báo cáo Sự cố</ThemedText>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <IconSymbol
              name="close"
              size={24}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>
        </View>

        {/* Grid */}
        <View style={styles.incidentGrid}>
          {fixedIncidentTypes.map((incident) => (
            <TouchableOpacity
              key={incident.id}
              style={styles.incidentCard}
              activeOpacity={0.95}
              onPress={() => handleIncidentSelect(incident.id)}
            >
              <IconSymbol
                name={incident.icon}
                size={36}
                color={incident.iconColor}
              />
              <View>
                <ThemedText style={styles.incidentTitle}>
                  {incident.title}
                </ThemedText>
                <ThemedText style={styles.incidentSubtitle}>
                  {incident.subtitle}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.cancelButtonText}>HỦY BỎ</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(16,24,23,0.95)",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 40,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  handle: {
    width: 48,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  incidentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  incidentCard: {
    width: "47%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  incidentTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  incidentSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  footer: {
    paddingHorizontal: 24,
  },
  cancelButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 2,
  },
});
