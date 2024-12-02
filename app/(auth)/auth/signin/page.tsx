"use client";

import { BASE_URL } from "@/lib/constants";
import { FormEventHandler } from "react";

export default function Page() {
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		try {
			const response = await fetch(`${BASE_URL}/auth`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok)
				throw new Error(
					"로그인에 실패했습니다: " +
						response.status +
						" " +
						response.statusText
				);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<main>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">이메일</label>
				<input id="username" name="username" />
				<label htmlFor="password">비밀번호</label>
				<input id="password" name="password" type="password" />
				<button>로그인</button>
			</form>
		</main>
	);
}
