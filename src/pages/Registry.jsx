import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useRegistry } from '../hooks/useRegistry'
import CarCard from '../components/CarCard'

const MODELS = ['All', 'S1', 'S1 SS', 'S2', 'S4', 'Convertibile', 'Trasformabile']

export default function Registry() {
  const { cars, loading } = useRegistry()
  const [activeTab, setActiveTab] = useState('All')

  const counts = useMemo(() => {
    const c = { All: cars.length }
    MODELS.slice(1).forEach(m => {
      c[m] = cars.filter(car => car.model === m).length
    })
    return c
  }, [cars])

  const stats = useMemo(() => ({
    total: cars.length,
    located: cars.filter(c => c.status === 'located').length,
    ownerKnown: cars.filter(c => c.owner !== 'unknown').length,
  }), [cars])

  const filtered = useMemo(() => {
    if (activeTab === 'All') return cars
    return cars.filter(c => c.model === activeTab)
  }, [cars, activeTab])

  if (loading) {
    return (
      <main className="page">
        <div className="loading-state">Loading registry…</div>
      </main>
    )
  }

  return (
    <main className="page">
      {/* Hero */}
      <div className="registry-hero">
        <div className="label">The definitive archive</div>
        <h1>Moretti Sportiva</h1>
      </div>

      {/* Mobile promo */}
      <p className="registry-mobile-promo">
        Check out the Sportiva's{' '}
        <Link to="/racing" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>1960s racing history</Link>
        {' '}or modern international{' '}
        <Link to="/concours" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>concours &amp; rally appearances</Link>!
      </p>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Cars documented*</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.located}</div>
          <div className="stat-label">Location known</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.ownerKnown}</div>
          <div className="stat-label">Owner known</div>
        </div>
      </div>
      <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 8, marginBottom: 20 }}>
        *This is most likely an overcount due to repeats and survivorship.{' '}
        <Link to="/contact" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          Please share your knowledge to improve this number.
        </Link>
      </p>

      {/* Tabs */}
      <div className="tabs-bar">
        <div className="tabs">
          {MODELS.map(m => (
            <button
              key={m}
              className={`tab ${activeTab === m ? 'active' : ''}`}
              onClick={() => setActiveTab(m)}
            >
              {m}
              <span className="tab-count">{counts[m] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cars */}
      {filtered.length === 0 ? (
        <div className="empty-state">No cars in this category yet.</div>
      ) : (
        <div className="registry-grid">
          {filtered.map(car => (
            <CarCard key={car.chassis} car={car} />
          ))}
        </div>
      )}
    </main>
  )
}
