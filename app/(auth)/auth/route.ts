import { MISSION_API_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const formData = await request.formData();

	const user = Object.fromEntries(formData.entries());

	const nextResponse = new NextResponse();

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

		const body = await response.json();

		nextResponse.cookies.set("at", body.accessToken);
		nextResponse.cookies.set("rt", body.refreshToken);
	} catch (response) {
		// API 응답을 그대로 클라이언트에 전달
		return response;
	}

	return nextResponse;
}
