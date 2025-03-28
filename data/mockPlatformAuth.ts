import { LoginStatusResponse } from "@/types/auth.types";

/* These are used for development mode */

// Mock authentication tokens
export const mockAuthTokens = {
  twitch_credentials: {
    access_token: "mock-twitch-access-token",
    refresh_token: "mock-twitch-refresh-token",
  },
  kick_credentials: {
    access_token: "mock-kick-access-token",
    refresh_token: "mock-kick-refresh-token",
  },
  google_credentials: {
    token: "mock-google-access-token",
    refresh_token: "mock-google-refresh-token",
  },
};

// Mock login status
export const mockLoginStatus: LoginStatusResponse = {
  data: [
    { platform: "Twitch", loggedIn: true },
    { platform: "Youtube", loggedIn: true },
    { platform: "Kick", loggedIn: true },
  ],
  error: null,
};

// Mock login URLs
export const mockLoginUrls = {
  twitch: {
    login_url: "https://mock-twitch-login-url.com/auth",
  },
  youtube: {
    authorization_url: "https://mock-youtube-login-url.com/auth",
  },
  kick: {
    url: "https://mock-kick-login-url.com/auth",
  },
};
