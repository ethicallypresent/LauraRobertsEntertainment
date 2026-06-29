import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Globe, Share2, Tv } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Music',   href: '#music'   },
  { label: 'Live',    href: '/live'    },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()

  // Add background shadow when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [location])

  /** Handle clicks on section anchors — navigate to "/" first if needed */
  function handleAnchorClick(href: string) {
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/')
        // Small delay so Home mounts before we scroll
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link to="/" className="flex flex-col leading-tight select-none" aria-label="Home">
          <span
            className="gold-foil font-bold tracking-wide"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem' }}
          >
            Laura Roberts
          </span>
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: 'var(--gold-dark)', letterSpacing: '0.22em' }}
          >
            Entertainment
          </span>
        </Link>

        {/* ── Desktop nav links ──────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) =>
            href.startsWith('#') ? (
              <li key={label}>
                <button
                  onClick={() => handleAnchorClick(href)}
                  className="text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
                  style={{ letterSpacing: '0.04em' }}
                >
                  {label}
                </button>
              </li>
            ) : (
              <li key={label}>
                <Link
                  to={href}
                  className="text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  style={{
                    letterSpacing: '0.04em',
                    color: location.pathname === href ? 'var(--gold-primary)' : undefined,
                  }}
                >
                  {label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* ── Right side: social icons + CTA ────────────────────── */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social icons */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Globe size={18} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Share2 size={18} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Tv size={18} />
          </a>

          {/* Book / Hire CTA */}
          <button
            onClick={() => handleAnchorClick('#contact')}
            className="gold-btn text-black text-sm font-semibold px-5 py-2 rounded-full cursor-pointer border-none"
            style={{ letterSpacing: '0.05em' }}
          >
            Book / Hire Us
          </button>
        </div>

        {/* ── Mobile hamburger ──────────────────────────────────── */}
        <button
          className="md:hidden p-2 rounded-md text-gray-300 hover:text-yellow-400 transition-colors border-none bg-transparent cursor-pointer"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile menu drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: 'rgba(10,10,10,0.98)',
              borderTop: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map(({ label, href }) =>
                href.startsWith('#') ? (
                  <button
                    key={label}
                    onClick={() => handleAnchorClick(href)}
                    className="text-left text-base font-medium text-gray-200 hover:text-yellow-400 transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    key={label}
                    to={href}
                    className="text-base font-medium text-gray-200 hover:text-yellow-400 transition-colors"
                  >
                    {label}
                  </Link>
                )
              )}

              {/* Social row */}
              <div className="flex gap-5 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Globe size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Share2 size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Tv size={20} />
                </a>
              </div>

              <button
                onClick={() => handleAnchorClick('#contact')}
                className="gold-btn text-black font-semibold px-6 py-3 rounded-full text-sm cursor-pointer border-none mt-2"
              >
                Book / Hire Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
