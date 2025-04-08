import { ENV } from "@/data/env";

/**
 * Attempts to refresh tokens for a specific platform
 * @param platform The platform to refresh tokens for (twitch, youtube, kick)
 * @returns Object containing success status and any error
 */
export const refreshTokenForPlatform = async (
  platform: "twitch" | "youtube" | "kick",
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Different endpoints for each platform
    const endpoints = {
      twitch: `${ENV.apiUrl}/api/twitch/oauth/refresh`,
      youtube: `${ENV.apiUrl}/api/google/oauth/refresh`,
      kick: `${ENV.apiUrl}/api/kick/oauth/refresh`,
    };

    const response = await fetch(endpoints[platform], {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error:
          errorData.message ||
          `Failed to refresh ${platform} token: ${response.status}`,
      };
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
};

/**
 * Attempts to refresh all tokens that might be expired
 * @returns Object containing success status for each platform
 */
export const refreshAllTokens = async (): Promise<{
  twitch: boolean;
  youtube: boolean;
  kick: boolean;
}> => {
  const results = await Promise.allSettled([
    refreshTokenForPlatform("twitch"),
    refreshTokenForPlatform("youtube"),
    refreshTokenForPlatform("kick"),
  ]);

  return {
    twitch: results[0].status === "fulfilled" && results[0].value.success,
    youtube: results[1].status === "fulfilled" && results[1].value.success,
    kick: results[2].status === "fulfilled" && results[2].value.success,
  };
};
