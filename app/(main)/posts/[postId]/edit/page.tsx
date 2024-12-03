"use client";

import styles from "./page.module.scss";
import { BASE_URL } from "@/lib/constants";
import { FormEventHandler, useEffect, useState } from "react";

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

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const file = formData.get("file") as File;
		formData.delete("file");
		const request = new Blob(
			[JSON.stringify(Object.fromEntries(formData.entries()))],
			{ type: "application/json" }
		);

		const newFormData = new FormData();
		newFormData.append("request", request);
		file.size && newFormData.append("file", file);

		try {
			const response = await fetch(`${BASE_URL}/api/boards`, {
				method: "POST",
				body: newFormData,
			});

			const body = await response.json();
		} catch {}
	};

	return (
		<main className={styles.main}>
			<h2>글 수정</h2>
			<form onSubmit={handleSubmit}>
				<select id="category" name="category">
					{Object.keys(categories).map((category) => (
						<option key={category} value={category}>
							{categories[category]}
						</option>
					))}
				</select>
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
