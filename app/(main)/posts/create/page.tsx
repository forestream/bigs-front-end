"use client";
import useFetch from "@/hooks/useFetch";
import styles from "./page.module.scss";
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function Page() {
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
			await fetch(`${BASE_URL}/api/boards`, {
				method: "POST",
				body: newFormData,
			});

			router.push("/posts");
		} catch {}
	};

	return (
		<main className={styles.main}>
			<h2>글 쓰기</h2>
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
				<input id="title" name="title" />
				<textarea id="content" name="content" />
				<label htmlFor="file">
					파일 업로드
					<input id="file" name="file" type="file" />
				</label>
				<button>작성하기</button>
			</form>
		</main>
	);
}
