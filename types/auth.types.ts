export interface KickCredentials {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
}

export interface GoogleCredentials {
  token: string;
  refresh_token: string | null;
  token_uri: string;
  client_id: string;
  client_secret: string;
  scopes: string[];
}

export interface TwitchCredentials {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string[];
  token_type: "bearer";
}

export interface ValidSessionCookie {
  kick_credentials?: KickCredentials;
  google_credentials?: GoogleCredentials;
  twitch_credentials?: TwitchCredentials;
}

export interface SessionAuthToken {
  access_token: string;
  refresh_token: string;
}
