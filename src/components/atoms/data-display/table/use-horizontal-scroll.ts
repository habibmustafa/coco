/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/hooks/use-horizontal-scroll.ts
 * Fetched: 2026-09-22
 */

import * as React from 'react'

export const useHorizontalScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [hasHorizontalScroll, setHasHorizontalScroll] = React.useState(false)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const checkScroll = () => {
      const hasScroll = element.scrollWidth > element.clientWidth
      setHasHorizontalScroll(hasScroll)

      if (hasScroll) {
        const canScrollLeft = element.scrollLeft > 0
        const canScrollRight = element.scrollLeft < element.scrollWidth - element.clientWidth
        setCanScrollLeft(canScrollLeft)
        setCanScrollRight(canScrollRight)
      } else {
        setCanScrollLeft(false)
        setCanScrollRight(false)
      }
    }

    const handleScroll = () => {
      if (hasHorizontalScroll) {
        const canScrollLeft = element.scrollLeft > 0
        const canScrollRight = element.scrollLeft < element.scrollWidth - element.clientWidth
        setCanScrollLeft(canScrollLeft)
        setCanScrollRight(canScrollRight)
      }
    }

    checkScroll()
    element.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      element.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [ref, hasHorizontalScroll])

  return { hasHorizontalScroll, canScrollLeft, canScrollRight }
}
