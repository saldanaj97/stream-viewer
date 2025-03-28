"use server";

import { cookies } from "next/headers";

import { mockAuthTokens } from "@/data/mockPlatformAuth";
import { SessionAuthToken } from "@/types/auth.types";

export async function getCookie() {
  const cookieStore = await cookies();

  return cookieStore.get("session")?.value || null;
}

// Check if environment is development
// We need to handle this carefully since this is a server component
async function isDevelopment() {
  // In a server component, we can check the NODE_ENV from the process
  return process.env.NODE_ENV === "development";
}

/**
 * Decodes a base64 string in a Node.js compatible way
 */
function decodeBase64(str: string): string {
  return Buffer.from(str, "base64").toString("utf-8");
}

/**
 * Gets auth token from cookies.
 *
 * Only works for kick and twitch since google tokens are stored as 'token'
 * and not 'access_token
 */
export async function getAuthToken(
  auth_token_name: string,
): Promise<SessionAuthToken | Error | null> {
  // Return mock tokens in development mode
  if (await isDevelopment()) {
    const mockPlatform = auth_token_name as keyof typeof mockAuthTokens;

    if (mockAuthTokens[mockPlatform]) {
      if (mockPlatform === "google_credentials") {
        return {
          access_token: mockAuthTokens[mockPlatform].token,
          refresh_token: mockAuthTokens[mockPlatform].refresh_token,
        };
      } else {
        return {
          access_token: mockAuthTokens[mockPlatform].access_token,
          refresh_token: mockAuthTokens[mockPlatform].refresh_token,
        };
      }
    }
  }

  const authCookie = await getCookie();

  if (!authCookie) {
    console.log("No session cookie found");

    return null;
  }

  try {
    const jsonString = decodeBase64(authCookie);

    const token = JSON.parse(jsonString);

    if (!token[auth_token_name]) {
      console.log("No auth token found for this service: ", auth_token_name);

      return null;
    }

    return {
      access_token: token[auth_token_name].access_token,
      refresh_token: token[auth_token_name].refresh_token,
    };
  } catch (error) {
    throw new Error(`Error parsing auth token: ${error}`);
  }
}

/**
 * Gets token from cookies for google credentials.
 *
 * Only works for google since google tokens are stored as 'token'
 * and not 'access_token
 */
export async function getGoogleAuthToken(): Promise<
  SessionAuthToken | Error | null
> {
  // Return mock tokens in development mode
  if (await isDevelopment()) {
    return {
      access_token: mockAuthTokens.google_credentials.token,
      refresh_token: mockAuthTokens.google_credentials.refresh_token,
    };
  }

  const authCookie = await getCookie();

  if (!authCookie) {
    console.log("No youtube session cookie found");

    return null;
  }

  try {
    const jsonString = decodeBase64(authCookie);
    const token = JSON.parse(jsonString);

    if (!token["google_credentials"]) {
      console.log("No auth token found for this service: google_credentials");

      return null;
    }

    return {
      access_token: token["google_credentials"].token,
      refresh_token: token["google_credentials"].refresh_token,
    };
  } catch (error) {
    throw new Error(`Error parsing auth token: ${error}`);
  }
}
