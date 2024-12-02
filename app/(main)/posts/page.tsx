"use client";

import { BASE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function Page() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const fetchAsync = async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/boards?page=0&size=10`);

				if (!response.ok) {
					throw new Error(response.status + response.statusText);
				}

				const body = await response.json();

				setPosts(body.content);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAsync();
	}, []);

	return (
		<main>
			{posts.map((post) => {
				const createdAt = new Date(post.createdAt);
				console.log(createdAt);
				const year = createdAt.getFullYear();
				const month = createdAt.getMonth() + 1;
				const date = createdAt.getDate();

				return (
					<div key={post.id}>
						<p>{post.category}</p>
						<p>{post.title}</p>
						<p>
							{year}년 {month}월 {date}일
						</p>
					</div>
				);
			})}
		</main>
	);
}
