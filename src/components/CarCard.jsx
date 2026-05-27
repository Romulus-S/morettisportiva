import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { cloudinaryImage, maskChassis } from '../utils/cloudinary'

function ownerLabel(owner) {
  if (owner === 'known-public') return 'Owner known'
  if (owner === 'known-private') return 'Owner known (private)'
  return 'Owner unknown'
}

export default function CarCard({ car }) {
  const firstImage = car.imageUrls?.[0]
    ? cloudinaryImage(car.imageUrls[0])
    : null

  return (
    <Link to={`/registry/${car.slug}`} className="car-card">
      <div className="car-card-photo">
        {firstImage ? (
          <img src={firstImage} alt={`${car.model} · ${car.chassis}`} loading="lazy" />
        ) : (
          <div className="car-card-no-photo">No photo</div>
        )}
        <div className="car-card-badge">
          <StatusBadge status={car.status} />
        </div>
      </div>

      <div className="car-card-body">
        <div className="car-card-chassis">{maskChassis(car.chassis)}</div>
        <div className="car-card-title">
          {car.year} · {car.model}
        </div>
        <div className="car-card-meta">
          <div>
            <div className="car-card-meta-label">Color</div>
            <div className="car-card-meta-value">{car.color || '—'}</div>
          </div>
          <div>
            <div className="car-card-meta-label">Location</div>
            <div className="car-card-meta-value">{car.location || '—'}</div>
          </div>
        </div>
      </div>

      <div className="car-card-footer">
        <span className="car-card-owner">{ownerLabel(car.owner)}</span>
        <span className="car-card-cta">View record →</span>
      </div>
    </Link>
  )
}
