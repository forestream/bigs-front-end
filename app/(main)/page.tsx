"use client";

import { BASE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function Page() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchAsync = async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/boards?page=0&size=10`);

				if (!response.ok) {
					throw new Error(response.status + response.statusText);
				}

				const body = await response.json();

				setPosts(body);

				console.log(body);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAsync();
	}, []);

	return <main>boards</main>;
}
