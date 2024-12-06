"use server";

import { ACCESS_TOKEN_AGE, MISSION_API_URL } from "@/lib/constants";
import { parseJwt } from "@/lib/utils/parseJwt";
import { cookies } from "next/headers";

export async function deleteAuthCookies() {
	(await cookies()).delete("at");
	(await cookies()).delete("rt");
}

export async function checkAuthState() {
	const accessToken = (await cookies()).get("at")?.value;
	const refreshToken = (await cookies()).get("rt")?.value;

	if (accessToken) {
		const user = parseJwt(accessToken);
		const now = new Date();
		const exp = new Date(user.exp * 1000);

		if (now < exp) return user;
	} else if (refreshToken) {
		const response = await fetch(`${MISSION_API_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
		});

		if (!response.ok) return null;

		const body = await response.json();
		const newUser = parseJwt(body.accessToken);

		(await cookies()).set("at", body.accessToken, {
			httpOnly: true,
			maxAge: ACCESS_TOKEN_AGE,
		});
		(await cookies()).set("rt", body.refreshToken, { httpOnly: true });

		return newUser;
	} else {
		return null;
	}

	return null;
}
