import { cloudinaryImage, cloudinaryThumb, cloudinaryVideo } from '../utils/cloudinary'

function PlayIcon() {
  return (
    <div className="gallery-play">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.45)" />
        <path d="M16 13.5l13 6.5-13 6.5V13.5z" fill="white" />
      </svg>
    </div>
  )
}

export default function Gallery({ imageUrls = [], videoUrls = [] }) {
  const allMedia = [
    ...imageUrls.map(u => ({ type: 'image', url: u })),
    ...videoUrls.map(u => ({ type: 'video', url: u })),
  ]

  if (allMedia.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery-no-photos">No photographs on record</div>
      </div>
    )
  }

  const main = allMedia[0]
  const thumbs = allMedia.slice(1, 3)
  const extra = allMedia.length - 3

  return (
    <div className="gallery">
      {/* Main */}
      <div className="gallery-main">
        {main.type === 'image' ? (
          <img
            src={cloudinaryImage(main.url)}
            alt="Primary view"
          />
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#111' }}>
            <PlayIcon />
          </div>
        )}
      </div>

      {/* Thumbs */}
      {thumbs.map((media, i) => {
        const isLast = i === thumbs.length - 1 && extra > 0
        return (
          <div className="gallery-thumb" key={i}>
            {media.type === 'image' ? (
              <img src={cloudinaryThumb(media.url)} alt={`View ${i + 2}`} loading="lazy" />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#111' }} />
            )}
            {media.type === 'video' && !isLast && <PlayIcon />}
            {isLast && (
              <div className="gallery-overlay">+{extra + 1} photos</div>
            )}
          </div>
        )
      })}

      {/* If only 1 media item, fill the thumb slots */}
      {thumbs.length === 0 && (
        <>
          <div className="gallery-thumb" style={{ background: 'var(--color-bg-secondary)' }} />
          <div className="gallery-thumb" style={{ background: 'var(--color-bg-secondary)' }} />
        </>
      )}
      {thumbs.length === 1 && (
        <div className="gallery-thumb" style={{ background: 'var(--color-bg-secondary)' }} />
      )}
    </div>
  )
}
