import { useEffect } from 'react'

const DEFAULT_TITLE = 'Moretti Sportiva — Registry & Archive'
const DEFAULT_DESC = 'A complete archive of every known Fiat 850 Moretti Sportiva — S1, S2, S4, and Targas.'
const DEFAULT_IMAGE = 'https://morettisportiva.com/images/racing-targa1967.jpg'

function setMeta(selector, attr, value) {
  let tag = document.querySelector(selector)
  if (!tag) {
    const [attrName, attrVal] = attr.split('=').map(s => s.replace(/"/g, ''))
    tag = document.createElement('meta')
    tag.setAttribute(attrName, attrVal)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', value)
}

export function usePageMeta({ title, description, image } = {}) {
  useEffect(() => {
    const t = title || DEFAULT_TITLE
    const d = description || DEFAULT_DESC
    const img = image || DEFAULT_IMAGE

    document.title = t
    setMeta('meta[name="description"]', 'name="description"', d)
    setMeta('meta[property="og:title"]', 'property="og:title"', t)
    setMeta('meta[property="og:description"]', 'property="og:description"', d)
    setMeta('meta[property="og:url"]', 'property="og:url"', window.location.href)
    setMeta('meta[property="og:image"]', 'property="og:image"', img)

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('meta[name="description"]', 'name="description"', DEFAULT_DESC)
      setMeta('meta[property="og:title"]', 'property="og:title"', DEFAULT_TITLE)
      setMeta('meta[property="og:description"]', 'property="og:description"', DEFAULT_DESC)
      setMeta('meta[property="og:image"]', 'property="og:image"', DEFAULT_IMAGE)
    }
  }, [title, description, image])
}
