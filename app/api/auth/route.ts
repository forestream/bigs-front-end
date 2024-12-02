import { MISSION_API_URL } from "@/lib/constants";
import { parseJwt } from "@/lib/utils/parseJwt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const formData = await request.formData();

	const user = Object.fromEntries(formData.entries());

	let body;
	try {
		const response = await fetch(`${MISSION_API_URL}/auth/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
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
