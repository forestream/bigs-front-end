"use client";

import { BASE_URL } from "@/lib/constants";
import styles from "../page.module.scss";
import { useRouter } from "next/navigation";

export default function PostOptions({ postId }: { postId: string }) {
	const router = useRouter();

	const handleEdit = () => router.push(`/posts/${postId}/edit`);

	const handleDelete = async () => {
		try {
			const response = await fetch(`${BASE_URL}/api/boards/${postId}`, {
				method: "DELETE",
			});

			if (!response.ok) throw response;

			alert("글이 삭제되었습니다.");
			router.push("/posts");
		} catch {}
	};

	return (
		<div className={styles.options}>
			<button onClick={handleEdit}>수정</button>
			<button onClick={handleDelete}>삭제</button>
		</div>
	);
}
