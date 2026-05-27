import { useState, useMemo } from 'react'
import { useRegistry } from '../hooks/useRegistry'
import CarCard from '../components/CarCard'
import CarListRow from '../components/CarListRow'

const MODELS = ['All', 'S1', 'S2', 'S4', 'Convertibile', 'Trasformabile']

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <line x1="1" y1="4" x2="15" y2="4" />
      <line x1="1" y1="8" x2="15" y2="8" />
      <line x1="1" y1="12" x2="15" y2="12" />
    </svg>
  )
}

export default function Registry() {
  const { cars, loading } = useRegistry()
  const [activeTab, setActiveTab] = useState('All')
  const [view, setView] = useState('grid')

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
        <h1>Fiat-Moretti 850 Sportiva</h1>
        <p>
          A complete registry of every known Sportiva — S1, S2, S4, and Targa.
          Built from primary sources, firsthand inspection, and original documentation.
          Updated as new cars surface.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Cars documented</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.located}</div>
          <div className="stat-label">Currently located</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.ownerKnown}</div>
          <div className="stat-label">Owner known</div>
        </div>
      </div>

      {/* Tabs + view toggle */}
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
        <div className="view-toggle">
          <button
            className={`view-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
            aria-label="Grid view"
          >
            <GridIcon />
          </button>
          <button
            className={`view-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
            aria-label="List view"
          >
            <ListIcon />
          </button>
        </div>
      </div>

      {/* Cars */}
      {filtered.length === 0 ? (
        <div className="empty-state">No cars in this category yet.</div>
      ) : view === 'grid' ? (
        <div className="registry-grid">
          {filtered.map(car => (
            <CarCard key={car.chassis} car={car} />
          ))}
        </div>
      ) : (
        <div className="registry-list">
          <div className="list-header">
            <span className="list-header-cell">Chassis</span>
            <span className="list-header-cell">Model</span>
            <span className="list-header-cell">Year</span>
            <span className="list-header-cell">Color</span>
            <span className="list-header-cell">Location</span>
            <span className="list-header-cell">Status</span>
            <span className="list-header-cell">Owner</span>
          </div>
          {filtered.map(car => (
            <CarListRow key={car.chassis} car={car} />
          ))}
        </div>
      )}
    </main>
  )
}
