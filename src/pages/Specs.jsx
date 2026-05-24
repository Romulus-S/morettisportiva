import { useState } from 'react'

const VARIANTS = [
  {
    model: 'S1',
    years: '1966–1968',
    engine: '843cc inline-4',
    power: '47 hp',
    weight: '600 kg',
    wheelbase: '2,000 mm',
    body: 'Coupé',
    production: '~25',
    specs: [
      { k: 'Engine', v: '843cc OHV inline-4' },
      { k: 'Bore × stroke', v: '65 × 63.5 mm' },
      { k: 'Power', v: '47 hp @ 6,200 rpm' },
      { k: 'Torque', v: '57 Nm @ 4,000 rpm' },
      { k: 'Gearbox', v: '4-speed manual, rear-mounted' },
      { k: 'Suspension (F)', v: 'Independent, wishbone, coil spring' },
      { k: 'Suspension (R)', v: 'Independent, semi-trailing arm' },
      { k: 'Brakes', v: 'Drums all round' },
      { k: 'Wheelbase', v: '2,000 mm' },
      { k: 'Length', v: '3,580 mm' },
      { k: 'Width', v: '1,450 mm' },
      { k: 'Kerb weight', v: '~600 kg' },
      { k: 'Top speed', v: '~140 km/h' },
      { k: 'Production', v: '~25 examples' },
    ],
  },
  {
    model: 'S2',
    years: '1968–1970',
    engine: '903cc inline-4',
    power: '52 hp',
    weight: '610 kg',
    wheelbase: '2,000 mm',
    body: 'Coupé',
    production: '~52',
    specs: [
      { k: 'Engine', v: '903cc OHV inline-4' },
      { k: 'Bore × stroke', v: '65 × 68 mm' },
      { k: 'Power', v: '52 hp @ 6,200 rpm' },
      { k: 'Torque', v: '69 Nm @ 4,000 rpm' },
      { k: 'Gearbox', v: '4-speed manual, rear-mounted' },
      { k: 'Suspension (F)', v: 'Independent, wishbone, coil spring' },
      { k: 'Suspension (R)', v: 'Independent, semi-trailing arm' },
      { k: 'Brakes', v: 'Drums all round' },
      { k: 'Wheelbase', v: '2,000 mm' },
      { k: 'Length', v: '3,590 mm' },
      { k: 'Width', v: '1,450 mm' },
      { k: 'Kerb weight', v: '~610 kg' },
      { k: 'Top speed', v: '~150 km/h' },
      { k: 'Production', v: '~52 examples' },
    ],
  },
  {
    model: 'S4',
    years: '1970–1972',
    engine: '903cc inline-4',
    power: '52 hp',
    weight: '620 kg',
    wheelbase: '2,000 mm',
    body: 'Coupé',
    production: '~20',
    specs: [
      { k: 'Engine', v: '903cc OHV inline-4' },
      { k: 'Bore × stroke', v: '65 × 68 mm' },
      { k: 'Power', v: '52 hp @ 6,200 rpm' },
      { k: 'Torque', v: '69 Nm @ 4,000 rpm' },
      { k: 'Gearbox', v: '4-speed manual, rear-mounted' },
      { k: 'Suspension (F)', v: 'Independent, wishbone, coil spring' },
      { k: 'Suspension (R)', v: 'Independent, semi-trailing arm' },
      { k: 'Brakes', v: 'Drums all round' },
      { k: 'Wheelbase', v: '2,000 mm' },
      { k: 'Length', v: '3,600 mm' },
      { k: 'Width', v: '1,450 mm' },
      { k: 'Kerb weight', v: '~620 kg' },
      { k: 'Top speed', v: '~150 km/h' },
      { k: 'Production', v: '~20 examples' },
    ],
  },
  {
    model: 'Targa',
    years: '1969–1972',
    engine: '903cc inline-4',
    power: '52 hp',
    weight: '625 kg',
    wheelbase: '2,000 mm',
    body: 'Targa',
    production: '<10',
    specs: [
      { k: 'Engine', v: '903cc OHV inline-4' },
      { k: 'Bore × stroke', v: '65 × 68 mm' },
      { k: 'Power', v: '52 hp @ 6,200 rpm' },
      { k: 'Torque', v: '69 Nm @ 4,000 rpm' },
      { k: 'Gearbox', v: '4-speed manual, rear-mounted' },
      { k: 'Suspension (F)', v: 'Independent, wishbone, coil spring' },
      { k: 'Suspension (R)', v: 'Independent, semi-trailing arm' },
      { k: 'Brakes', v: 'Drums all round' },
      { k: 'Wheelbase', v: '2,000 mm' },
      { k: 'Roof', v: 'Removable centre panel, fixed roll hoop' },
      { k: 'Kerb weight', v: '~625 kg' },
      { k: 'Top speed', v: '~148 km/h' },
      { k: 'Production', v: 'Fewer than 10 known' },
    ],
  },
]

function Accordion({ title, rows }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion">
      <button
        className={`accordion-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span>{title}</span>
        <svg
          className="accordion-chevron"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M3 5l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="accordion-body">
          {rows.map(({ k, v }) => (
            <div className="spec-row" key={k}>
              <span className="spec-key">{k}</span>
              <span className="spec-value">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Specs() {
  return (
    <main className="page">
      <div className="editorial-hero">
        <div className="label">Technical reference</div>
        <h1>Specifications</h1>
        <p>
          Comparative data across all four Sportiva variants. Production figures are
          approximate; surviving build records are incomplete. All data is subject to
          revision as new primary sources are located.
        </p>
      </div>

      {/* Variants comparison */}
      <div className="variants-grid">
        {VARIANTS.map(v => (
          <div key={v.model} className="variant-card">
            <div className="variant-card-header">
              <div className="variant-card-model">{v.model}</div>
              <div className="variant-card-years">{v.years}</div>
            </div>
            <div className="spec-row">
              <span className="spec-key">Engine</span>
              <span className="spec-value">{v.engine}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Power</span>
              <span className="spec-value">{v.power}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Weight</span>
              <span className="spec-value">{v.weight}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Wheelbase</span>
              <span className="spec-value">{v.wheelbase}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Body</span>
              <span className="spec-value">{v.body}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Production</span>
              <span className="spec-value">{v.production}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed specs per variant */}
      <div style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: 48, marginBottom: 16 }}>
        <div className="label" style={{ marginBottom: 24 }}>Detailed specifications</div>
      </div>
      {VARIANTS.map(v => (
        <Accordion key={v.model} title={`Sportiva ${v.model} — ${v.years}`} rows={v.specs} />
      ))}
    </main>
  )
}
