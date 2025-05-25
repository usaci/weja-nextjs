import { getAllArticles } from "@/features/routes/article/articles"
import type { Article } from "@/types"
import { ArticleList } from "../ArticleList/ArticleList"
import styles from "./ArticleSection.module.css"
export const ArticleSection = async ({ initialData }: { initialData: Article[] }) => {
  const allArticles = await getAllArticles();
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <p className={styles.heading}>
          <span className={styles.num}>{allArticles.length}</span>件の記事があります
        </p>
        <ArticleList data={initialData} />
      </div>
    </section>
  )
}