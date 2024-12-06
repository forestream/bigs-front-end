type Categories = "NOTICE" | "FREE" | "QNA" | "ETC";

type Post = {
	category: Categories;
	createdAt: string;
	id: number;
	title: string;
};

type PostDetail = Omit<Post, "category"> & {
	boardCategory: Categories;
	content: string;
	imageUrl: string;
};

type User = {
	name: string;
	username: string;
	iat: number;
	exp: number;
};

type Posts = {
	content: Post[];
	pageable: {
		pageNumber: number;
		pageSize: number;
		sort: {
			unsorted: boolean;
			sorted: boolean;
			empty: boolean;
		};
		offset: number;
		unpaged: boolean;
		paged: boolean;
	};
	totalPages: number;
	totalElements: number;
	last: boolean;
	numberOfElements: number;
	size: number;
	number: number;
	sort: {
		unsorted: boolean;
		sorted: boolean;
		empty: boolean;
	};
	first: boolean;
	empty: boolean;
};
