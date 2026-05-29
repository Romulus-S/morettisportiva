import { cloudinaryImage } from '../utils/cloudinary'

const ENTRIES = [
  {
    year: '1967',
    event: 'Targa Florio',
    location: 'Sicily, Italy',
    carModel: '1000 SS',
    result: '1st in class',
    image: '/images/racing-targa1967.jpg',
  },
  {
    year: '1968',
    event: 'Targa Florio',
    location: 'Sicily, Italy',
    carModel: '1000 SS',
    result: null,
    image: '/images/racing-targa1968.jpg',
  },
  {
    year: '1969',
    event: 'Monte Carlo Rally',
    location: 'Monte-Carlo',
    carModel: 'S1',
    result: null,
    image: '/images/racing-rallye.jpg',
  },
]

function RacingCard({ entry }) {
  return (
    <div className="car-card" style={{ cursor: 'default' }}>
      <div className="car-card-photo">
        {entry.image ? (
          <img src={cloudinaryImage(entry.image)} alt={entry.event} loading="lazy" />
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
            <div className="car-card-meta-value">{entry.carModel}</div>
          </div>
          {entry.result && (
            <div>
              <div className="car-card-meta-label">Result</div>
              <div className="car-card-meta-value">{entry.result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Racing() {
  return (
    <main className="page">
      <div className="registry-hero">
        <div className="label">Racing</div>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: '8px 0 0' }}>
          Race results &amp; appearances
        </h1>
      </div>

      <div className="registry-grid">
        {ENTRIES.map((entry, i) => (
          <RacingCard key={i} entry={entry} />
        ))}
      </div>
    </main>
  )
}
