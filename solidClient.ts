// lib/solidClient.ts
// IMPORTANT: SolidCommunity requires a trailing slash for container URLs.
// Example: https://YOURNAME.solidcommunity.net/

export const SOLID_POD_FOLDER_URL = "https://yourname.solidcommunity.net/";

/* -------------------------------------------------------
   1. GET FOLDER LISTING (Turtle)
------------------------------------------------------- */
export async function fetchFolderTurtle(folderUrl: string): Promise<string> {
  const res = await fetch(folderUrl, {
    method: "GET",
    headers: {
      Accept: "text/turtle"
    }
  });

  if (!res.ok) {
    throw new Error("Failed to load folder: " + res.status);
  }

  return await res.text();
}

/* -------------------------------------------------------
   2. PARSE LDP CONTAINER (ldp:contains)
------------------------------------------------------- */
export type SolidFileEntry = {
  url: string;
  name: string;
  isContainer: boolean;
};

export async function parseFolderListing(
  turtleText: string,
  folderUrl: string
): Promise<SolidFileEntry[]> {
  const files: SolidFileEntry[] = [];

  const regex = /ldp:contains\s+((?:<[^>]+>\s*,?\s*)+)/g;

  let block;
  while ((block = regex.exec(turtleText)) !== null) {
    const group = block[1];

    const refs = [...group.matchAll(/<([^>]+)>/g)];

    for (const r of refs) {
      const ref = r[1];
      const fullUrl = new URL(ref, folderUrl).toString();
      const isContainer = fullUrl.endsWith("/");
      const name = fullUrl.replace(folderUrl, "") || fullUrl;

      files.push({ url: fullUrl, name, isContainer });
    }
  }

  return files;
}

/* -------------------------------------------------------
   3. PARSE FILE SIZE (posix:size)
------------------------------------------------------- */
export function parseFileSize(turtleText: string): number | null {
  const match = turtleText.match(/posix:size\s+(\d+)/);
  if (!match) return null;
  return Number(match[1]);
}

/* -------------------------------------------------------
   4. DELETE FILE
------------------------------------------------------- */
export async function deleteSolidFile(fileUrl: string): Promise<void> {
  const res = await fetch(fileUrl, { method: "DELETE" });

  console.log("Delete status:", res.status);
  console.log("Delete text:", await res.text());

  if (!res.ok) {
    throw new Error("Delete failed: " + res.status);
  }
}

/* -------------------------------------------------------
   5. COUNT ALL FILES (for progress bar)
------------------------------------------------------- */
export async function countAllFiles(folderUrl: string): Promise<number> {
  let count = 0;

  const turtle = await fetchFolderTurtle(folderUrl);
  const entries = await parseFolderListing(turtle, folderUrl);

  for (const entry of entries) {
    if (entry.isContainer) {
      count += await countAllFiles(entry.url);
    } else {
      count += 1;
    }
  }

  return count;
}

/* -------------------------------------------------------
   6. PROGRESS BAR RENDERER (Node.js)
------------------------------------------------------- */
export function renderProgress(processed: number, total: number) {
  const percent = processed / total;
  const barLength = 30;
  const filled = Math.round(percent * barLength);
  const bar = "█".repeat(filled) + "-".repeat(barLength - filled);

  process.stdout.write(
    `\r[${bar}] ${(percent * 100).toFixed(1)}% (${processed}/${total})`
  );
}

/* -------------------------------------------------------
   7. GET TOTAL POD SIZE WITH PROGRESS
------------------------------------------------------- */
export async function getTotalPodSizeWithProgress(
  folderUrl: string,
  onProgress: (processed: number, total: number) => void,
  totalFiles: number,
  state = { processed: 0 }
): Promise<number> {
  let total = 0;

  const turtle = await fetchFolderTurtle(folderUrl);
  const entries = await parseFolderListing(turtle, folderUrl);

  for (const entry of entries) {
    if (entry.isContainer) {
      total += await getTotalPodSizeWithProgress(
        entry.url,
        onProgress,
        totalFiles,
        state
      );
    } else {
      const fileTurtle = await fetchFolderTurtle(entry.url);
      const size = parseFileSize(fileTurtle);

      if (size !== null) {
        total += size;
      }

      state.processed++;
      onProgress(state.processed, totalFiles);
    }
  }

  return total;
}

/* -------------------------------------------------------
   8. RUNNER (example)
------------------------------------------------------- */
export async function runPodSizeCalculation() {
  console.log("Counting files...");
  const totalFiles = await countAllFiles(SOLID_POD_FOLDER_URL);

  console.log(`Total files: ${totalFiles}`);
  console.log("Calculating total size...");

  const totalSize = await getTotalPodSizeWithProgress(
    SOLID_POD_FOLDER_URL,
    renderProgress,
    totalFiles
  );

  console.log("\nDone!");
  console.log("Total size:", totalSize, "bytes");
}
