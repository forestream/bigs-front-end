import { MISSION_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import PostOptions from "./_view/PostOptions";

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

	const { title, boardCategory, createdAt, imageUrl, content } = body;

	const fullDate = new Date(createdAt);
	const year = fullDate.getFullYear();
	const month = fullDate.getMonth() + 1;
	const date = fullDate.getDate();
	const hour = fullDate.getHours();
	const minute = fullDate.getMinutes();

	return (
		<main className={styles.main}>
			<div className={styles.postHeader}>
				<Link href="/posts" className={styles.breadcrumbs}>
					목록 보기
				</Link>
				<PostOptions postId={postId} />
			</div>
			<section>
				<h2>{title}</h2>
				<p>{boardCategory}</p>
				<p>
					{year}년 {month}월 {date}일 {hour}:{minute}
				</p>
			</section>
			<article>
				{imageUrl && (
					<Image
						src={`${MISSION_API_URL}${imageUrl}`}
						alt="게시글 이미지"
						width={400}
						height={300}
					/>
				)}
				<p className={styles.content}>{content}</p>
			</article>
		</main>
	);
}
