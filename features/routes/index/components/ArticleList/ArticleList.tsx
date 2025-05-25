'use client'
import { fetchArticles } from "@/app/actions"
import { ArticleCard } from "@/components/ArticleCard/ArticleCard"
import type { Article } from "@/types"
import { useEffect, useRef, useState } from "react"
import styles from "./ArticleList.module.css"
export const ArticleList = ({ data }: { data: Article[] }) => {
  const [count, setCount] = useState(12);
  const [articleData, setArticleData] = useState(data);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const guard = useRef(null);

  useEffect(() => {
    handleScroll()
  }, [])

  useEffect(() => {
    (async () => {
      const newData = await fetchArticles({ limit: count })
      setArticleData(newData || [])
    })()
  }, [count])


  const handleScroll = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          getMoreArticles(9);
        }
      });
    });
    const target = guard.current;
    target && observer.observe(target);
  };

  const getMoreArticles = (offset: number) => {
    setCount((prevCount) => prevCount + offset);
  };

  return (
    <>
      {
        articleData && articleData.length > 0 ? (
          <ul className={styles.list}>
            {
              articleData.map((article) => {
                return (
                  <li key={article.id}>
                    <ArticleCard data={article} />
                  </li>
                )
              })
            }
          </ul>
        ) : <p>記事がありません。</p>
      }
      <div ref={guard} />
    </>
  )

}