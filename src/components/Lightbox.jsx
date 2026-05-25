import { useEffect, useState, useRef } from 'react'
import { cloudinaryImage, cloudinaryThumb } from '../utils/cloudinary'

export default function Lightbox({ media, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const stripRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % media.length)
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + media.length) % media.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [media.length, onClose])

  // Scroll active thumb into view
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const active = strip.children[index]
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [index])

  const current = media[index]

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <line x1="2" y1="2" x2="14" y2="14" />
            <line x1="14" y1="2" x2="2" y2="14" />
          </svg>
        </button>

        {/* Main image */}
        <div className="lightbox-media">
          {current.type === 'image' ? (
            <img src={cloudinaryImage(current.url)} alt={`Photo ${index + 1}`} />
          ) : (
            <video src={current.url} controls autoPlay />
          )}
        </div>

        {/* Prev / Next */}
        {media.length > 1 && (
          <>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={() => setIndex(i => (i - 1 + media.length) % media.length)}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M13 4l-6 6 6 6" />
              </svg>
            </button>
            <button
              className="lightbox-nav lightbox-next"
              onClick={() => setIndex(i => (i + 1) % media.length)}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M7 4l6 6-6 6" />
              </svg>
            </button>
          </>
        )}

        {/* Filmstrip */}
        {media.length > 1 && (
          <div className="lightbox-strip" ref={stripRef}>
            {media.map((m, i) => (
              <button
                key={i}
                className={`lightbox-strip-thumb ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
              >
                {m.type === 'image' ? (
                  <img src={cloudinaryThumb(m.url)} alt="" />
                ) : (
                  <div className="lightbox-strip-video">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5 3.5l8 4.5-8 4.5V3.5z" fill="rgba(255,255,255,0.8)" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
