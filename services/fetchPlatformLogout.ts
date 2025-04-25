import { ENV } from "@/data/env";

export const initiateTwitchLogout = async (): Promise<any> => {
  const response = await fetch(`${ENV.apiUrl}/api/twitch/logout`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error while logging out of Twitch. Status: ${response.status}`,
    );
  }

  return response.json();
};

export const initiateYoutubeLogout = async (): Promise<any> => {
  const response = await fetch(`${ENV.apiUrl}/api/google/logout`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error while logging out of YouTube. Status: ${response.status}`,
    );
  }

  return response.json();
};
