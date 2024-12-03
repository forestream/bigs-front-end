"use client";

import { useAuth } from "@/hooks/useAuth";
import styles from "./Nav.module.scss";
import { useRouter } from "next/navigation";
import { deleteServerAuthCookies } from "@/app/actions";
import { authStore } from "@/stores/authStore";
import Link from "next/link";

export default function Nav() {
	const router = useRouter();

	const [user, setUser] = useAuth(authStore);

	const handleSignin = () => router.push("/auth/signin");
	const handleSignout = () => {
		deleteServerAuthCookies();
		window.localStorage.removeItem("user");
		setUser(null);
	};

	return (
		<header className={styles.nav}>
			<Link href="/">
				<h1>Bigs</h1>
			</Link>
			<Link href="/posts" className={styles.pageTitle}>
				게시판
			</Link>
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
