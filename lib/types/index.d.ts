type User = { username: string; name: string };

type Post = {
	category: "NOTICE" | "FREE" | "QNA" | "ETC";
	createdAt: string;
	id: number;
	title: string;
};

type PostDetail = Omit<Post, "category"> & {
	boardCategory: "NOTICE" | "FREE" | "QNA" | "ETC";
	content: string;
	imageUrl: string;
};
