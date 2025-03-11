"use server";

import { cookies } from "next/headers";

// Define the AuthToken interface
interface AuthToken {
  access_token: string;
  refresh_token: string;
}

interface UserSession {
  user_id: string;
  display_name: string;
  profile_image_url: string;
}

type AuthTokenResult = {
  value: string;
  refresh?: string;
} | null;

export async function getCookie(name: string) {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value || null;
}

/**
 * Decodes a base64 string in a Node.js compatible way
 */
function decodeBase64(str: string): string {
  // In Node.js environment (server components)
  return Buffer.from(str, "base64").toString("utf-8");
}

/**
 * Gets auth token from cookies
 */
export async function getAuthToken(): Promise<AuthTokenResult> {
  const authCookie = await getCookie("auth_token");

  if (!authCookie) return null;

  try {
    // Decode the base64 cookie using Node.js Buffer API
    const jsonString = decodeBase64(authCookie);

    // Parse the JSON
    const token = JSON.parse(jsonString) as AuthToken;

    return {
      value: token.access_token,
      refresh: token.refresh_token,
    };
  } catch (error) {
    console.error("Error parsing auth token:", error);

    return null;
  }
}

/**
 * Gets user session from cookies
 */
export async function getUserSession(): Promise<UserSession | null> {
  const userCookie = await getCookie("user_session");

  if (!userCookie) return null;

  try {
    // Decode the base64 cookie using Node.js Buffer API
    const jsonString = decodeBase64(userCookie);

    // Parse the JSON
    return JSON.parse(jsonString) as UserSession;
  } catch (error) {
    console.error("Error parsing user session:", error);

    return null;
  }
}
