import { useEffect, useState } from 'react'

export function useExpand() {
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false)
      } else {
        setExpanded(true)
      }
    }

    // Initial check
    handleResize()

    // Listening for resize events
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return [expanded, setExpanded]
}
