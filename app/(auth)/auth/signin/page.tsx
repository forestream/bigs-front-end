"use client";

import styles from "./page.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { BASE_URL } from "@/lib/constants";
import { authStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect } from "react";

export default function Page() {
	const router = useRouter();

	const [user, setUser] = useAuth(authStore);

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

			if (!response.ok) throw response;

			const body = await response.json();

			window.localStorage.setItem("user", JSON.stringify(body));
			setUser({ username: body.username, name: body.name });
		} catch (error) {
			if (error instanceof Response) {
				const body = await error.json();
				alert(body.message);
			} else {
				alert(error);
			}
		}
	};

	return (
		<main className={styles.main}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h1>Bigs</h1>
				<label htmlFor="username">
					이메일
					<input id="username" name="username" />
				</label>
				<label htmlFor="password">
					비밀번호
					<input id="password" name="password" type="password" />
				</label>
				<button>로그인</button>
				<p>
					회원이 아니신가요? <Link href="/auth/signup">회원가입 하기</Link>
				</p>
			</form>
		</main>
	);
}
