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

	const { user, signIn } = useAuth(authStore);

	useEffect(() => {
		if (user) router.push("/");
	}, [router, user]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		signIn(formData);
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
