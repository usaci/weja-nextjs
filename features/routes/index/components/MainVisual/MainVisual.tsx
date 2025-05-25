import styles from "./MainVisual.module.css"
export const MainVisual = () => {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          <span>形から入るのではない</span>
          <span>形がこっちに入ってくる</span>
        </h2>
        <p>
          WeJaは、2017年に神奈川総合高等学校の有志によって結成されたゲーム制作団体です。
          これまで文化祭における自作ゲームの展示をしてきました。<br />
          高校卒業から7年、一人一人が別々の道を歩んでいます。<br />
          これからWeJaとして活動することはあまりないかもしれませんが、今かつての私たちと同じようなことをしている人たちのために、そしてWeJaが再集結する日のために、このブログを残すことにしました。
        </p>
      </div>
    </section>
  )
}