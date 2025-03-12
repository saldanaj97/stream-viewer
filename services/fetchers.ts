// Constants for cache keys
const AUTH_CACHE_KEY = "public_auth_data";
const USER_CACHE_KEY = "user_auth_data";

export const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((r) => r.json());

export const userPlatformAuthFetcher = async (url: RequestInfo | URL) => {
  // Check if we have cached data that hasn't expired
  const cachedData = localStorage.getItem(USER_CACHE_KEY);

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    const currentTime = Date.now();

    // Check if the token is still valid
    if (parsedData.expiry > currentTime + 10000) {
      return parsedData.data;
    }

    // Token expired, remove from cache
    localStorage.removeItem(AUTH_CACHE_KEY);
  }

  // Fetch fresh data if no cache or expired
  const data = await fetcher(url);

  // Calculate expiry timestamp
  const expiry = Date.now() + data.expires_in * 1000;

  // Cache the response with expiry information
  localStorage.setItem(
    AUTH_CACHE_KEY,
    JSON.stringify({
      data,
      expiry,
    }),
  );

  return data;
};
