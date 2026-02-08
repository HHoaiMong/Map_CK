import { Colors } from "@/constants";
import { StyleSheet, View, ViewProps } from "react-native";

export function ThemedView({ style, ...rest }: Readonly<ViewProps>) {
  return <View style={[viewStyles.view, style]} {...rest} />;
}

const viewStyles = StyleSheet.create({
  view: {
    backgroundColor: Colors.background.dark,
  },
});
