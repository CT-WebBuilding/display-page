import { useEffect, useState } from 'react'
import './App.css'
import BackToTop from './components/BackToTop'

const galleryImages = Array.from(
  { length: 37 },
  (_, index) => `15070-summer-harvest-st-${index + 1}.jpg`,
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
          prev === null
            ? galleryImages.length - 1
            : (prev - 1 + galleryImages.length) % galleryImages.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [activeImageIndex])

  const goToPreviousImage = () => {
    setActiveImageIndex((prev) =>
      prev === null
        ? galleryImages.length - 1
        : (prev - 1 + galleryImages.length) % galleryImages.length,
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
        <h1>Modern 5-Bedroom Winter Garden Home With Private In-Law Suite</h1>
        <p className="hero-address">15070 Summer Harvest St, Winter Garden, FL</p>
        <p className="hero-copy">
          Built in 2025 on a premium corner lot, this spacious home offers high
          ceilings, flexible living space, a private courtyard, and a separate
          suite ideal for guests, family, or a home office.
        </p>

        <div className="quick-facts" aria-label="Property quick facts">
          <span>5 Beds</span>
          <span>4.5 Baths</span>
          <span>2,931 Sq Ft</span>
          <span>Built 2025</span>
          <span>Corner Lot</span>
        </div>

        <div className="hero-actions">
          <a href="#contact" className="hero-button primary">
            Schedule a Tour
          </a>
          <a href="#gallery" className="hero-button secondary">
            View Photos
          </a>
        </div>

        <img
          src="/images/15070-summer-harvest-st-1.jpg"
          alt="Front view of 15070 Summer Harvest St"
          className="hero-image"
        />
      </header>

      <main>
        <section className="details">
          <article className="detail-card">
          <section className="value-prop">
  <h2>Designed for flexibility and modern living</h2>
  <p>
    With a private in-law suite, high ceilings, and a spacious layout, this home
    is ideal for multigenerational living, remote work, or simply having room to grow.
  </p>
</section>
            <h2>Property Highlights</h2>
            <ul>
              <li>5-bedroom, 4.5-bath layout with 2,931 sq ft of living space</li>
              <li>
                Private in-law suite for guests, extended family, or office use
              </li>
              <li>Built in 2025 with modern finishes and move-in-ready condition</li>
              <li>Premium corner lot with added curb appeal and openness</li>
              <li>High ceilings and bright, open living areas</li>
              <li>Private courtyard for relaxing or entertaining</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Location Benefits</h2>
            <ul>
              <li>Located in the desirable Winter Garden / Horizon West area</li>
              <li>Steps from community amenities for everyday convenience</li>
              <li>Close to shopping, dining, and daily essentials</li>
              <li>Easy access to FL-429 and surrounding areas</li>
              <li>
                Ideal for buyers looking for newer construction in a growing
                community
              </li>
            </ul>
          </article>
        </section>
        <h6 className="gallery-hint">(click on images to view larger)</h6>
        <section
          className="gallery"
          id="gallery"
          aria-label="Home photo gallery"
        >
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
          <p>
            Interested in seeing the home in person or have questions about the
            layout, neighborhood, or showing availability? Reach out directly to
            schedule a private tour.
          </p>
          <div className="contact-links">
            <p>Call: <a href="tel:+14075521563">(407) 552-1563</a></p>
            <p>Email: <a href="mailto:mpwgresorts@mac.com">mpwgresorts@mac.com</a></p>
          </div>
        </section>
      </main>

      <BackToTop />

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