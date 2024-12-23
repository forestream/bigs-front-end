"use client";

import Input from "@/components/Input";
import styles from "./page.module.scss";
import { BASE_URL } from "@/lib/constants";
import { FormEventHandler } from "react";
import Textarea from "@/components/Textarea";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";

export default function ClientPage({ post }: { post: PostDetail }) {
	const router = useRouter();

	const { data: categories } = useFetch<Record<Categories, string>>(
		{
			url: `${BASE_URL}/api/boards/categories`,
		},
		[]
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const file = formData.get("file");
		formData.delete("file");
		const request = new Blob(
			[JSON.stringify(Object.fromEntries(formData.entries()))],
			{ type: "application/json" }
		);

		const newFormData = new FormData();
		newFormData.append("request", request);
		if (file instanceof File && file.size) newFormData.append("file", file);

		try {
			const response = await fetch(`${BASE_URL}/api/boards/${post.id}`, {
				method: "PATCH",
				body: newFormData,
			});

			if (!response.ok) throw response;

			alert("게시글이 수정되었습니다.");
			router.push(`/posts/${post.id}`);
		} catch {}
	};

	return (
		<main className={styles.main}>
			<h2>글 수정</h2>
			<form onSubmit={handleSubmit}>
				{categories && (
					<select id="category" name="category">
						{(Object.keys(categories) as Categories[]).map((category) => (
							<option key={category} value={category}>
								{categories[category]}
							</option>
						))}
					</select>
				)}
				<Input id="title" name="title" initValue={post.title} />
				<Textarea id="content" name="content" initValue={post.content} />
				<label htmlFor="file">
					파일 업로드
					<input id="file" name="file" type="file" />
				</label>
				<button>작성하기</button>
			</form>
		</main>
	);
}
