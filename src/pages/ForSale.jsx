import { Link } from 'react-router-dom'

const LISTINGS = [
  {
    chassis: '1337114',
    slug: '99280983',
    year: '1969',
    model: 'S4',
    location: 'Basilicata, Italy',
    status: 'located',
    owner: 'known-private',
    image: '/images/forsale-s4.jpeg',
  },
]

function ForSaleCard({ entry }) {
  return (
    <Link to={`/registry/${entry.slug}`} className="car-card">
      <div className="car-card-photo">
        {entry.image ? (
          <img src={entry.image} alt={`${entry.year} Moretti Sportiva ${entry.model}`} loading="lazy" />
        ) : (
          <div className="car-card-no-photo">No photo</div>
        )}
      </div>
      <div className="car-card-body">
        <div className="car-card-chassis">{entry.location}</div>
        <div className="car-card-title">{entry.year} Moretti Sportiva {entry.model}</div>
        <div className="car-card-meta">
          <div>
            <div className="car-card-meta-label">Status</div>
            <div className="car-card-meta-value">Located</div>
          </div>
          <div>
            <div className="car-card-meta-label">Owner</div>
            <div className="car-card-meta-value">Known</div>
          </div>
        </div>
      </div>
      <div className="car-card-footer">
        <span className="car-card-owner">{'*'.repeat(entry.chassis.length)}</span>
        <span className="car-card-cta">View car →</span>
      </div>
    </Link>
  )
}

export default function ForSale() {
  return (
    <main className="page">
      <div className="registry-hero">
        <div className="label">For sale</div>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: '8px 0 0' }}>
          Available cars
        </h1>
      </div>
      <div className="registry-grid">
        {LISTINGS.map((entry, i) => (
          <ForSaleCard key={i} entry={entry} />
        ))}
      </div>
    </main>
  )
}
