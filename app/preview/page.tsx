'use client'
import { BASE_URL } from "@/constants";
import ArticleHeader from "@/features/routes/article/components/ArticleHeader/ArticleHeader";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ArticleBody from "../post/[slug]/_parts/ArticleBody";
import type { Article, Category } from "@/types";

function PreviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('p') as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const [articleData, categoriesData] = await Promise.all([
          getArticleByIdFromClientSide(id),
          geAllCategoriesFromClientSide(),
        ]);

        if (articleData && articleData[0]) {
          setArticle(articleData[0]);
        }
        if (categoriesData) {
          setCategories(categoriesData);
        }
      } catch (error) {
        // Error handling
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <main>
      <ArticleHeader title={article.title.rendered} date={article.date} categories={article.categories} />
      <ArticleBody article={article} nearestPosts={[]} catSlugs={[]} categories={categories} slug={""} />
    </main>
  );
}

export default function Preview() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
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