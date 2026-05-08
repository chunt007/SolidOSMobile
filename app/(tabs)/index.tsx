import { View, Text } from "react-native";


export default function RootLayout() {
  return (
   <View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6A0DAD", // purple
  }}
>
  <Text style={{ fontSize: 24, color: "white" }}>
    Welcome to SolidOS Mobile

  </Text>
  <Text style={{ fontSize: 24, color: "white" }}>This runs on Expo GO and React Native</Text>
</View>

  );
}
