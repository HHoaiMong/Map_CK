import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type IconName = keyof typeof MaterialIcons.glyphMap;

type Props = {
  name: IconName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle | TextStyle>;
};

export function Icon({ name, size = 24, color, style }: Props) {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      style={style as StyleProp<TextStyle>}
    />
  );
}
