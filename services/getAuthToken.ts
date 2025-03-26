"use server";

import { cookies } from "next/headers";

import { AuthToken, SessionAuthToken } from "@/types/auth.types";

interface UserSession {
  user_id: string;
  display_name: string;
  profile_image_url: string;
}

export async function getCookie() {
  const cookieStore = await cookies();

  return cookieStore.get("session")?.value || null;
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
  const authCookie = await getCookie();

  if (!authCookie) {
    console.log("No youtube session cookie found");

    return null;
  }

  try {
    const jsonString = decodeBase64(authCookie);
    const token = JSON.parse(jsonString) as AuthToken;

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

/**
 * Gets user session from cookies
 */
export async function getUserSession(): Promise<UserSession | null> {
  const userCookie = await getCookie();

  if (!userCookie) return null;

  try {
    const jsonString = decodeBase64(userCookie);

    return JSON.parse(jsonString) as UserSession;
  } catch (error) {
    console.error("Error parsing user session:", error);

    return null;
  }
}
