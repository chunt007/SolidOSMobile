import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import {
  deleteSolidFile,
  fetchFolderTurtle,
  parseFolderListing,
  SOLID_POD_FOLDER_URL,
  SolidFileEntry
} from "../../lib/solidClient";

export default function FilesScreen() {
  const [files, setFiles] = useState<SolidFileEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const turtle = await fetchFolderTurtle(SOLID_POD_FOLDER_URL);
      console.log("Turtle listing:\n", turtle);
      const list = await parseFolderListing(turtle, SOLID_POD_FOLDER_URL);
      setFiles(list);
    } catch (e: any) {
      setError(e?.message || "Error loading folder");
    }

    setLoading(false);
  };

  const confirmDelete = (file: SolidFileEntry) => {
    Alert.alert(
      "Delete file",
      `Delete "${file.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSolidFile(file.url);
              await loadFiles();
            } catch (e: any) {
              Alert.alert("Delete failed", e?.message || "Unknown error");
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Files in Pod</Text>

      <Button title="Refresh" onPress={loadFiles} />

      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      <ScrollView style={{ marginTop: 16, width: "100%" }}>
        {files.map((file) => (
          <View key={file.url} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {file.name}
                {file.isContainer ? " /" : ""}
              </Text>
              <Text style={styles.url}>{file.url}</Text>
            </View>

            {!file.isContainer && (
              <Button title="Delete" onPress={() => confirmDelete(file)} />
            )}
          </View>
        ))}

        {!loading && files.length === 0 && (
          <Text style={{ marginTop: 16 }}>No files found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    marginBottom: 8
  },
  name: { fontSize: 16, fontWeight: "500" },
  url: { fontSize: 12, color: "#666" },
  error: { color: "red", marginTop: 8 }
});
