// components/ThemedText.tsx
import { Colors } from "@/constants";
import { StyleSheet, Text, TextProps } from "react-native";

export function ThemedText({ style, ...rest }: Readonly<TextProps>) {
  return <Text style={[styles.text, style]} {...rest} />;
}

const styles = StyleSheet.create({
  text: {
    color: Colors.text.primary,
    fontFamily: "SpaceGrotesk-Regular",
  },
});
