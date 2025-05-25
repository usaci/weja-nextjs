import { fetchAllCategories, fetchAllCategoriesSlug, fetchArticleDetailsBySlug, getCategoriesById } from "@/app/actions";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { SITE_NAME } from "@/constants";
import { getAllArticles } from "@/features/routes/article/articles";
import ArticleHeader from "@/features/routes/article/components/ArticleHeader/ArticleHeader";
import type { Article } from "@/types";
import { load } from "cheerio";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css"

type Props = {
  params: { slug: string };
};
// 動的メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleDetailsBySlug(slug);
  if (!article) {
    return {
      title: ""
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const url = `${siteUrl}/post/${slug}`;

  return {
    title: `${article.title.rendered}｜${SITE_NAME}`,
    description: article.excerpt.rendered || "",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/post/${slug}`,
    },
    openGraph: {
      title: `${article.title}｜${SITE_NAME}`,
      description: article.excerpt.rendered,
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
  const frontURL = process.env.NEXT_PUBLIC_SITE_URL as string
  const wpRestAPIURL = process.env.NEXT_PUBLIC__WP_URL as string
  const { slug } = await params;

  const article = await fetchArticleDetailsBySlug(slug) as Article;
  if (!article) {
    notFound();
  }
  const AllCategories = await fetchAllCategories();

  const catSlugs = await fetchAllCategoriesSlug(AllCategories)
  const modifyContentLinks = (html: string) => {
    const $ = load(html);
    $("a").each((_, element) => {
      const link = $(element).attr("href");
      if (
        link?.startsWith(wpRestAPIURL) &&
        catSlugs.some((slug) => link.includes(slug))
      ) {
        catSlugs
          .filter((catSlug) => link.includes(catSlug))
          .map((catSlug) => {
            $(element).attr(
              "href",
              link.replace(wpRestAPIURL, frontURL).replace(catSlug, "post")
            );
          });
      } else if (link?.startsWith(wpRestAPIURL)) {
        $(element).attr("href", link.replace(wpRestAPIURL, frontURL));
      }
    });
    return $.html();
  };
  const content = modifyContentLinks(article.content.rendered);
  const categories = await getCategoriesById(article.categories, AllCategories)
  console.log(categories)
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
        <div className={styles.inner}>
          <figure className="mb-5 max-w-[960px] w-full mx-auto">
            {
              article.thumbnail && (
                <img
                  src={article.thumbnail}
                  alt={article.title.rendered}
                  className="w-full"
                />
              )
            }
          </figure>
          <div
            className="prose md:prose-lg prose-md mx-auto max-w-[960px] w-full"
            dangerouslySetInnerHTML={{ __html: content as TrustedHTML }}
          />
          <footer>
            <div className={styles.footer}>
              {
                nearestPosts.sort((a, b) => Number(a.id) - Number(b.id)).map((post) => {
                  return (
                    post ? <Link href={`/post/${post.slug}`} key={post.id} className={styles.pager}>{post.title.rendered}</Link> : ""
                  )
                })
              }
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}