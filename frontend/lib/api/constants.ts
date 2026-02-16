const isClient = typeof window !== "undefined";
export const API_URL = isClient
  ? "http://localhost:3003"
  : process.env.NEXT_PUBLIC_API_URL;
