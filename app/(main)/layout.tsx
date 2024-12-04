import styles from "./page.module.scss";
import Nav from "./_view/Nav";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav />
			<div className={styles.outer}>{children}</div>
		</>
	);
}
