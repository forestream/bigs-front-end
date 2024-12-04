"use client";

import { useAuth } from "@/hooks/useAuth";
import styles from "./Nav.module.scss";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/authStore";
import Link from "next/link";

export default function Nav() {
	const router = useRouter();

	const { user, signOut } = useAuth(authStore);

	const handleSignin = () => router.push("/auth/signin");
	const handleSignout = () => {
		signOut();
	};

	return (
		<header className={styles.nav}>
			<Link href="/" className={styles.logo}>
				<h1>Bigs</h1>
			</Link>
			<div className={styles.menu}>
				<Link href="/posts">게시판</Link>
			</div>
			{user && (
				<div className={styles.user}>
					<p>{user.username}</p>
					<p>{user.name}</p>
				</div>
			)}
			<button
				onClick={user ? handleSignout : handleSignin}
				className={styles.button}
			>
				{user ? "로그아웃" : "로그인"}
			</button>
		</header>
	);
}
