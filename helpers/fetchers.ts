export const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((r) => r.json());

export const authenticatedFetcher = async (url: RequestInfo | URL) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token available");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const AUTH_CACHE_KEY = "auth_data";

export const authFetcher = async (url: RequestInfo | URL) => {
  // Check if we have cached data that hasn't expired
  const cachedData = localStorage.getItem(AUTH_CACHE_KEY);

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

// Create accessor for the auth token
export const getAuthToken = () => {
  const authDataString = localStorage.getItem("auth_data");

  if (!authDataString) return null;

  try {
    const authData = JSON.parse(authDataString);

    return authData.data.access_token;
  } catch (error) {
    console.error("Error parsing auth data from localStorage:", error);

    return null;
  }
};
