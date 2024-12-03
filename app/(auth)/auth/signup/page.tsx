"use client";

import { MISSION_API_URL } from "@/lib/constants";
import Link from "next/link";
import styles from "./page.module.scss";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

export default function Page() {
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		const newUser = Object.fromEntries(formData.entries());

		try {
			const response = await fetch(`${MISSION_API_URL}/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newUser),
			});

			if (!response.ok) {
				throw response;
			}

			alert("회원가입되었습니다. 로그인 페이지로 이동합니다.");
			router.push("/auth/signin");
		} catch (error) {
			if (error instanceof Response) {
				const body = await error.json();
				alert(Object.values(body).join(""));
			} else if (error instanceof Error) {
				alert(error.name + " " + error.message);
			}
		}
	};

	return (
		<main className={styles.main}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h1>Bigs</h1>
				<label htmlFor="name">
					이름
					<Input id="name" name="name" />
				</label>
				<label htmlFor="username">
					이메일
					<Input id="username" name="username" />
				</label>
				<label htmlFor="password">
					비밀번호
					<Input id="password" type="password" name="password" />
				</label>
				<label htmlFor="confirmPassword">
					비밀번호 확인
					<Input id="confirmPassword" type="password" name="confirmPassword" />
				</label>
				<button>회원가입</button>
				<p>
					회원이신가요? <Link href="/auth/signin">로그인 하기</Link>
				</p>
			</form>
		</main>
	);
}
