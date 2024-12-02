"use client";

import { useAuth } from "@/hooks/useAuth";
import styles from "./Nav.module.scss";
import { useRouter } from "next/navigation";

export default function Nav() {
	const router = useRouter();

	const [user] = useAuth();

	const handleSignin = () => router.push("/auth/signin");
	const handleSignout = () => router.push("/auth/signin");

	return (
		<header className={styles.nav}>
			<h1>Bigs</h1>
			{user && (
				<div className={styles.user}>
					<p>{user.username}</p>
					<p>{user.name}</p>
				</div>
			)}
			<button onClick={user ? handleSignout : handleSignin}>
				{user ? "로그아웃" : "로그인"}
			</button>
		</header>
	);
}
