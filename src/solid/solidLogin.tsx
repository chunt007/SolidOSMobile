import React from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSolidSession } from "./session";

type SolidLoginProps = {
  onSuccess?: () => void;
};

export default function SolidLogin({ onSuccess }: SolidLoginProps) {
  const { setSession } = useSolidSession();

  return (
    <WebView
      source={{ uri: "https://solidcommunity.net/" }}
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      javaScriptEnabled
      domStorageEnabled
      onNavigationStateChange={(navState) => {
        console.log("NAV:", navState.url);

        // ⭐ Detect ANY Solid POD profile card
        if (navState.url.includes("/profile/card")) {
          const webId = navState.url.includes("#me")
            ? navState.url
            : navState.url + "#me";

          console.log("LOGIN DETECTED:", webId);
          Alert.alert("Success", "You are now logged in!");

          setSession({
            webId,
            cookies: "", // optional
          });

          if (onSuccess) onSuccess();
        }
      }}
      startInLoadingState
      renderLoading={() => (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
