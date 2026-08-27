import Papa from 'papaparse'
import { writeFileSync } from 'fs'

const SHEET_URL = process.env.VITE_SHEETS_CSV_URL ||
  'https://docs.google.com/spreadsheets/d/1s2RFv6A_KFqn3xyMKDgFDRn51EFmGPtMVsoS8HZlwyc/export?format=csv&gid=0'

const BASE_URL = 'https://morettisportiva.com'

const STATIC_PAGES = ['/', '/racing', '/concours', '/contact']

function chassisToSlug(chassis) {
  let hash = 5381
  for (let i = 0; i < chassis.length; i++) {
    hash = Math.imul(hash, 31) + chassis.charCodeAt(i) | 0
  }
  return Math.abs(hash).toString().padStart(8, '0')
}

async function main() {
  const today = new Date().toISOString().slice(0, 10)

  let carPaths = []
  try {
    const res = await fetch(SHEET_URL)
    const text = await res.text()
    const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })
    carPaths = data
      .filter(row => row.chassis && row.chassis.trim())
      .map(row => `/registry/${chassisToSlug(row.chassis.trim())}`)
    console.log(`Fetched ${carPaths.length} car records from sheet`)
  } catch (e) {
    console.warn('Could not fetch sheet for sitemap:', e.message)
  }

  const allPaths = [...STATIC_PAGES, ...carPaths]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map(path => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')}
</urlset>`

  writeFileSync('dist/sitemap.xml', xml)
  console.log(`sitemap.xml written: ${allPaths.length} URLs`)
}

main()
