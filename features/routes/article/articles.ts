const BASE_URL = process.env.NEXT_PUBLIC_WP_REST_URL;
export const getAllArticles = async () => {
	try {
		const response = await fetch(`${BASE_URL}/posts?per_page=100`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
