"use client";

// import { useState } from "react";
import styles from "./Nav.module.scss";

export default function Nav() {
	// const { user, setUser } = useState();

	return (
		<header className={styles.nav}>
			<h1>Bigs</h1>
			<div>
				<p>email</p>
				<p>name</p>
			</div>
		</header>
	);
}
