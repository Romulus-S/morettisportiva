import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

function ownerShort(owner) {
  if (owner === 'known-public' || owner === 'known-private') return 'Known'
  return 'Unknown'
}

export default function CarListRow({ car }) {
  return (
    <Link to={`/registry/${car.chassis}`} className="list-row">
      <span className="list-cell list-cell-mono">{car.chassis}</span>
      <span className="list-cell">{car.model}</span>
      <span className="list-cell">{car.year}</span>
      <span className="list-cell">{car.color || '—'}</span>
      <span className="list-cell">{car.location || '—'}</span>
      <span className="list-cell">
        <StatusBadge status={car.status} />
      </span>
      <span className="list-cell">{ownerShort(car.owner)}</span>
    </Link>
  )
}
