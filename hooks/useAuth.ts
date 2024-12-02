"use client";

import { createStore } from "@/stores/createStore";
import { useSyncExternalStore } from "react";

const authStore = createStore<{ username: string; name: string } | null>(null);

export function useAuth(): [
	ReturnType<(typeof authStore)["get"]>,
	(typeof authStore)["set"]
] {
	const user = useSyncExternalStore(authStore.subscribe, authStore.get);

	return [user, authStore.set];
}
