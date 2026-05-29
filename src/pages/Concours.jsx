import { Link } from 'react-router-dom'
import { useRegistry } from '../hooks/useRegistry'
import { cloudinaryImage, maskChassis } from '../utils/cloudinary'

// Hardcoded entries. image is a path or Cloudinary URL (optional).
// chassis links to the registry listing if the car is in the registry.
const ENTRIES = [
  {
    event: 'Greenwich Concours d\'Elegance',
    year: '2025',
    location: 'Greenwich, CT',
    result: 'Etceterini class',
    carYear: '1970',
    carModel: 'S2',
    chassis: '1445-000',
    image: '/images/1445-000-front.jpg',
  },
  // Add more entries here
]

function ConcoursCard({ entry, slug }) {
  const content = (
    <>
      <div className="car-card-photo">
        {entry.image ? (
          <img
            src={cloudinaryImage(entry.image)}
            alt={entry.event}
            loading="lazy"
          />
        ) : (
          <div className="car-card-no-photo">No photo</div>
        )}
      </div>

      <div className="car-card-body">
        <div className="car-card-chassis">{entry.year} · {entry.location}</div>
        <div className="car-card-title">{entry.event}</div>
        <div className="car-card-meta">
          <div>
            <div className="car-card-meta-label">Car</div>
            <div className="car-card-meta-value">{entry.carYear} {entry.carModel}</div>
          </div>
          {entry.result && (
            <div>
              <div className="car-card-meta-label">Result</div>
              <div className="car-card-meta-value">{entry.result}</div>
            </div>
          )}
        </div>
      </div>

      {slug && (
        <div className="car-card-footer">
          <span className="car-card-owner">{maskChassis(entry.chassis)}</span>
          <span className="car-card-cta">View car →</span>
        </div>
      )}
    </>
  )

  if (slug) {
    return (
      <Link to={`/registry/${slug}`} className="car-card">
        {content}
      </Link>
    )
  }

  return <div className="car-card" style={{ cursor: 'default' }}>{content}</div>
}

export default function Concours() {
  const { cars } = useRegistry()

  // Build a map of chassis → slug for linking
  const slugMap = {}
  cars.forEach(c => { slugMap[c.chassis] = c.slug })

  return (
    <main className="page">
      <div className="registry-hero">
        <div className="label">Concours &amp; Rallies</div>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: '8px 0 0' }}>
          Appearances &amp; results
        </h1>
      </div>

      {ENTRIES.length === 0 ? (
        <div className="empty-state">No entries yet.</div>
      ) : (
        <div className="registry-grid">
          {ENTRIES.map((entry, i) => (
            <ConcoursCard
              key={i}
              entry={entry}
              slug={slugMap[entry.chassis] || null}
            />
          ))}
        </div>
      )}
    </main>
  )
}
