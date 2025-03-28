import { ENV } from "@/data/env";

export async function fetchPublicAuthStatus() {
  const response = await fetch(`${ENV.apiUrl}/api/twitch/authenticated`);

  if (!response.ok) {
    throw new Error("Failed to fetch authentication data");
  }

  return response.json();
}
