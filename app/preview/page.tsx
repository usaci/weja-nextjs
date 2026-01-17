'use client'
import { BASE_URL } from "@/constants";
import ArticleHeader from "@/features/routes/article/components/ArticleHeader/ArticleHeader";
import { usePathname, useSearchParams } from "next/navigation";
import ArticleBody from "../post/[slug]/_parts/ArticleBody";
export default async function Preview({ params }: { params: Promise<{ slug: string }> }) {
  const searchParams = useSearchParams();
  const id = searchParams.get('p') as string;
  const article = await getArticleByIdFromClientSide(id)
  return (
    <>
      <main>
        <ArticleHeader title={article.title.rendered} date={article.date} categories={article.categories} />
        <ArticleBody article={article} nearestPosts={nearestPosts} catSlugs={catSlugs} categories={categories} slug={slug} />
      </main>
    </>
  )
}

const geAllCategoriesFromClientSide = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Error handling
  }
}

const getArticleByIdFromClientSide = async (id: string | number) => {
  try {
    const response = await fetch(`${BASE_URL}/posts?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    // Error handling
  }
}