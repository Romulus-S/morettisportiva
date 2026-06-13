import { useEffect } from 'react'

const DEFAULT_TITLE = 'Moretti Sportiva — Registry & Archive'
const DEFAULT_DESC = 'A complete registry of every known Fiat-Moretti 850 Sportiva — S1, S2, S4, and Targa. Built from primary sources, firsthand inspection, and original documentation.'

export function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    if (title) document.title = title
    const tag = document.querySelector('meta[name="description"]')
    if (tag && description) tag.setAttribute('content', description)
    return () => {
      document.title = DEFAULT_TITLE
      if (tag) tag.setAttribute('content', DEFAULT_DESC)
    }
  }, [title, description])
}
