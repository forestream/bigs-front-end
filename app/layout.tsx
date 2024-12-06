import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Bigs Front-end test",
	description:
		"빅스홀딩스 프론트엔드 개발자 과제테스트 제출용 프로젝트입니다. ",
	authors: {
		name: "조한빈",
		url: "https://github.com/forestream/bigs-front-end",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				{children}
			</body>
		</html>
	);
}
