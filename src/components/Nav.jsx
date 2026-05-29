import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Registry' },
  { to: '/racing', label: 'Racing' },
  { to: '/concours', label: 'Concours & Rallies' },
  { to: '/for-sale', label: 'For sale' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link'

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-primary">Moretti Sportiva</span>
          <span className="nav-logo-secondary">Registry &amp; Archive</span>
        </Link>

        <ul className="nav-links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={linkClass}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
          <span className="nav-hamburger-label">{open ? 'Close' : 'Menu'}</span>
        </button>
      </nav>

      <div className={`nav-mobile ${open ? 'open' : ''}`}>
        <ul className="nav-links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
