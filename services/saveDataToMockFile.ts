/**
 * Utility function to save the current fetched data as mock data to the clipboard.
 * This is for one-time use to generate mock data for development and testing.
 */
const saveDataToMockFile = (data: any) => {
  if (!data || data.length === 0) {
    console.error("No data available to save as mock data");

    return;
  }

  try {
    // Format the data as a TypeScript export
    const mockDataString = `// Auto-generated mock top streams data
      // Generated on ${new Date().toISOString()}
      import { Stream } from "@/types/stream.types";

      export const mockTopStreams: Stream[] = ${JSON.stringify(data, null, 2)};`;

    // Copy to clipboard
    navigator.clipboard
      .writeText(mockDataString)
      .then(() => {
        console.log("✅ Mock data copied to clipboard!");
        console.log("You can now paste this into your mockStreams.ts file");
      })
      .catch((err) => {
        console.error("Failed to copy mock data to clipboard:", err);
      });

    // Log the data to console as well for fallback access
    console.log("📄 Mock data (in case clipboard failed):");
    console.log(mockDataString);
  } catch (error) {
    console.error("Error generating mock data:", error);
  }
};
