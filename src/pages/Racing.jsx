const RESULTS = [
  {
    year: '1967',
    race: 'Targa Florio',
    car: 'Sportiva S1',
    drivers: 'Facetti / Foitek',
    result: 'Class finish',
  },
  {
    year: '1968',
    race: 'Targa Florio',
    car: 'Sportiva S1',
    drivers: 'Moretti works entry',
    result: 'DNF — mechanical',
  },
  {
    year: '1968',
    race: 'Rally dei Fiori',
    car: 'Sportiva S1',
    drivers: 'Unknown',
    result: 'Class entry',
  },
  {
    year: '1969',
    race: 'Coppa Città di Enna',
    car: 'Sportiva S2',
    drivers: 'Private entry',
    result: 'Points finish',
  },
  {
    year: '1970',
    race: 'Targa Florio',
    car: 'Sportiva S2',
    drivers: 'Private entry',
    result: 'Under investigation',
  },
]

export default function Racing() {
  return (
    <main className="page">
      <div className="editorial-hero">
        <div className="label">Targa Florio &amp; beyond</div>
        <h1>The Sportiva in competition</h1>
        <p>
          Giovanni Moretti's racing heritage ran deep — the firm had been building
          competition cars since the 1940s, contesting events as diverse as the Mille Miglia
          and the Targa Florio with works and semi-works machinery. The Sportiva's competition
          record is modest but authentic: a small car raced seriously, in the spirit of the
          Italian sporting tradition from which it came.
        </p>
      </div>

      {/* Results table */}
      <div className="section-heading" style={{ paddingBottom: 0, marginBottom: 0, border: 'none' }}>
        <div className="label">Known competition appearances</div>
      </div>
      <div className="race-table">
        <div className="race-header">
          <span className="race-header-cell">Year</span>
          <span className="race-header-cell">Race</span>
          <span className="race-header-cell">Car</span>
          <span className="race-header-cell">Drivers</span>
          <span className="race-header-cell">Result</span>
        </div>
        {RESULTS.map((r, i) => (
          <div className="race-row" key={i}>
            <span className="race-year">{r.year}</span>
            <span className="race-cell">{r.race}</span>
            <span className="race-cell">{r.car}</span>
            <span className="race-cell">{r.drivers}</span>
            <span className="race-cell-note">{r.result}</span>
          </div>
        ))}
      </div>

      {/* Targa Florio section */}
      <div className="editorial-section full">
        <div>
          <h2>The Targa Florio entries</h2>
          <p>
            The Targa Florio — Sicily's legendary road race, contested over the mountain
            circuit of the Madonie — was the proving ground for Italian sporting cars of
            every size and provenance. That Moretti entered the Sportiva in this event was
            entirely in keeping with the firm's character: Giovanni Moretti believed that
            competition validated a design and sharpened a product.
          </p>
          <p>
            The 1967 and 1968 appearances have been traced through period press coverage
            and scrutineering records. The details of individual chassis numbers and
            driver pairings remain under active research. Owners with documentation
            relating to these entries are urged to contact the registry.
          </p>
        </div>
      </div>

      <div className="editorial-section full">
        <div>
          <h2>Moretti's broader racing heritage</h2>
          <p>
            Before the Sportiva, Moretti had campaigned a succession of purpose-built
            racing cars in the postwar Italian scene: 750cc single-seaters in the late
            1940s, barchetta-bodied sports cars through the 1950s, and GT coupés of
            increasing sophistication into the 1960s. By the time the Sportiva appeared,
            Moretti's workshop had accumulated decades of practical knowledge about
            building lightweight cars that could survive sustained competition use.
          </p>
          <p>
            This heritage informed the Sportiva's construction. The body panels were
            carefully fitted; the mechanicals, while Fiat-derived, were assembled with
            a care for durability that differentiated a Moretti from a standard production
            car. The result was a road car that could, in the hands of an enthusiastic
            private owner, be taken to the track with confidence.
          </p>
        </div>
      </div>
    </main>
  )
}
