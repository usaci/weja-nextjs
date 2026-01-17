import { SITE_CATCHCOPY, SITE_DESCRIPTION, SITE_NAME } from "@/constants";
import { ArticleSection } from "@/features/routes/index/components/ArticleSection/ArticleSection";
import { MainVisual } from "@/features/routes/index/components/MainVisual/MainVisual";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { fetchArticles } from "./actions";

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const url = (await headers()).get('x-url') || ""
  return {
    title: `${SITE_NAME}｜${SITE_CATCHCOPY}`,
    description:
      `${SITE_DESCRIPTION}`,
    metadataBase: new URL(url),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: `${SITE_NAME}｜${SITE_CATCHCOPY}`,
      description:
        `${SITE_DESCRIPTION}`,
      url: "/",
      images: [
        {
          url: "/image.png",
          width: 1200,
          height: 620,
          alt: "WeJaのOGP画像です",
        },
      ],
    },
  }
};
export default async function Home() {
  const articles = await fetchArticles({ limit: 9 });
  return (
    <>
      <main>
        <MainVisual />
        <ArticleSection initialData={articles || []} />
      </main>
    </>
  );
}
