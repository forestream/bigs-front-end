"use client";

import useFetch from "@/hooks/useFetch";
import styles from "./page.module.scss";
import { BASE_URL, PAGES_PER_GROUP } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
	const { data: categories } = useFetch<Record<Categories, string>>(
		{
			url: `${BASE_URL}/api/boards/categories`,
		},
		[]
	);

	const [page, setPage] = useState(1);
	const { data: posts, isLoading: isLoadingPosts } = useFetch<Posts>(
		{
			url: `${BASE_URL}/api/boards?page=${page - 1}&size=10`,
		},
		[page]
	);

	const [totalPages, setTotalPages] = useState(0);
	const handleChangePage = (nextPage: number) => {
		setPage(nextPage);
	};

	useEffect(() => {
		if (posts) setTotalPages(posts.totalPages);
	}, [posts]);

	const pageGruop = useMemo(
		() => Math.floor((page - 1) / PAGES_PER_GROUP),
		[page]
	);

	const handleClickNextPageGroup = () =>
		setPage(() => PAGES_PER_GROUP * (pageGruop + 1) + 1);

	const handleClickPrevPageGroup = () =>
		setPage(() => PAGES_PER_GROUP * (pageGruop - 1) + 5);

	return (
		<main className={styles.main}>
			<h2>게시판</h2>
			<section className={styles.posts}>
				{isLoadingPosts
					? Array.from({ length: 10 }).map((_, i) => (
							<div key={i} className={`${styles.post}`}>
								<p className={`${styles.category} ${styles.postGlimmer}`}></p>
								<p className={`${styles.title} ${styles.postGlimmer}`}></p>
								<p className={`${styles.date} ${styles.postGlimmer}`}></p>
							</div>
					  ))
					: posts?.content.map((post) => {
							const createdAt = new Date(post.createdAt);
							const year = createdAt.getFullYear();
							const month = createdAt.getMonth() + 1;
							const date = createdAt.getDate();

							return (
								<Link
									key={post.id}
									href={`/posts/${post.id}`}
									className={styles.post}
								>
									<p className={styles.category}>
										{categories && categories[post.category]}
									</p>
									<p className={styles.title}>{post.title}</p>
									<p className={styles.date}>
										{year}년 {month}월 {date}일
									</p>
								</Link>
							);
					  })}
			</section>
			<div className={styles.pagination}>
				<button onClick={handleClickPrevPageGroup}>이전</button>
				{Array.from({ length: PAGES_PER_GROUP }).map((_, i) => {
					const pageNumber = PAGES_PER_GROUP * pageGruop + i + 1;

					return pageNumber <= totalPages ? (
						<button
							className={pageNumber === page ? styles.selected : undefined}
							key={i}
							onClick={() => handleChangePage(pageNumber)}
						>
							{pageNumber}
						</button>
					) : null;
				})}
				<button onClick={handleClickNextPageGroup}>다음</button>
			</div>
			<Link href={"/posts/create"} className={styles.button}>
				글 쓰기
			</Link>
		</main>
	);
}
