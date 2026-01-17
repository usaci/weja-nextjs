"use server";
import { BASE_URL } from "@/constants";
import type { Article, Category } from "@/types";
export const fetchArticles = async ({ limit }: { limit: number }) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WP_URL}/wp/v2/posts?per_page=${limit}&status=publish`,
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = (await response.json()) as Article[];
	return data;
};

export const fetchAllCategories = async () => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_WP_URL}/wp/v2/categories`,
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		// Error handling
	}
};

export const fetchArticleDetailsBySlug = async (slug: string) => {
	const baseUrl = BASE_URL;
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_WP_URL}/wp/v2/posts?slug=${slug}&status=publish`,
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.json();
		const article = data[0] as Article;
		// 念のためstatusをチェック（draftの場合はnullを返す）
		if (article && article.status !== "publish") {
			return null;
		}
		return article;
	} catch (error) {
		// Error handling
		return null;
	}
};

export const fetchAllCategoriesSlug = async (categories: Category[]) => {
	return categories.map((category) => category.slug);
};

export const getCategoriesById = async (
	id: number[],
	categories: Category[],
) => {
	return categories.filter((cat) => id.includes(cat.id));
};
