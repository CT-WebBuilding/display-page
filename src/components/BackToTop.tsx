import { useEffect, useState } from 'react'
import './BackToTop.css'

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 320)
    }

    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, { passive: true })

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg
        className="back-to-top__icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="32" cy="32" r="26" className="back-to-top__ring" />
        <path
          className="back-to-top__arrow"
          d="M32 18 20 30m12-12 12 12M32 18v28"
        />
      </svg>
    </button>
  )
}

export default BackToTop
