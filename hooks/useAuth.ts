"use client";

import { BASE_URL } from "@/lib/constants";
import { createStore } from "@/stores/createStore";
import { useEffect, useSyncExternalStore } from "react";

export function useAuth(
	authStore: ReturnType<typeof createStore<User | null>>
): [ReturnType<(typeof authStore)["get"]>, (typeof authStore)["set"]] {
	const user = useSyncExternalStore(authStore.subscribe, authStore.get);

	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem("user") ?? "null");

		if (user) {
			const expiration = new Date(user.exp * 1000);
			const now = new Date();

			if (now < expiration) {
				authStore.set({ username: user.username, name: user.name });
			} else {
				const fetchAsync = async () => {
					try {
						const response = await fetch(`${BASE_URL}/api/auth/refresh`);

						if (!response.ok) {
							throw new Error(
								"인증을 갱신할 수 없습니다. 다시 로그인 해주세요."
							);
						}

						const body = await response.json();

						authStore.set({ username: body.username, name: body.name });
						window.localStorage.setItem("user", JSON.stringify(body));
					} catch (error) {
						console.error(error);
						authStore.set(null);
						window.localStorage.removeItem("user");
					}
				};

				fetchAsync();
			}
		}
	}, [authStore]);

	return [user, authStore.set];
}
