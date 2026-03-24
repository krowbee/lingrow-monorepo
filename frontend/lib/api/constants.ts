const isServer = typeof window === "undefined";
export const API_URL = isServer ? process.env.NEXT_PUBLIC_API_URL : "/api";
