import { useEffect, useState } from 'react'
import { cloudinaryImage } from '../utils/cloudinary'

export default function Lightbox({ media, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % media.length)
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + media.length) % media.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [media.length, onClose])

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

        {/* Image */}
        <div className="lightbox-media">
          {current.type === 'image' ? (
            <img src={cloudinaryImage(current.url)} alt={`Photo ${index + 1}`} />
          ) : (
            <video src={current.url} controls autoPlay />
          )}
        </div>

        {/* Nav */}
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

        {/* Counter */}
        <div className="lightbox-counter">{index + 1} / {media.length}</div>
      </div>
    </div>
  )
}
