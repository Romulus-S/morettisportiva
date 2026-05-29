import { Link } from 'react-router-dom'
import { useRegistry } from '../hooks/useRegistry'
import { cloudinaryImage, maskChassis } from '../utils/cloudinary'

// Hardcoded entries. image is a path or Cloudinary URL (optional).
// chassis links to the registry listing if the car is in the registry.
const ENTRIES = [
  {
    event: 'Pebble Beach Concours d\'Elegance',
    year: '1995',
    location: 'Pebble Beach, CA, USA',
    result: 'Second in class',
    carYear: '1968',
    carModel: 'S1',
    chassis: 'unknown59',
    image: '/images/concours-pebblebeach1.png',
  },
  {
    event: 'Tour Auto',
    year: '2023 & 2024',
    location: 'France',
    result: 'Most Beautiful Car',
    carYear: '1967',
    carModel: 'S1',
    chassis: '0650266',
    image: '/images/concours-tourauto2.jpg',
  },
  {
    event: 'Villa d\'Este Concours d\'Eleganza',
    year: '2016',
    location: 'Lake Como, Italy',
    result: null,
    carYear: '1968',
    carModel: 'S1 SS',
    chassis: 'unknown10',
    image: '/images/concours-villadeste.jpg',
  },
  {
    event: 'Rallye Monte-Carlo Historique',
    year: '2021',
    location: 'Monaco',
    result: 'Cancelled',
    carYear: '1968',
    carModel: 'S1',
    chassis: '0876394',
    image: '/images/concours-monte-carlo.jpg',
  },
  {
    event: 'Greenwich Concours d\'Elegance',
    year: '2018',
    location: 'Greenwich, CT, USA',
    result: null,
    carYear: '1970',
    carModel: 'S2',
    chassis: '1297076',
    image: '/images/concours-greenwich.png',
  },
  {
    event: 'Pebble Beach Concours d\'Elegance',
    year: '2025',
    location: 'Pebble Beach, CA, USA',
    result: null,
    carYear: '1967',
    carModel: 'S1 SS',
    chassis: '1084286',
    image: '/images/concours-pebblebeach2.png',
  },
  {
    event: 'Tour Auto',
    year: '2020 & 2021',
    location: 'France',
    result: null,
    carYear: '1968',
    carModel: 'S1',
    chassis: '997491',
    image: '/images/concours-tourauto1.jpg',
  },
  {
    event: 'Classic Gala Schwetzingen',
    year: '2019',
    location: 'Schwetzingen, Germany',
    result: 'Second in class',
    carYear: '1967',
    carModel: 'S1 SS',
    chassis: '0742454',
    image: '/images/concours-schwetzingen.jpg',
  },
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
