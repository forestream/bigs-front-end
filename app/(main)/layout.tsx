import Nav from "./_view/Nav";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav />
			{children}
		</>
	);
}
