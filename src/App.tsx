import { useEffect, useState } from 'react'
import './App.css'

const galleryImages = Array.from(
  { length: 37 },
  (_, index) => `15070 Summer Harvest St ${index + 1}.jpg`,
)

function App() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeImageIndex === null) {
      return
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImageIndex(null)
      }

      if (event.key === 'ArrowRight') {
        setActiveImageIndex((prev) =>
          prev === null ? 0 : (prev + 1) % galleryImages.length,
        )
      }

      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev === null ? galleryImages.length - 1 : (prev - 1 + galleryImages.length) % galleryImages.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [activeImageIndex])

  const goToPreviousImage = () => {
    setActiveImageIndex((prev) =>
      prev === null ? galleryImages.length - 1 : (prev - 1 + galleryImages.length) % galleryImages.length,
    )
  }

  const goToNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === null ? 0 : (prev + 1) % galleryImages.length,
    )
  }

  return (
    <div className="listing-page">
      <header className="hero" id="top">
        <p className="label">Home For Sale</p>
        <h1>15070 Summer Harvest St</h1>
        <p className="hero-copy">
          Welcome to a bright, modern home with open living spaces and a comfortable
          backyard setup. Explore the photos and reach out if you want a showing.
        </p>
        <img
          src="/images/15070 Summer Harvest St 1.jpg"
          alt="Front view of 15070 Summer Harvest St"
          className="hero-image"
        />
      </header>

      <main>
        <section className="details">
          <article className="detail-card">
            <h2>Property Highlights</h2>
            <ul>
              <li>Move-in ready condition</li>
              <li>Spacious interior with natural light</li>
              <li>Private outdoor area for relaxing or hosting</li>
              <li>Located in a quiet, established neighborhood</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Location Benefits</h2>
            <ul>
              <li>Close to schools, parks, and local shopping</li>
              <li>Easy access to main roads and commute routes</li>
              <li>Nearby dining and everyday conveniences</li>
              <li>Great fit for families or first-time buyers</li>
            </ul>
          </article>
        </section>

        <section className="gallery" aria-label="Home photo gallery">
          {galleryImages.map((imageName, index) => (
            <figure key={imageName}>
              <button
                type="button"
                className="gallery-button"
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Open photo ${index + 1} in lightbox`}
              >
                <img
                  src={`/images/${imageName}`}
                  alt={`Photo of home: ${imageName}`}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </figure>
          ))}
        </section>

        <section className="contact" id="contact">
          <p className="label">Contact Me</p>
          <h2>Schedule a tour or ask a question</h2>
          <p>Call, text, or email and I will get back to you as soon as possible.</p>
          <div className="contact-links">
            <a href="tel:+15551234567">(555) 123-4567</a>
            <a href="mailto:hello@example.com">hello@example.com</a>
          </div>
        </section>
      </main>

      {activeImageIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setActiveImageIndex(null)}
            aria-label="Close photo viewer"
          >
            Close
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(event) => {
              event.stopPropagation()
              goToPreviousImage()
            }}
            aria-label="Show previous photo"
          >
            Prev
          </button>
          <img
            className="lightbox-image"
            src={`/images/${galleryImages[activeImageIndex]}`}
            alt={`Large view of photo ${activeImageIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(event) => {
              event.stopPropagation()
              goToNextImage()
            }}
            aria-label="Show next photo"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default App
