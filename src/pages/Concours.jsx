const APPEARANCES = [
  {
    year: '2025',
    event: 'Greenwich Concours d\'Elegance',
    location: 'Greenwich, CT',
    car: 'S2 · 1445-000',
    result: 'Etceterini class',
  },
  {
    year: '2024',
    event: 'Amelia Island Concours d\'Elegance',
    location: 'Amelia Island, FL',
    car: 'S2 (unconfirmed)',
    result: 'Under research',
  },
  {
    year: '2023',
    event: 'Pebble Beach Concours d\'Elegance',
    location: 'Pebble Beach, CA',
    car: '—',
    result: 'No confirmed entry',
  },
]

export default function Concours() {
  return (
    <main className="page">
      <div className="editorial-hero">
        <div className="label">Recognition &amp; presentation</div>
        <h1>The Sportiva at concours</h1>
        <p>
          The Fiat-Moretti 850 Sportiva has begun to attract serious concours attention —
          a recognition long overdue for one of the most elegant small coupés produced
          in postwar Turin. As more examples are documented and brought back to concours
          condition, the car's reputation at judged events is likely to grow.
        </p>
      </div>

      {/* Known appearances */}
      <div className="label" style={{ marginBottom: 16 }}>Known concours appearances</div>
      <div className="concours-table">
        <div className="concours-header">
          <span className="concours-header-cell">Year</span>
          <span className="concours-header-cell">Event</span>
          <span className="concours-header-cell">Location</span>
          <span className="concours-header-cell">Car</span>
          <span className="concours-header-cell">Result / class</span>
        </div>
        {APPEARANCES.map((a, i) => (
          <div className="concours-row" key={i}>
            <span style={{ color: 'var(--color-text-tertiary)', fontSize: 12 }}>{a.year}</span>
            <span style={{ fontSize: 13 }}>{a.event}</span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{a.location}</span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{a.car}</span>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{a.result}</span>
          </div>
        ))}
      </div>

      {/* Context section */}
      <div className="editorial-section full">
        <div>
          <h2>The growing recognition</h2>
          <p>
            Italian coachbuilt cars of the 1960s and early 1970s have risen dramatically
            in concours visibility over the past decade. The Etceterini class — devoted to
            minor Italian manufacturers — has become one of the most keenly contested at
            premier events, and the Sportiva's combination of rarity, visual refinement,
            and historical authenticity makes it a compelling entry in this context.
          </p>
          <p>
            The 2025 appearance of chassis 1445-000 at the Greenwich Concours d'Elegance
            marked what is believed to be the first time a Sportiva has been shown at a
            major American judged event. The response from judges and fellow exhibitors
            confirmed the car's potential as a concours subject.
          </p>
        </div>
      </div>

      <div className="editorial-section full">
        <div>
          <h2>Preparing your Sportiva for concours</h2>
          <p>
            The cardinal principle for presenting any coachbuilt Italian car at a serious
            concours is originality. Judges at premier events — Pebble Beach, Amelia Island,
            Villa d'Este — are attuned to the difference between a sympathetically preserved
            original and a restored car that approximates original specification. For the
            Sportiva, where so few build records survive, an unrestored example in honest
            condition will often outperform a heavily restored car that cannot document
            its own provenance.
          </p>
          <p>
            Documentation is the second priority. Any Moretti factory correspondence,
            period sales receipts, original registration documents, or photographs showing
            the car in period strengthen a concours presentation immeasurably. This registry
            exists in part to help owners locate and assemble such material.
          </p>
          <p>
            Mechanical correctness matters. The engine, gearbox, and major mechanical
            components should be period-correct for the specific variant and year. Where
            overbored engines or non-original components are present, transparency with
            judges is essential — there is no dishonour in acknowledging a car's history,
            but misrepresentation will damage a presentation severely.
          </p>
          <p>
            Owners preparing a Sportiva for concours are welcome to contact the registry
            for assistance with documentation, specification verification, or introductions
            to other owners and specialists.
          </p>
        </div>
      </div>
    </main>
  )
}
