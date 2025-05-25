import type { Article } from "@/types"
import Image from "next/image"
import Link from "next/link"
import styles from "./ArticleCard.module.css"
const dummy = "/image.png"
export const ArticleCard = ({ data }: { data: Article }) => {
  return (
    <Link href={`/post/${data.slug}`}>
      <div className={styles.wrap}>
        {
          <figure className={styles.thumbnail}>
            <img src={data.thumbnail ? data.thumbnail : dummy} alt="" width={500} height={300} />
          </figure>
        }
        <p className={styles.title}>{data.title.rendered}</p>
      </div>
    </Link>
  )
}