'use client'
import type { Article, Category } from "@/types";
import { load } from "cheerio";
import Link from "next/link";
import styles from "../page.module.css"
export default function ArticleBody({ article, nearestPosts, catSlugs, categories, slug }: { article: Article, nearestPosts: Article[], catSlugs: string[], categories: Category[], slug: string }) {
  const frontURL = process.env.NEXT_PUBLIC_SITE_URL as string
  const wpRestAPIURL = process.env.NEXT_PUBLIC_WP_URL as string
  const modifyContentLinks = (html: string) => {
    const $ = load(html);

    // wpRestAPIURLからドメインを抽出（例: https://example.com/wp-json -> https://example.com）
    const getBaseDomain = (url: string) => {
      if (!url) return "";
      try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.host}`;
      } catch {
        return url.split("/wp-json")[0] || url.split("/wp/v2")[0] || url;
      }
    };

    const wpBaseDomain = getBaseDomain(wpRestAPIURL);

    // リンクのテキストコンテンツを置換する関数
    const replaceLinkText = (text: string): string => {
      if (!text) return text;

      // 相対リンクか絶対リンクかを判定
      const isRelativeLink = text.startsWith("/") && !text.startsWith("//");
      const textStartsWithWpDomain = wpBaseDomain && text.startsWith(wpBaseDomain);
      const textStartsWithFrontURL = frontURL && text.startsWith(frontURL);

      // 処理対象のテキストかどうかを判定
      const shouldProcess = isRelativeLink || textStartsWithWpDomain || textStartsWithFrontURL;

      if (shouldProcess) {
        // カテゴリスラッグが含まれている場合
        const matchedCatSlug = catSlugs.find((catSlug) => text.includes(`/${catSlug}/`));
        if (matchedCatSlug) {
          // 内部リンク（同じ記事へのアンカーリンク）の場合は#の形に置き換え
          const anchorMatch = text.match(/#(.+)$/);
          if (text.includes(`${matchedCatSlug}/${slug}`) && anchorMatch) {
            return `#${anchorMatch[1]}`;
          }
          // 他の記事へのリンクの場合は /post/ に置き換え
          let newText = text;
          // ドメイン部分をfrontURLに置き換え（絶対リンクの場合）
          if (textStartsWithWpDomain && wpBaseDomain) {
            newText = newText.replace(wpBaseDomain, frontURL || "");
          }
          // カテゴリスラッグを /post/ に置き換え
          newText = newText.replace(`/${matchedCatSlug}/`, "/post/");
          return newText;
        }
        // カテゴリスラッグが含まれていない場合は、ベースURLのみ置き換え（絶対リンクの場合）
        if (textStartsWithWpDomain && wpBaseDomain) {
          return text.replace(wpBaseDomain, frontURL || "");
        }
      }
      return text;
    };

    $("a").each((_, element) => {
      const link = $(element).attr("href");
      if (!link) return;

      // アンカーリンクのみの場合はスキップ
      if (link.startsWith("#")) {
        return;
      }

      // 相対リンクか絶対リンクかを判定
      const isRelativeLink = link.startsWith("/") && !link.startsWith("//");
      const linkStartsWithWpDomain = wpBaseDomain && link.startsWith(wpBaseDomain);
      const linkStartsWithFrontURL = frontURL && link.startsWith(frontURL);

      // 処理対象のリンクかどうかを判定
      const shouldProcess = isRelativeLink || linkStartsWithWpDomain || linkStartsWithFrontURL;

      if (shouldProcess) {
        // カテゴリスラッグが含まれている場合
        const matchedCatSlug = catSlugs.find((catSlug) => link.includes(`/${catSlug}/`));
        if (matchedCatSlug) {
          // 内部リンク（同じ記事へのアンカーリンク）の場合は#の形に置き換え
          const anchorMatch = link.match(/#(.+)$/);
          if (link.includes(`${matchedCatSlug}/${slug}`) && anchorMatch) {
            const newLink = `#${anchorMatch[1]}`;
            $(element).attr("href", newLink);
          } else {
            // 他の記事へのリンクの場合は /post/ に置き換え
            let newLink = link;
            // ドメイン部分をfrontURLに置き換え（絶対リンクの場合）
            if (linkStartsWithWpDomain && wpBaseDomain) {
              newLink = newLink.replace(wpBaseDomain, frontURL || "");
            }
            // カテゴリスラッグを /post/ に置き換え
            newLink = newLink.replace(`/${matchedCatSlug}/`, "/post/");
            $(element).attr("href", newLink);
          }
        } else if (linkStartsWithWpDomain && wpBaseDomain) {
          // カテゴリスラッグが含まれていない場合は、ベースURLのみ置き換え（絶対リンクの場合）
          const newLink = link.replace(wpBaseDomain, frontURL || "");
          $(element).attr("href", newLink);
        }

        // リンクのテキストコンテンツも置換
        const textContent = $(element).text();
        if (textContent) {
          const newTextContent = replaceLinkText(textContent);
          if (newTextContent !== textContent) {
            $(element).text(newTextContent);
          }
        }
      }
    });
    return $.html();
  };
  const content = modifyContentLinks(article.content.rendered)
  return (
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
  )
}