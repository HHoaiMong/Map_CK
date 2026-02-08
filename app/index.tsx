import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useUser } from "./contexts/userContext";
import MainTab from "./navigation/MainTab";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface FilterChip {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  label: string;
}

interface MapType {
  id: string;
  label: string;
  icon: string;
}

export default function Index() {
  const [searchText, setSearchText] = useState<string>("");
  const [showMapTypeModal, setShowMapTypeModal] = useState<boolean>(false);
  const [selectedMapType, setSelectedMapType] = useState<string>("default");
  const router = useRouter();
  const { user } = useUser();

  const LABELS = {
    traffic: "Kẹt xe",
    accident: "Tai nạn",
    construction: "Công trình",
  };

  const filterChips: FilterChip[] = [
    { icon: "alert", color: "#ff003c", label: "Kẹt xe" },
    { icon: "car-side", color: "#00f2ff", label: "Tai nạn" },
    { icon: "excavator", color: "#ffeb3b", label: "Công trình" },
  ];

  const mapTypes: MapType[] = [
    { id: "default", label: "Mặc định", icon: "🗺️" },
    { id: "satellite", label: "Vệ tinh", icon: "🛰️" },
    { id: "terrain", label: "Địa hình", icon: "⛰️" },
  ];

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleMapTypePress = () => {
    setShowMapTypeModal(true);
  };

  const handleSelectMapType = (mapTypeId: string) => {
    setSelectedMapType(mapTypeId);
    setShowMapTypeModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Map Content Area */}
      <SafeAreaView style={styles.content}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={20}
                  color="#00f2ff"
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Tìm kiếm điểm đến..."
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <MaterialCommunityIcons
                  name="microphone"
                  size={20}
                  color="rgba(255,255,255,0.4)"
                />
              </View>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={handleProfilePress}
              >
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.profileAvatar}
                />
              </TouchableOpacity>
            </View>

            {/* Filter Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtersContainer}
              contentContainerStyle={styles.filtersContent}
            >
              {filterChips.map((chip, index) => (
                <View key={index} style={styles.filterChip}>
                  <MaterialCommunityIcons
                    name={chip.icon}
                    size={20}
                    color={chip.color}
                  />
                  <Text style={styles.filterChipText}>{chip.label}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Map Area */}
        <View style={styles.mapContainer}>
          {/* Background gradient overlay */}
          <View style={styles.mapOverlay} />

          {/* SVG Routes */}
          <Svg
            style={styles.svgOverlay}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT - 260}
            viewBox={`0 0 ${SCREEN_WIDTH} ${SCREEN_HEIGHT - 260}`}
          >
            {/* Red route line */}
            <Path
              d={`M ${SCREEN_WIDTH * 0.1} ${(SCREEN_HEIGHT - 260) * 0.15} L ${
                SCREEN_WIDTH * 0.4
              } ${(SCREEN_HEIGHT - 260) * 0.35} L ${SCREEN_WIDTH * 0.775} ${
                (SCREEN_HEIGHT - 260) * 0.54
              }`}
              stroke="#ff003c"
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity="0.9"
              fill="none"
            />

            {/* Vertical red route */}
            <Path
              d={`M ${SCREEN_WIDTH * 0.55} ${(SCREEN_HEIGHT - 260) * 0.06} L ${
                SCREEN_WIDTH * 0.55
              } ${(SCREEN_HEIGHT - 260) * 0.94}`}
              stroke="#ff003c"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.7"
              fill="none"
            />

            {/* Horizontal blue line */}
            <Path
              d={`M 0 ${(SCREEN_HEIGHT - 260) * 0.6} L ${SCREEN_WIDTH} ${
                (SCREEN_HEIGHT - 260) * 0.6
              }`}
              stroke="#00f2ff"
              strokeWidth="3"
              strokeOpacity="0.3"
              fill="none"
            />
          </Svg>

          {/* Marker Icons */}
          <View style={[styles.marker, { top: "38%", left: "48%" }]}>
            <View style={styles.emergencyMarker}>
              <MaterialCommunityIcons
                name="home-alert"
                size={20}
                color="#ffffff"
              />
            </View>
          </View>

          <View style={[styles.marker, { top: "65%", left: "25%" }]}>
            <View style={styles.warningMarker}>
              <MaterialCommunityIcons name="alert" size={18} color="#000000" />
            </View>
          </View>

          <View style={[styles.marker, { top: "55%", left: "62%" }]}>
            <View style={styles.locationMarker}>
              <View style={styles.locationMarkerOuter} />
              <View style={styles.locationMarkerInner} />
            </View>
          </View>

          {/* Control Buttons */}
          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.controlButton}>
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleMapTypePress}
            >
              <MaterialCommunityIcons name="layers" size={24} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigationButton}>
              <View style={styles.navigationButtonInner}>
                <MaterialCommunityIcons
                  name="navigation"
                  size={20}
                  color="#00f2ff"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Main Tab Navigation */}
      <MainTab />

      {/* Map Type Modal */}
      <Modal
        visible={showMapTypeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMapTypeModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMapTypeModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Loại bản đồ</Text>
              <TouchableOpacity
                onPress={() => setShowMapTypeModal(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.mapTypesContainer}>
              {mapTypes.map((mapType) => (
                <TouchableOpacity
                  key={mapType.id}
                  style={[
                    styles.mapTypeCard,
                    selectedMapType === mapType.id &&
                      styles.mapTypeCardSelected,
                  ]}
                  onPress={() => handleSelectMapType(mapType.id)}
                >
                  <View style={styles.mapTypePreview}>
                    <Text style={styles.mapTypeIcon}>{mapType.icon}</Text>
                  </View>
                  <Text style={styles.mapTypeLabel}>{mapType.label}</Text>
                  {selectedMapType === mapType.id && (
                    <View style={styles.selectedIndicator}>
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color="#00f2ff"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    zIndex: 50,
  },
  headerContent: {
    gap: 12,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    height: 44,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  profileButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  profileAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  filtersContainer: {
    paddingVertical: 4,
  },
  filtersContent: {
    gap: 8,
    paddingRight: 16,
  },
  filterChip: {
    height: 40,
    paddingHorizontal: 16,
    paddingLeft: 12,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterChipText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#111111",
    position: "relative",
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  svgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  marker: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyMarker: {
    backgroundColor: "#ff003c",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#ff003c",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  warningMarker: {
    backgroundColor: "#ffeb3b",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#ffeb3b",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  locationMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  locationMarkerOuter: {
    position: "absolute",
    width: 48,
    height: 48,
    backgroundColor: "rgba(0,242,255,0.2)",
    borderRadius: 24,
  },
  locationMarkerInner: {
    width: 24,
    height: 24,
    backgroundColor: "#00f2ff",
    borderWidth: 4,
    borderColor: "#000000",
    borderRadius: 12,
    shadowColor: "#00f2ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  controlButtons: {
    position: "absolute",
    right: 8,
    bottom: 24,
    gap: 12,
    alignItems: "flex-end",
  },
  controlButton: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(0,0,0,0.95)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navigationButton: {
    width: 56,
    height: 56,
    backgroundColor: "#00f2ff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    shadowColor: "#00f2ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  navigationButtonInner: {
    width: 28,
    height: 28,
    backgroundColor: "#000000",
    borderRadius: 4,
    transform: [{ rotate: "45deg" }],
    alignItems: "center",
    justifyContent: "center",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  closeButton: {
    padding: 4,
  },
  mapTypesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  mapTypeCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  mapTypeCardSelected: {
    borderColor: "#00f2ff",
    backgroundColor: "rgba(0,242,255,0.1)",
  },
  mapTypePreview: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  mapTypeIcon: {
    fontSize: 40,
  },
  mapTypeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
  selectedIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
