import { useParams, Link, Navigate } from 'react-router-dom'
import { maskChassis } from '../utils/cloudinary'

function parseDescription(text) {
  const html = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:3px">$1</a>'
  )
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}
import { useRegistry } from '../hooks/useRegistry'
import StatusBadge from '../components/StatusBadge'
import Gallery from '../components/Gallery'

function ownerDisplay(car) {
  if (car.owner === 'known-public' && car.owner_name) return car.owner_name
  if (car.owner === 'known-public') return 'Known (public)'
  if (car.owner === 'known-private') return 'Known (private)'
  return 'Unknown'
}

function PhotoIcon() {
  return (
    <svg className="media-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="1" y="2" width="12" height="10" rx="1.5" />
      <circle cx="7" cy="7" r="2.5" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg className="media-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="1" y="2.5" width="9" height="9" rx="1.5" />
      <path d="M10 5.5l3-2v7l-3-2V5.5z" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg className="media-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="2" y="1" width="10" height="12" rx="1.5" />
      <line x1="4" y1="5" x2="10" y2="5" />
      <line x1="4" y1="7.5" x2="10" y2="7.5" />
      <line x1="4" y1="10" x2="8" y2="10" />
    </svg>
  )
}

export default function CarRecord() {
  const { slug } = useParams()
  const { cars, loading } = useRegistry()

  if (loading) {
    return (
      <main className="page">
        <div className="loading-state">Loading…</div>
      </main>
    )
  }

  const car = cars.find(c => c.slug === slug)
  if (!car) return <Navigate to="/" replace />

  const specs = [
    { key: 'Model', value: car.model },
    { key: 'Year', value: car.year },
    { key: 'Chassis', value: maskChassis(car.chassis) },
    { key: 'Plate', value: car.plate || '—' },
    { key: 'Color', value: car.color || '—' },
    { key: 'Engine', value: car.engine || '—' },
    { key: 'Location', value: car.location || '—' },
    { key: 'Status', value: car.status ? car.status.charAt(0).toUpperCase() + car.status.slice(1) : '—' },
    { key: 'Owner', value: ownerDisplay(car) },
  ]

  return (
    <main className="page">
      {/* Back */}
      <Link to="/" className="back-link">← Registry</Link>

      {/* Header */}
      <div style={{ position: 'relative', marginBottom: 32 }}>
        <div className="car-record-chassis">{maskChassis(car.chassis)}</div>
        <h1 className="car-record-title">Moretti Sportiva {car.model}{car.year ? ` · ${car.year}` : ''}</h1>
        <div className="car-record-badges">
          <StatusBadge status={car.status} />
          <span className="car-record-badge-meta">{car.color}</span>
          <span className="car-record-badge-meta">{car.location}</span>
          {car.owner !== 'unknown' && (
            <span className="car-record-badge-meta">Owner known</span>
          )}
        </div>
        <div className="car-record-know-more">
          <span style={{ fontSize: 15, fontWeight: 500 }}>Do you know more about this car?</span>
          <Link to="/contact" className="btn">Contact</Link>
        </div>
      </div>

      {/* Gallery */}
      <Gallery images={car.images} videoUrls={car.videoUrls} />

      {/* Body */}
      <div className="car-record-body">
        {/* Main column */}
        <div>
          {/* Description */}
          {car.description && (
            <div className="section">
              <div className="section-heading">Provenance &amp; description</div>
              <div className="section-body">{parseDescription(car.description)}</div>
            </div>
          )}

          {/* History timeline */}
          {car.historyEntries && car.historyEntries.length > 0 && (
            <div className="section">
              <div className="section-heading">Chassis history</div>
              <div className="timeline">
                {car.historyEntries.map((entry, i) => (
                  <div className="timeline-entry" key={i}>
                    <div className="timeline-year">{entry.year}</div>
                    <div>
                      <div className="timeline-detail">{parseDescription(entry.detail)}</div>
                      {entry.sublabel && (
                        <span className="timeline-sub">{parseDescription(entry.sublabel)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Specs */}
          <div className="sidebar-block">
            <div className="sidebar-block-title">Specifications</div>
            {specs.map(({ key, value }) => (
              <div className="spec-row" key={key}>
                <span className="spec-key">{key}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>

{/* Updated */}
          <div className="sidebar-block">
            <div className="updated-note">
              Last updated: {car.last_updated || 'unknown'}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
