import type { Article } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_WP_REST_URL;
export const getAllArticles = async () => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_WP_URL}/wp/v2/posts?per_page=100&status=publish`,
		);
		const data = await response.json();
		// 念のためstatusでフィルタリング
		return data.filter((article: Article) => article.status === "publish");
	} catch (error) {
		// Error handling
		return [];
	}
};
