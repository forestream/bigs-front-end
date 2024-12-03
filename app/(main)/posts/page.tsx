"use client";

import styles from "./page.module.scss";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
	const [categories, setCategories] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		const fetchAsync = async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/boards/categories`);

				if (!response.ok)
					throw new Error(response.status + response.statusText);

				const body = await response.json();

				setCategories(body);
			} catch {}
		};

		fetchAsync();
	}, []);

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
		<main className={styles.main}>
			<h2>게시판</h2>
			<section>
				{posts.map((post) => {
					const createdAt = new Date(post.createdAt);
					const year = createdAt.getFullYear();
					const month = createdAt.getMonth() + 1;
					const date = createdAt.getDate();

					return (
						<Link key={post.id} href={`/posts/${post.id}`}>
							<p className={styles.category}>{categories[post.category]}</p>
							<p className={styles.title}>{post.title}</p>
							<p className={styles.date}>
								{year}년 {month}월 {date}일
							</p>
						</Link>
					);
				})}
			</section>
			<Link href={"/posts/create"} className={styles.button}>
				글 쓰기
			</Link>
		</main>
	);
}
