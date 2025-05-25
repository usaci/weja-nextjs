import { fetchAllCategories, getCategoriesById } from "@/app/actions";
import { formatDate } from "@/features/common/formatDate";
import styles from "./ArticleHeader.module.css"
export default async function ArticleHeader({ title, categories, date }: { title: string, categories: number[] | undefined, date: string }) {
  const $categories = await fetchAllCategories();
  const postCategories = await getCategoriesById(categories || [], $categories);
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <time dateTime={date}>{formatDate(date)}</time>
        <h1 className={styles.title}>{title}</h1>
        {
          postCategories && (
            <ul className={styles.catList}>
              {
                (
                  postCategories.map((cat) => {
                    return <li key={cat.id} className={styles.cat}>{cat.name}</li>
                  })
                )
              }
            </ul>
          )
        }
      </div>
    </header>
  )

}