"use client";

import { DependencyList, useEffect, useMemo, useState } from "react";

export default function useFetch<T>(
	fetchInit: {
		url: string | URL;
		options?: RequestInit;
	},
	deps?: DependencyList
) {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<unknown | null>(null);
	const [data, setData] = useState<T>();

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		(async () => {
			setError(null);
			setIsError(false);
			setIsLoading(true);

			try {
				const response = await fetch(fetchInit.url, {
					...fetchInit.options,
					signal,
				});

				if (!response.ok) throw response;

				const body = await response.json();

				setData(body);
			} catch (error) {
				setIsError(true);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		})();

		return () => controller.abort();
	}, deps);

	const state = useMemo(
		() => ({
			isLoading,
			isError,
			error,
			data,
		}),
		[isLoading, isError, error, data]
	);

	return state;
}
