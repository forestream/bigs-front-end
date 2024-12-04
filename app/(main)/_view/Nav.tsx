"use client";

import { useAuth } from "@/hooks/useAuth";
import styles from "./Nav.module.scss";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/authStore";
import Link from "next/link";
import IconHamBurger from "@/components/Icons/IconHamburger";
import { useState } from "react";
import Modal from "@/components/Modal";
import IconX from "@/components/Icons/IconX";

export default function Nav() {
	const router = useRouter();

	const { user, signOut } = useAuth(authStore);

	const handleSignin = () => router.push("/auth/signin");
	const handleSignout = () => {
		signOut();
	};

	const [isOpen, setIsOpen] = useState(false);
	const handleIsOpen = (isOpen: boolean) => setIsOpen(isOpen);

	return (
		<header className={styles.nav}>
			<Link href="/" className={styles.logo}>
				<h1>Bigs</h1>
			</Link>
			<button className={styles.hamburger} onClick={() => handleIsOpen(true)}>
				<IconHamBurger />
			</button>
			{isOpen && (
				<Modal isOpen={isOpen}>
					<Modal.Overlay>
						<Modal.Content className={styles.modal}>
							<button
								className={styles.close}
								onClick={() => handleIsOpen(false)}
							>
								<IconX className={styles.x} />
							</button>
							<h1 className={styles.logo}>Bigs</h1>
							<div className={styles.profile}>
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
							</div>
							<div className={styles.menu} onClick={() => handleIsOpen(false)}>
								<Link href="/posts">게시판</Link>
							</div>
						</Modal.Content>
					</Modal.Overlay>
				</Modal>
			)}
			<div className={styles.navInner}>
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
			</div>
		</header>
	);
}
