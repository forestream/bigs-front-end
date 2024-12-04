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

type User = {
	name: string;
	username: string;
	iat: number;
	exp: number;
};
