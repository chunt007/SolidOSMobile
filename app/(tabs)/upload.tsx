import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { pickAndUploadToSolid } from "../../lib/uploadToSolid";


// CHANGE THIS to your SolidCommunity.net Pod folder
const SOLID_FOLDER_URL = "https://chunt.solidcommunity.net/profile/";

export default function UploadScreen() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setStatus(null);
    setLoading(true);

    try {
      const result = await pickAndUploadToSolid(SOLID_FOLDER_URL);
console.log("DocumentPicker result:", result);

      if (result.ok) {
        setStatus("Uploaded to: " + result.url);
      } else {
        setStatus("Error: " + result.error);
      }
    } catch (err: any) {
      setStatus("Unexpected error: " + err?.message);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload to SolidCommunity.net</Text>

      <Button title="Pick file and upload" onPress={handleUpload} />

      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}

      {status && <Text style={styles.status}>{status}</Text>}
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
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "600"
  },
  status: {
    marginTop: 16,
    textAlign: "center"
  }
});
