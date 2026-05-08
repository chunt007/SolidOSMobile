import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function SolidLogin() {
  const [mode, setMode] = useState<"idle" | "webview" | "success">("idle");

  // IMPORTANT: use YOUR POD DOMAIN
  const LOGIN_URL = "https://solidcommunity.net/";

  const startLogin = () => {
    setMode("webview");
  };

  if (mode === "success") {
    return (
      <View style={styles.container}>
        <Text style={styles.success}>You are now logged in!</Text>
      </View>
    );
  }

  if (mode === "webview") {
    return (
      <WebView
        source={{ uri: LOGIN_URL }}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        onNavigationStateChange={(nav) => {
          console.log("NAV:", nav.url);

          if (nav.url.includes("/profile/card")) {
            setMode("success");
          }
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to SolidCommunity.net</Text>
      <Button title="Login" onPress={startLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "600"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  success: {
    fontSize: 20,
    color: "green",
    fontWeight: "600"
  }
});
