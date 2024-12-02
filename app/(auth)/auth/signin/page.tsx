"use client";

import { useAuth } from "@/hooks/useAuth";
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect } from "react";

export default function Page() {
	const router = useRouter();

	const [user, setUser] = useAuth();

	useEffect(() => {
		if (user) router.push("/");
	}, [router, user]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		try {
			const response = await fetch(`${BASE_URL}/api/auth`, {
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

			const body = await response.json();

			setUser({ username: body.username, name: body.name });
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
