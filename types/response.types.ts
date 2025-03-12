export interface PublicAuthResponse {
  data: {
    access_token: string;
    expires_in: number;
  };
  error: Error | null;
  isLoading: boolean;
  success: boolean;
}
