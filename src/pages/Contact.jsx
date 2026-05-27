export default function Contact() {
  return (
    <main className="page">
      <div style={{ paddingTop: 40, maxWidth: 560 }}>
        <div className="label" style={{ marginBottom: 16 }}>Contact</div>
        <h1 style={{ fontSize: 28, fontWeight: 500, marginBottom: 24 }}>Get in touch</h1>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
          Email Romulus Sottile at{' '}
          <a href="mailto:romulus.sottile@gmail.com" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            romulus.sottile@gmail.com
          </a>
          {' '}or write to him on WhatsApp at{' '}
          <a href="https://wa.me/12039977650" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            +1 203 997 7650
          </a>.
        </p>
      </div>
    </main>
  )
}
