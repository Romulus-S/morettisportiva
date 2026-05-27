export default function ForSale() {
  return <ComingSoon title="For sale" />
}

function ComingSoon({ title }) {
  return (
    <main className="page">
      <div style={{ paddingTop: 40 }}>
        <div className="label" style={{ marginBottom: 16 }}>{title}</div>
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: 13, letterSpacing: '0.04em' }}>Coming soon</p>
      </div>
    </main>
  )
}
