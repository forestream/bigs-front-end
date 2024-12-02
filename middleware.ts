import { NextRequest, NextResponse } from "next/server";
import { MISSION_API_URL } from "./lib/constants";

export async function middleware(request: NextRequest) {
	request.headers.set("Authorization", `Bearer ${request.cookies.get("at")}`);

	return NextResponse.rewrite(new URL(request.url, MISSION_API_URL), {
		request: { headers: request.headers },
	});
}

export const config = {
	matcher: ["/api/:path*"],
};
