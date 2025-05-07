export const ENV = {
  isDevelopment: process.env.NODE_ENV === "development",
  apiUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : process.env.NEXT_PUBLIC_API_URL,
};
