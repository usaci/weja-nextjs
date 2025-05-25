import { SITE_CATCHCOPY, SITE_DESCRIPTION, SITE_NAME } from "@/constants"
import styles from "./Footer.module.css"
export default function Footer() {
  return (
    <footer>
      <div className={styles.inner}>
        <small>&copy;{SITE_NAME}｜{SITE_CATCHCOPY}</small>
      </div>
    </footer>
  )
}