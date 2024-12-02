"use client";

import { BASE_URL } from "@/lib/constants";
import { FormEventHandler } from "react";

export default function Page() {
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		const newUser = Object.fromEntries(formData.entries());

		try {
			const response = await fetch(`${BASE_URL}/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newUser),
			});

			if (!response.ok) {
				throw new Error("회원가입에 실패했습니다.");
			}

			alert("회원가입되었습니다. 로그인해주세요.");
		} catch (error) {
			alert(error);
		}
	};

	return (
		<main>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">이름</label>
				<input id="name" name="name" />
				<label htmlFor="username">이메일</label>
				<input id="username" name="username" />
				<label htmlFor="password">비밀번호</label>
				<input id="password" type="password" name="password" />
				<label htmlFor="confirmPassword">비밀번호 확인</label>
				<input id="confirmPassword" type="password" name="confirmPassword" />
				<button>회원가입</button>
			</form>
		</main>
	);
}
