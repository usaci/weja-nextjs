import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { SITE_CATCHCOPY, SITE_DESCRIPTION, SITE_NAME } from "@/constants";
import { ArticleSection } from "@/features/routes/index/components/ArticleSection/ArticleSection";
import { MainVisual } from "@/features/routes/index/components/MainVisual/MainVisual";
import { fetchArticles } from "./actions";
export const metadata = {
  title: `${SITE_NAME}｜${SITE_CATCHCOPY}`,
  description:
    `${SITE_DESCRIPTION}`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
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
};
export default async function Home() {

  const articles = await fetchArticles({ limit: 9 });
  return (
    <>
      <Header />
      <main>
        <MainVisual />
        <ArticleSection initialData={articles || []} />
      </main>
      <Footer />
    </>
  );
}
