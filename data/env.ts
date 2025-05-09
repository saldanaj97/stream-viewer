export const ENV = {
  isDevelopment: process.env.NODE_ENV === "development",
  apiUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : process.env.NEXT_PUBLIC_API_URL,
  domainUrl:
    process.env.NODE_ENV === "development"
      ? "localhost"
      : process.env.NEXT_PUBLIC_DOMAIN,
};
