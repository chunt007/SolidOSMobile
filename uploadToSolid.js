// lib/uploadToSolid.js
import * as DocumentPicker from "expo-document-picker";

export async function pickAndUploadToSolid(folderUrl) {
  // 1. Pick a file
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true
  });

  console.log("Picker result:", result);

  let file;

  // Android / new Expo format
  if (result.canceled === false && result.assets?.length > 0) {
    file = result.assets[0];
  }
  // iOS / older Expo format
  else if (result.type === "success") {
    file = result;
  }
  else {
    return { ok: false, error: "User cancelled file picker" };
  }

  const { uri, name, mimeType } = file;

  // 2. Read file directly as a blob using fetch
  const fileResponse = await fetch(uri);
  const blob = await fileResponse.blob();

  // 3. Build Pod URL
  const targetUrl = folderUrl.endsWith("/")
    ? folderUrl + name
    : folderUrl + "/" + name;

  // 4. Upload to Solid Pod
  const res = await fetch(targetUrl, {
    method: "PUT",
    headers: {
      "Content-Type": mimeType || "application/octet-stream"
    },
    body: blob
  });

  if (!res.ok) {
    return { ok: false, error: `Upload failed: ${res.status}` };
  }

  return { ok: true, url: targetUrl };
}
