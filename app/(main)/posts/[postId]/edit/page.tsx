import { MISSION_API_URL } from "@/lib/constants";
import ClientPage from "./ClientPage";
import { cookies } from "next/headers";

export default async function Page({
	params,
}: {
	params: Promise<{ postId: string }>;
}) {
	const postId = (await params).postId;

	const accessToken = (await cookies()).get("at")?.value;

	const response = await fetch(`${MISSION_API_URL}/boards/${postId}`, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	const body = await response.json();

	return <ClientPage post={body} />;
}
