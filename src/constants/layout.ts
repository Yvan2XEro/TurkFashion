import { Platform, StatusBar } from "react-native";

export const paddingTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;