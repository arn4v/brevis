export const isProd = process.env.NODE_ENV === "production";
export const BASE_URL = isProd
  ? process.env.BASE_URL ?? "https://brevis.link"
  : "http://localhost:3000";
