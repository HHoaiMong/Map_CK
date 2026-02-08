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
  textTertiary: string;
  placeholder: string;
  border: string;
}

const LoginScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDark: boolean = colorScheme === "dark";

  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const colors: Colors = {
    primary: "#0df2f2",
    backgroundLight: "#f5f8f8",
    backgroundDark: "#080c0c",
    surfaceDark: "#111c1c",
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
    textSecondary: isDark ? colors.slate400 : colors.slate700,
    textTertiary: isDark ? colors.slate400 : colors.slate500,
    placeholder: isDark ? colors.slate600 : colors.slate400,
    border: isDark ? colors.slate800 : "#e2e8f0",
  };

  const handleLogin = async (): Promise<void> => {
    try {
      // Validate input
      if (!emailOrPhone.trim() || !password.trim()) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      // TODO: Call your API login here
      // const response = await loginAPI(emailOrPhone, password);

      // Simulate API call
      console.log("Login with:", emailOrPhone);

      // If login successful, navigate to index (home)
      // You can use navigation.replace to prevent going back to login
      if (navigation) {
        navigation.replace("index"); // or 'Home' depending on your route name
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Đăng nhập thất bại. Vui lòng thử lại!");
    }
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
            <Ionicons name="chevron-back" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Đăng nhập
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Logo & Welcome Section */}
        <View style={styles.welcomeSection}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: `${colors.primary}33` },
            ]}
          >
            <Ionicons name="location" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.welcomeTitle, { color: theme.text }]}>
            Chào mừng trở lại
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: theme.textTertiary }]}>
            Cập nhật tình hình giao thông ngay
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Email or Phone */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Email hoặc Số điện thoại
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
              placeholder="user@example.com hoặc 09x..."
              placeholderTextColor={theme.placeholder}
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
              autoCapitalize="none"
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
                placeholderTextColor={theme.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={theme.placeholder}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity
              onPress={() => navigation?.navigate("ForgotPassword")}
            >
              <Text
                style={[styles.forgotPasswordText, { color: colors.primary }]}
              >
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        {/* Signup Link */}
        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: theme.textTertiary }]}>
            Chưa có tài khoản?{" "}
            <Text
              style={{ color: colors.primary, fontWeight: "700" }}
              onPress={() => navigation?.navigate("Signup")}
            >
              Đăng ký ngay
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
    flexGrow: 1,
    paddingBottom: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 48,
  },
  welcomeSection: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#0df2f2",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  formContainer: {
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 4,
  },
  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingRight: 48,
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 16,
  },
  loginButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0df2f2",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    color: "#080c0c",
    fontSize: 18,
    fontWeight: "700",
  },
  signupContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 48,
  },
  signupText: {
    fontSize: 14,
  },
});

export default LoginScreen;
