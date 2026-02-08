import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "./contexts/userContext";

export default function ProfileEditScreenAdvanced() {
  const router = useRouter(); // ← SỬA: Dùng useRouter thay vì useNavigation
  const { user, updateUser, updateAvatar } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUri, setAvatarUri] = useState(user.avatar);
  const [isLoading, setIsLoading] = useState(false);

  // Validate email
  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Optional field
    const phoneRegex = /^[0-9\s]{10,}$/;
    return phoneRegex.test(phone);
  };

  // Pick image from gallery
  const handleChangePhoto = async () => {
    try {
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Cần quyền truy cập",
          "Vui lòng cấp quyền truy cập thư viện ảnh để thay đổi ảnh đại diện",
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại!");
    }
  };

  // Take photo with camera
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Cần quyền truy cập",
          "Vui lòng cấp quyền truy cập camera để chụp ảnh",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Lỗi", "Không thể chụp ảnh. Vui lòng thử lại!");
    }
  };

  // Show photo options
  const showPhotoOptions = () => {
    Alert.alert(
      "Thay đổi ảnh đại diện",
      "Chọn nguồn ảnh",
      [
        {
          text: "Chụp ảnh",
          onPress: handleTakePhoto,
        },
        {
          text: "Chọn từ thư viện",
          onPress: handleChangePhoto,
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  // Handle save
  const handleSave = () => {
    // Validation
    if (!name.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập họ tên");
      return;
    }

    if (email && !validateEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }

    if (phone && !validatePhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update user context
      updateUser({ name: name.trim() });
      if (avatarUri !== user.avatar) {
        updateAvatar(avatarUri);
      }

      setIsLoading(false);

      Alert.alert("Thành công", "Đã cập nhật thông tin hồ sơ", [
        {
          text: "OK",
          onPress: () => router.back(), // ← SỬA: Dùng router.back() thay vì navigation.goBack()
        },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()} // ← SỬA: Dùng router.back()
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#d1d5db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={showPhotoOptions}
            activeOpacity={0.8}
          >
            <View style={styles.avatarRing}>
              <Image
                source={{ uri: avatarUri }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.avatarOverlay}>
                <View style={styles.cameraIconContainer}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={24}
                    color="#ffffff"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>THAY ĐỔI ẢNH ĐẠI DIỆN</Text>
          {user.verified && (
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons
                name="check-decagram"
                size={16}
                color="#4ade80"
              />
              <Text style={styles.verifiedText}>Đã xác thực</Text>
            </View>
          )}
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>HỌ VÀ TÊN *</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="account-outline"
                size={20}
                color="#6b7280"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập họ tên của bạn"
                placeholderTextColor="#6b7280"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#6b7280"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Phone Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>SỐ ĐIỆN THOẠI</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="phone-outline"
                size={20}
                color="#6b7280"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="0912 345 678"
                placeholderTextColor="#6b7280"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Member Since (Read-only) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>THÀNH VIÊN TỪ</Text>
            <View style={[styles.inputContainer, styles.disabledInput]}>
              <MaterialCommunityIcons
                name="calendar-outline"
                size={20}
                color="#6b7280"
                style={styles.inputIcon}
              />
              <Text style={styles.disabledText}>{user.memberSince}</Text>
            </View>
          </View>

          {/* Trust Score (Read-only) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ĐỘ TIN CẬY</Text>
            <View style={[styles.inputContainer, styles.disabledInput]}>
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={20}
                color="#3b82f6"
                style={styles.inputIcon}
              />
              <Text style={[styles.disabledText, styles.trustScoreText]}>
                {user.trustScore}%
              </Text>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color="#3b82f6"
            />
            <Text style={styles.infoText}>
              Thông tin cá nhân của bạn được bảo mật và chỉ hiển thị khi cần
              thiết
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer with Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <Text style={styles.saveButtonText}>Đang lưu...</Text>
          ) : (
            <>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color="#ffffff"
              />
              <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // Avatar Section
  avatarSection: {
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    padding: 4,
    borderWidth: 3,
    borderColor: "rgba(59, 130, 246, 0.5)",
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 66,
  },
  avatarOverlay: {
    position: "absolute",
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 66,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#0a0a0a",
  },
  changePhotoText: {
    color: "#3b82f6",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(74, 222, 128, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(74, 222, 128, 0.3)",
    borderRadius: 16,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4ade80",
  },
  // Form Section
  formSection: {
    paddingHorizontal: 20,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 1.2,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 12,
  },
  disabledInput: {
    backgroundColor: "#141414",
    opacity: 0.7,
  },
  disabledText: {
    flex: 1,
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 12,
  },
  trustScoreText: {
    color: "#3b82f6",
    fontWeight: "700",
  },
  // Info Section
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  infoCard: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
    borderRadius: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#9ca3af",
    lineHeight: 18,
  },
  // Footer
  footer: {
    padding: 20,
    paddingBottom: 32,
    backgroundColor: "#0a0a0a",
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
