export const MISSION_API_URL = "https://front-mission.bigs.or.kr";
export const BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_BASE_URL
		: process.env.NEXT_PUBLIC_BASE_URL_DEV ?? "http://localhost:3000";

export const ACCESS_TOKEN_AGE = 300;

export const PAGES_PER_GROUP = 5;
