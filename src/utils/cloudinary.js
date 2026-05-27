export function chassisToSlug(chassis) {
  let hash = 5381
  for (let i = 0; i < chassis.length; i++) {
    hash = Math.imul(hash, 31) + chassis.charCodeAt(i) | 0
  }
  return Math.abs(hash).toString().padStart(8, '0')
}

export function maskChassis(chassis) {
  if (!chassis) return ''
  return chassis.replace(/[A-Za-z0-9]/g, '*')
}

/**
 * Insert Cloudinary transformation params after /upload/ in a URL.
 * The base URL stored in the sheet is the full URL including the file path.
 * We inject transformation params between /upload/ and the rest.
 *
 * e.g. https://res.cloudinary.com/acct/image/upload/v1234/car.jpg
 *   → https://res.cloudinary.com/acct/image/upload/w_1200,q_auto,f_auto/v1234/car.jpg
 */
export function cloudinaryImage(url, params = 'w_1200,q_auto,f_auto') {
  if (!url) return ''
  const marker = '/upload/'
  const idx = url.indexOf(marker)
  if (idx === -1) return url
  return url.slice(0, idx + marker.length) + params + '/' + url.slice(idx + marker.length)
}

export function cloudinaryThumb(url) {
  return cloudinaryImage(url, 'w_400,q_auto,f_auto')
}

export function cloudinaryVideo(url) {
  return cloudinaryImage(url, 'q_auto')
}
