export const isProd = process.env.NODE_ENV === "production"
export const BASE_URL = isProd
	? process.env.NEXT_PUBLIC_BASE_URL ?? "https://brevis.link"
	: "http://localhost:3000"
