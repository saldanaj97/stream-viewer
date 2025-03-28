import { ENV } from "@/data/env";

export async function fetchPublicAuthStatus() {
  // Return mock data if in development mode
  if (ENV.isDevelopment) {
    return {
      access_token: "mock-public-twitch-access-token",
      expires_in: 14400,
    };
  }

  const response = await fetch(`${ENV.apiUrl}/api/twitch/authenticated`);

  if (!response.ok) {
    throw new Error("Failed to fetch authentication data");
  }

  return response.json();
}
