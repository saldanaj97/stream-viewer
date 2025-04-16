export const ENV = {
  isDevelopment: process.env.NODE_ENV === "development",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
};
