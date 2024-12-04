"use client";

import { checkAuthState, deleteAuthCookies } from "@/app/actions";
import { BASE_URL } from "@/lib/constants";
import { createStore } from "@/stores/createStore";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

export function useAuth(
	authStore: ReturnType<typeof createStore<User | null>>
) {
	const user = useSyncExternalStore(
		authStore.subscribe,
		authStore.get,
		() => null
	);

	useEffect(() => {
		const checkAuthStateAsync = async () => {
			const user = await checkAuthState();
			authStore.set(user);
		};

		checkAuthStateAsync();
	}, []);

	const signIn = useCallback(
		async (formData: FormData) => {
			try {
				const response = await fetch(`${BASE_URL}/api/auth`, {
					method: "POST",
					body: formData,
				});

				if (!response.ok) throw response;

				const body = await response.json();

				authStore.set(body);
			} catch (error) {
				if (error instanceof Response) {
					const body = await error.json();
					alert(body.message);
				} else {
					alert(error);
				}
			}
		},
		[authStore]
	);

	const signOut = useCallback(() => {
		authStore.set(null);
		deleteAuthCookies();
	}, [authStore]);

	const auth = useMemo(() => {
		console.log("auth rerendered");
		return {
			user,
			signIn,
			signOut,
		};
	}, [user, signIn, signOut]);

	return auth;
}
