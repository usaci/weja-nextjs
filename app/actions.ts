"use server";
import { BASE_URL } from "@/constants";
import type { Article, Category } from "@/types";
export const fetchArticles = async ({ limit }: { limit: number }) => {
	try {
		const response = await fetch(`${BASE_URL}/posts?per_page=${limit}`);
		const data = (await response.json()) as Article[];
		if (!response.ok) {
			console.log(response.status);
		}
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const fetchAllCategories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/categories`);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const fetchArticleDetailsBySlug = async (slug: string) => {
	const baseUrl = BASE_URL;
	try {
		const response = await fetch(`${baseUrl}/posts?slug=${slug}`);
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.json();
		return data[0] as Article;
	} catch (error) {
		console.error(error);
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
