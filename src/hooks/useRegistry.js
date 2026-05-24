import { useState, useEffect } from 'react'
import Papa from 'papaparse'

const SAMPLE_DATA = [
  {
    chassis: '1445-000',
    model: 'S2',
    year: '1970',
    color: 'Giallo Champagne',
    location: 'Connecticut, US',
    plate: 'TO D91060',
    engine: '903cc inline-4',
    body: 'Coupé',
    base: 'Fiat 850',
    status: 'located',
    owner: 'known-private',
    owner_name: '',
    description:
      'Believed to be one of approximately 52 S2 examples built, this car was first registered in Italy and remained in single Sicilian ownership for several decades before being deregistered in Turin in 2024. Presented in original Giallo Champagne over tan, it retains its matching-numbers 903cc engine and is considered among the finest unrestored surviving S2 examples. Shipped to the United States by container in 2024; exhibited at the Greenwich Concours d\'Elegance (Etceterini class) in May 2025.',
    history:
      '2024|Deregistered in Turin (PRA/ACI), exported to United States via CFR Classic container|Sicily → Connecticut§2025|Greenwich Concours d\'Elegance — Etceterini class|Greenwich, CT§–|Current ownership|Connecticut, US · Owner known',
    images: '',
    videos: '',
    last_updated: 'May 2025',
  },
  {
    chassis: '1297-076',
    model: 'S2',
    year: '1970',
    color: 'Grigio Silverstone Metallizzato',
    location: 'Ohio, US',
    plate: 'unknown',
    engine: '965cc inline-4 (overbored)',
    body: 'Coupé',
    base: 'Fiat 850',
    status: 'located',
    owner: 'unknown',
    owner_name: '',
    description:
      'One of approximately 52 S2 examples built. Originally sold in Switzerland, acquired there by a subsequent owner in 2013 before being relocated to Greece, where it underwent a refurbishment including bodywork, repaint in Grigio Silverstone Metallizzato, and interior re-trim in red leather. Imported to the US in 2016. Sold on Bring a Trailer in August 2024 for $110,000 — one of the highest prices ever recorded for a Sportiva.',
    history:
      '2013|Acquired in Switzerland, relocated to Greece|Refurbishment: bodywork, repaint, interior§2016|Imported to United States|§2024|Sold on Bring a Trailer|$110,000 · August 2024',
    images: '',
    videos: '',
    last_updated: 'November 2024',
  },
]

function parseHistory(str) {
  if (!str || !str.trim()) return []
  return str.split('§').map(entry => {
    const parts = entry.split('|')
    return {
      year: parts[0] || '',
      detail: parts[1] || '',
      sublabel: parts[2] || '',
    }
  })
}

function parseList(str) {
  if (!str || !str.trim()) return []
  return str.split(',').map(s => s.trim()).filter(Boolean)
}

function processCar(car) {
  return {
    ...car,
    historyEntries: parseHistory(car.history),
    imageUrls: parseList(car.images),
    videoUrls: parseList(car.videos),
  }
}

export function useRegistry() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const sheetUrl = import.meta.env.VITE_SHEETS_CSV_URL

    if (!sheetUrl) {
      setCars(SAMPLE_DATA.map(processCar))
      setLoading(false)
      return
    }

    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const valid = results.data.filter(r => r.chassis && r.chassis.trim())
        setCars(valid.map(processCar))
        setLoading(false)
      },
      error: err => {
        console.error('Sheet fetch failed:', err)
        setCars(SAMPLE_DATA.map(processCar))
        setLoading(false)
        setError(err)
      },
    })
  }, [])

  return { cars, loading, error }
}
