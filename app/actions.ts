"use server";

import { cookies } from "next/headers";

export async function deleteServerAuthCookies() {
	(await cookies()).delete("at");
	(await cookies()).delete("rt");
}
