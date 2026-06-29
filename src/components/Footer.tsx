import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Globe, Share2, Tv, Mail, Phone, MapPin, Heart } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'About',      href: '#about'   },
  { label: 'Music',      href: '#music'   },
  { label: 'Live Hub',   href: '/live'    },
  { label: 'Gallery',    href: '#gallery' },
  { label: 'Shows',      href: '#shows'   },
  { label: 'Contact',    href: '#contact' },
]

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  function handleAnchorClick(href: string) {
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
      {/* Gold divider line */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <span
              className="gold-foil font-bold"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}
            >
              Laura Roberts
            </span>
            <div className="text-xs tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--gold-dark)' }}>
              Entertainment
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            A professional band and entertainment production company bringing world-class performances to audiences of all ages and backgrounds. Music is for everyone.
          </p>
          <div className="flex gap-4 mt-6">
            {[
              { icon: Globe,   href: 'https://instagram.com', label: 'Instagram' },
              { icon: Share2,  href: 'https://facebook.com',  label: 'Facebook' },
              { icon: Tv,      href: 'https://youtube.com',   label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-all duration-300"
                style={{
                  border: '1px solid rgba(212,175,55,0.35)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold-primary)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-primary)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)'
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--gold-primary)' }}>
            Quick Links
          </h4>
          <ul className="space-y-3">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label}>
                {href.startsWith('#') ? (
                  <button
                    onClick={() => handleAnchorClick(href)}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    {label}
                  </button>
                ) : (
                  <Link to={href} className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--gold-primary)' }}>
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2.5">
              <Mail size={14} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
              {/* ── Replace with your real email ── */}
              <a href="mailto:bookings@laurarobertsentertainment.com" className="hover:text-yellow-400 transition-colors">
                bookings@laurarobertsentertainment.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
              {/* ── Replace with your real phone number ── */}
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={14} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
              {/* ── Replace with your real location ── */}
              <span>Los Angeles, CA</span>
            </li>
          </ul>
          <button
            onClick={() => handleAnchorClick('#contact')}
            className="gold-btn text-black text-xs font-semibold px-5 py-2.5 rounded-full mt-6 cursor-pointer border-none"
            style={{ letterSpacing: '0.05em' }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 pb-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600"
        style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
      >
        <span>© {new Date().getFullYear()} Laura Roberts Entertainment. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Made with <Heart size={11} className="text-red-500" fill="currentColor" /> for the love of music
        </span>
      </div>
    </footer>
  )
}
