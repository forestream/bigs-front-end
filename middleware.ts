import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_AGE, BASE_URL, MISSION_API_URL } from "./lib/constants";

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get("at")?.value;
	const refreshToken = request.cookies.get("rt")?.value;

	if (
		!accessToken &&
		refreshToken &&
		!request.nextUrl.pathname.startsWith("/api/auth")
	) {
		const response = await fetch(`${MISSION_API_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				refreshToken: request.cookies.get("rt")?.value,
			}),
		});

		if (!response.ok) {
			return NextResponse.redirect(new URL(`${BASE_URL}/auth/signin`));
		}

		const body = await response.json();

		const nextResponse = new NextResponse();

		nextResponse.cookies.set("at", body.accessToken, {
			httpOnly: true,
			maxAge: ACCESS_TOKEN_AGE,
		});
		nextResponse.cookies.set("rt", body.refreshToken, { httpOnly: true });

		return NextResponse.redirect(request.url, {
			headers: nextResponse.headers,
		});
	}

	if (request.nextUrl.pathname.startsWith("/posts")) {
		if (!accessToken && !refreshToken) {
			return NextResponse.redirect(
				new URL("/auth/signin", request.nextUrl.origin)
			);
		}
	}

	if (request.nextUrl.pathname.startsWith("/api/boards")) {
		request.headers.set(
			"Authorization",
			`Bearer ${request.cookies.get("at")?.value}`
		);

		return NextResponse.rewrite(
			new URL(request.url.split("/api")[1], MISSION_API_URL),
			{
				request: { headers: request.headers },
			}
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/:path*", "/posts/:path*"],
};
