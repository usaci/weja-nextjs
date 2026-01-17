'use client'

import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { useEffect } from 'react'

export default function ProgressBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.08,
    })
  }, [])

  useEffect(() => {
    NProgress.start()
    const timer = setTimeout(() => {
      NProgress.done()
    }, 100)

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: pathnameの変更を監視する必要がある
  }, [pathname])

  return null
}

