import { MISSION_API_URL } from "@/lib/constants";
import { parseJwt } from "@/lib/utils/parseJwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const refreshToken = request.cookies.get("rt")?.value;

	if (!refreshToken)
		return new NextResponse(
			JSON.stringify({
				message: "리프레시 토큰이 존재하지 않습니다. 다시 로그인 해주세요.",
			}),
			{ status: 400, statusText: "Bad Request" }
		);

	let body;

	try {
		const response = await fetch(`${MISSION_API_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
		});

		if (!response.ok) {
			throw response;
		}

		body = await response.json();
	} catch (response) {
		// 로그인 실패 시 API 응답을 그대로 클라이언트에 전달
		return response;
	}

	const jwt = parseJwt(body.accessToken);

	const nextResponse = new NextResponse(JSON.stringify(jwt));

	nextResponse.cookies.set("at", body.accessToken, {
		httpOnly: true,
		maxAge: 300,
	});
	nextResponse.cookies.set("rt", body.refreshToken, { httpOnly: true });

	return nextResponse;
}
