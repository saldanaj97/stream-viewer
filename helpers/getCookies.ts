// Helper function to parse cookies
export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");

    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
};
