// types.ts - Type definitions for the application

// ============================================
// PROFILE EDIT SCREEN TYPES
// ============================================
export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ProfileEditScreenProps {
  initialData?: ProfileData;
  onSave?: (data: ProfileData) => void;
  onBack?: () => void;
  onPhotoChange?: () => void;
}

export type InputFieldType = "name" | "email" | "phone";

export interface InputField {
  type: InputFieldType;
  label: string;
  placeholder: string;
  value: string;
  icon: keyof typeof import("@expo/vector-icons").Ionicons.glyphMap;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

// ============================================
// AUTHENTICATION SCREEN TYPES
// ============================================

// Navigation
export interface AuthScreenProps {
  navigation?: any; // Use proper navigation type from @react-navigation/native if available
}

// Theme & Colors
export interface Colors {
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

export interface Theme {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textTertiary?: string;
  placeholder?: string;
  border: string;
}

// Auth Form Data
export interface LoginFormData {
  emailOrPhone: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
}

// Form Validation
export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  emailOrPhone?: string;
}
