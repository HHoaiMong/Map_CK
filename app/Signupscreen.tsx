import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ColorSchemeName,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface AuthScreenProps {
  navigation?: any;
}

interface Colors {
  primary: string;
  backgroundLight: string;
  backgroundDark: string;
  surfaceDark: string;
  textLight: string;
  textDark: string;
  slate300: string;
  slate400: string;
  slate500: string;
  slate600: string;
  slate700: string;
  slate800: string;
}

interface Theme {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}

const SignupScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDark: boolean = colorScheme === "dark";

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const colors: Colors = {
    primary: "#0df2f2",
    backgroundLight: "#f5f8f8",
    backgroundDark: "#080c0c",
    surfaceDark: "#161b1b",
    textLight: "#0f172a",
    textDark: "#ffffff",
    slate300: "#cbd5e1",
    slate400: "#94a3b8",
    slate500: "#64748b",
    slate600: "#475569",
    slate700: "#334155",
    slate800: "#1e293b",
  };

  const theme: Theme = {
    background: isDark ? colors.backgroundDark : colors.backgroundLight,
    surface: isDark ? colors.surfaceDark : "#ffffff",
    text: isDark ? colors.textDark : colors.textLight,
    textSecondary: isDark ? colors.slate400 : colors.slate600,
    border: isDark ? colors.slate800 : "#e2e8f0",
  };

  const handleSignup = (): void => {
    if (!acceptTerms) {
      return;
    }
    // Handle signup logic here
    console.log("Signup with:", { fullName, email, phone });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Tạo tài khoản mới
          </Text>
        </View>

        {/* Info Banner */}
        <View style={styles.bannerContainer}>
          <View
            style={[styles.banner, { backgroundColor: `${colors.primary}1A` }]}
          >
            <View
              style={[
                styles.bannerIcon,
                { backgroundColor: `${colors.primary}33` },
              ]}
            >
              <Ionicons name="car-sport" size={24} color={colors.primary} />
            </View>
            <View style={styles.bannerText}>
              <Text style={[styles.bannerTitle, { color: colors.primary }]}>
                Cùng chia sẻ thông tin giao thông
              </Text>
              <Text
                style={[styles.bannerSubtitle, { color: theme.textSecondary }]}
              >
                Tham gia cộng đồng báo kẹt xe & tai nạn ngay.
              </Text>
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Họ và tên
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Nhập họ và tên đầy đủ"
              placeholderTextColor={colors.slate400}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="example@email.com"
              placeholderTextColor={colors.slate400}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Số điện thoại
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Nhập số điện thoại"
              placeholderTextColor={colors.slate400}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Mật khẩu
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                placeholder="Nhập mật khẩu"
                placeholderTextColor={colors.slate400}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={[
                  styles.eyeButton,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.slate400}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Terms Checkbox */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              {
                borderColor: acceptTerms ? colors.primary : theme.border,
                backgroundColor: acceptTerms ? colors.primary : "transparent",
              },
            ]}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            {acceptTerms && (
              <Ionicons name="checkmark" size={16} color="#000000" />
            )}
          </TouchableOpacity>
          <Text style={[styles.termsText, { color: theme.textSecondary }]}>
            Tôi đồng ý với các{" "}
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              Điều khoản & Chính sách
            </Text>{" "}
            của cộng đồng.
          </Text>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: colors.primary,
                opacity: acceptTerms ? 1 : 0.5,
              },
            ]}
            disabled={!acceptTerms}
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: theme.textSecondary }]}>
            Đã có tài khoản?{" "}
            <Text
              style={{ color: colors.primary, fontWeight: "700" }}
              onPress={() => navigation?.navigate("Login")}
            >
              Đăng nhập
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    letterSpacing: -0.3,
  },
  bannerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  banner: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#0df2f233",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
  },
  formContainer: {
    gap: 4,
  },
  inputGroup: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
  },
  passwordInput: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderRightWidth: 0,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderLeftWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  submitButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0df2f2",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  submitButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
  },
  loginContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  loginText: {
    fontSize: 14,
  },
});

export default SignupScreen;
