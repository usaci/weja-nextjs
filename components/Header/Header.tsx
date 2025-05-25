'use client';
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css"
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <Link href="/">
            <Image src="/logo.svg" width={101} height={58} alt="WeJa" />
          </Link>
        </h1>
      </div>
    </header>
  )
}