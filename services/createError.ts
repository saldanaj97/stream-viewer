export function createError(
  message: string,
  fallbackMessage = "An error occurred",
): Error {
  return new Error(message || fallbackMessage);
}
