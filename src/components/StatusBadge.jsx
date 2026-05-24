export default function StatusBadge({ status }) {
  const map = {
    located: 'Located',
    unlocated: 'Unlocated',
    destroyed: 'Destroyed',
  }
  return (
    <span className={`badge badge-${status || 'unlocated'}`}>
      {map[status] || status}
    </span>
  )
}
