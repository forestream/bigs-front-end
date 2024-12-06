import styles from "./page.module.scss";

export default function Page() {
	return (
		<main className={styles.main}>
			<section>
				<h1 className={styles.h1}>환영합니다.</h1>
				<p>로그인하여 글 쓰기를 시작하세요.</p>
			</section>
		</main>
	);
}
