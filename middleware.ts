import { NextRequest, NextResponse } from "next/server";
import { MISSION_API_URL } from "./lib/constants";

export async function middleware(request: NextRequest) {
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

	if (request.nextUrl.pathname.startsWith("/posts")) {
		if (!request.cookies.has("at") && request.cookies.has("rt")) {
			const response = await fetch(`${MISSION_API_URL}/auth/refresh`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					refreshToken: request.cookies.get("rt")?.value,
				}),
			});

			const body = await response.json();

			const nextResponse = new NextResponse();

			nextResponse.cookies.set("at", body.accessToken, {
				httpOnly: true,
				maxAge: 300,
			});
			nextResponse.cookies.set("rt", body.refreshToken, { httpOnly: true });

			return NextResponse.next({ headers: nextResponse.headers });
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/:path*", "/posts/:path*"],
};
