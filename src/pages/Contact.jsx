import { useState } from 'react'

const FORMSPREE = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/PLACEHOLDER'

function ContactForm({ fields, submitLabel, endpoint, formName }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{
        padding: '24px',
        border: '0.5px solid var(--color-border)',
        borderRadius: 8,
        color: 'var(--color-text-secondary)',
        fontSize: 13,
      }}>
        Message sent — thank you. We will be in touch.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_form" value={formName} />
      {fields.map(({ name, label, type = 'text', required = false }) =>
        type === 'textarea' ? (
          <div className="form-group" key={name}>
            <label className="form-label" htmlFor={`${formName}-${name}`}>{label}</label>
            <textarea
              className="form-textarea"
              id={`${formName}-${name}`}
              name={name}
              required={required}
            />
          </div>
        ) : (
          <div className="form-group" key={name}>
            <label className="form-label" htmlFor={`${formName}-${name}`}>{label}</label>
            <input
              className="form-input"
              id={`${formName}-${name}`}
              name={name}
              type={type}
              required={required}
            />
          </div>
        )
      )}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
      {status === 'error' && (
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--color-unlocated-text)' }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  )
}

export default function Contact() {
  return (
    <main className="page">
      <div style={{ marginBottom: 40 }}>
        <div className="label" style={{ marginBottom: 8 }}>Registry</div>
        <h1 style={{ fontSize: 28, fontWeight: 500, marginBottom: 12 }}>Get in touch</h1>
        <p className="contact-intro">
          This registry is built from primary sources — owners, specialists, and period
          documentation. If you have information about a Sportiva, we want to hear from you.
        </p>
      </div>

      <div className="contact-grid">
        {/* Submit your car */}
        <div>
          <h2 className="contact-section-title">Submit your car</h2>
          <p className="contact-section-desc">
            If you own or know of a Sportiva not yet in the registry, we want to hear from
            you. Any level of documentation is welcome — even a chassis number and a photograph
            is enough to begin a record.
          </p>
          <ContactForm
            formName="submit-car"
            endpoint={FORMSPREE}
            submitLabel="Submit"
            fields={[
              { name: 'name', label: 'Name', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'chassis', label: 'Chassis number (if known)' },
              { name: 'message', label: 'Message', type: 'textarea', required: true },
            ]}
          />
        </div>

        {/* Update a record */}
        <div>
          <h2 className="contact-section-title">Update a record</h2>
          <p className="contact-section-desc">
            Help us keep the registry accurate. If you have corrections, additional history,
            or documentation for a car already listed, send us a message. Earlier ownership
            history, original registration documents, and period photographs are particularly
            valuable.
          </p>
          <ContactForm
            formName="update-record"
            endpoint={FORMSPREE}
            submitLabel="Send update"
            fields={[
              { name: 'name', label: 'Name', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'chassis', label: 'Chassis number', required: true },
              { name: 'update', label: 'What needs updating', type: 'textarea', required: true },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
