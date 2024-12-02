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

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/:path*"],
};
