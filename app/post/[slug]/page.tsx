import { fetchAllCategories, fetchAllCategoriesSlug, fetchArticleDetailsBySlug, getCategoriesById } from "@/app/actions";
import { SITE_NAME } from "@/constants";
import { getAllArticles } from "@/features/routes/article/articles";
import ArticleHeader from "@/features/routes/article/components/ArticleHeader/ArticleHeader";
import type { Article } from "@/types";
import type { Metadata } from "next";
import { headers } from "next/headers"
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "./_parts/ArticleBody";
import styles from "./page.module.css"

export const runtime = 'edge';

// HTMLからテキストを抽出する関数（Edge Runtime対応）
function extractTextFromHTML(html: string): string {
  if (!html) return "";
  // HTMLタグを削除
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

// 動的メタデータの生成
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleDetailsBySlug(slug);
  if (!article) {
    return {
      title: ""
    }
  }

  const url = (await headers()).get('x-url') || ""
  const $excerpt = extractTextFromHTML(article.excerpt.rendered);

  return {
    title: `${article.title.rendered}｜${SITE_NAME}`,
    description: $excerpt || "",
    metadataBase: new URL(url),
    alternates: {
      canonical: `/post/${slug}`,
    },
    openGraph: {
      title: `${article.title.rendered}｜${SITE_NAME}`,
      description: $excerpt || "",
      url,
      images: [
        {
          url: article.thumbnail ?? "/image.png",
          width: 1200,
          height: 620,
          alt: `${article.title}のOGP画像`,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const article = await fetchArticleDetailsBySlug(slug) as Article;
  if (!article) {
    notFound();
  }
  const AllCategories = await fetchAllCategories();
  const catSlugs = await fetchAllCategoriesSlug(AllCategories)
  const categories = await getCategoriesById(article.categories, AllCategories)
  const getNearestArticles = async () => {
    const $articles: Article[] = await getAllArticles();
    const index = ($articles as Article[]).findIndex(a => a.id === article.id)
    if (index === -1) return [];

    const result = [];
    if (index > 0) result.push($articles[index - 1]);

    if (index < $articles.length - 1) result.push($articles[index + 1]);
    return result;
  }

  const nearestPosts = await getNearestArticles();

  return (
    <>
      <main>
        <ArticleHeader title={article.title.rendered} date={article.date} categories={article.categories} />
        <ArticleBody article={article} nearestPosts={nearestPosts} catSlugs={catSlugs} categories={categories} slug={slug} />
      </main>
    </>
  )
}