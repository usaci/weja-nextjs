import ArticleHeader from "@/features/routes/article/components/ArticleHeader/ArticleHeader"
export default function NotFound() {
  return (
    <>
      <main>
        <div className="px-[20px] ">
          <h2 className="text-xl max-w-[1100px] mx-auto mb-4 font-bold md:text-4xl">ページが見つかりませんでした</h2>
          <p className="text-lg max-w-[1100px] mx-auto mb-4">お探しのページは存在しないか、削除されました。</p>
          <a href="/" className="text-lg max-w-[1100px] mx-auto underline flex mb-8">トップページにもどる</a>
          <div className="max-w-[1100px] mx-auto">
            <video src="/topvideo.mp4" autoPlay muted loop />
          </div>
        </div>
      </main>
    </>
  )
}