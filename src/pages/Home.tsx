import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, X, Ticket, ChevronRight, Radio,
  Music, Mic2, Star, Send, CheckCircle2,
  MapPin, Clock, ArrowRight
} from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER DATA — replace these with real content
// ─────────────────────────────────────────────────────────────────────────────

/** Music tracks — update href/videoId with real YouTube/Spotify links */
const TRACKS = [
  {
    id: 1,
    title: 'Golden Hour',
    genre: 'Soul / R&B',
    year: '2024',
    // Replace with your real YouTube video ID (the part after ?v=)
    videoId: 'dQw4w9WgXcQ',
    // Replace with a real cover image URL or import a local asset
    cover: 'https://picsum.photos/seed/track1/400/400',
  },
  {
    id: 2,
    title: 'Midnight Serenade',
    genre: 'Jazz / Blues',
    year: '2024',
    videoId: 'dQw4w9WgXcQ',
    cover: 'https://picsum.photos/seed/track2/400/400',
  },
  {
    id: 3,
    title: 'Elevation',
    genre: 'Gospel / Pop',
    year: '2023',
    videoId: 'dQw4w9WgXcQ',
    cover: 'https://picsum.photos/seed/track3/400/400',
  },
  {
    id: 4,
    title: 'Together We Rise',
    genre: 'Afrobeat / World',
    year: '2023',
    videoId: 'dQw4w9WgXcQ',
    cover: 'https://picsum.photos/seed/track4/400/400',
  },
]

/** Upcoming shows — update with real event details */
const SHOWS = [
  {
    id: 1,
    venue: 'The Wiltern',
    city: 'Los Angeles, CA',
    date: 'Jul 19, 2026',
    time: '8:00 PM',
    ticketUrl: '#', // Replace with real ticket link
  },
  {
    id: 2,
    venue: 'Beacon Theatre',
    city: 'New York, NY',
    date: 'Aug 3, 2026',
    time: '7:30 PM',
    ticketUrl: '#',
  },
  {
    id: 3,
    venue: 'House of Blues',
    city: 'Chicago, IL',
    date: 'Aug 22, 2026',
    time: '9:00 PM',
    ticketUrl: '#',
  },
]

/** Gallery images — replace seeds/URLs with real photos
 *  Recommended: use high-quality 16:9 or square photos of live performances
 */
const GALLERY_IMAGES = [
  { id: 1, src: 'https://picsum.photos/seed/gal1/800/600', alt: 'Live performance — stage lights' },
  { id: 2, src: 'https://picsum.photos/seed/gal2/800/600', alt: 'Band backstage candid' },
  { id: 3, src: 'https://picsum.photos/seed/gal3/800/600', alt: 'Laura at the mic' },
  { id: 4, src: 'https://picsum.photos/seed/gal4/800/600', alt: 'Crowd energy at a live show' },
  { id: 5, src: 'https://picsum.photos/seed/gal5/800/600', alt: 'Studio session' },
  { id: 6, src: 'https://picsum.photos/seed/gal6/800/600', alt: 'Event production setup' },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate()
  const [activeTrack, setActiveTrack]   = useState<(typeof TRACKS)[0] | null>(null)
  const [email, setEmail]               = useState('')
  const [subscribed, setSubscribed]     = useState(false)
  const [emailError, setEmailError]     = useState('')

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    // TODO: wire up to your email service (Mailchimp, ConvertKit, etc.)
    setSubscribed(true)
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO SECTION
         ══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: '80px' }}  // offset for fixed navbar
      >
        {/* Hero background image
            Replace this URL with a real high-resolution performance photo.
            Recommended: 1920×1080 or larger. */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')",
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.9) 100%)' }} />
        {/* Gold vignette glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-8 px-4 py-2 rounded-full"
            style={{
              color: 'var(--gold-primary)',
              border: '1px solid rgba(212,175,55,0.4)',
              backgroundColor: 'rgba(212,175,55,0.07)',
              letterSpacing: '0.2em',
            }}
          >
            <Star size={12} fill="currentColor" />
            World-Class Entertainment
            <Star size={12} fill="currentColor" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="gold-foil font-bold leading-tight mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            }}
          >
            Where Music<br />Meets Magic
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
          >
            A professional band and entertainment production company bringing soulful, electrifying performances to audiences everywhere.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => navigate('/live')}
              className="gold-btn text-black font-semibold px-8 py-3.5 rounded-full flex items-center gap-2 cursor-pointer border-none"
            >
              <Radio size={17} />
              Watch Live Now
            </button>
            <button
              onClick={() => document.querySelector('#music')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white font-medium px-8 py-3.5 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Music size={17} />
              Explore Music
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white font-medium px-8 py-3.5 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Mic2 size={17} />
              Book Your Event
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(212,175,55,0.6)' }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ letterSpacing: '0.18em' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.8), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT SECTION
         ══════════════════════════════════════════════════════ */}
      <SectionWrapper id="about" className="py-24 px-4" style={{ backgroundColor: 'var(--bg-dark)' } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image column
              Replace this URL with a real professional photo of Laura or the band. */}
          <div className="relative">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/5', maxHeight: '560px' }}
            >
              <img
                src="https://picsum.photos/seed/about/600/750"
                alt="Laura Roberts performing on stage"
                className="w-full h-full object-cover"
              />
              {/* Gold frame accent */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ border: '1px solid rgba(212,175,55,0.3)' }}
              />
            </div>
            {/* Floating stat card */}
            <div
              className="glass-card absolute -bottom-6 -right-6 px-6 py-4 rounded-xl hidden sm:block"
              style={{ backgroundColor: 'rgba(10,10,10,0.9)' }}
            >
              <div className="text-2xl font-bold gold-foil" style={{ fontFamily: 'var(--font-heading)' }}>15+</div>
              <div className="text-xs text-gray-400 mt-0.5">Years of Performing</div>
            </div>
          </div>

          {/* Text column */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold-primary)' }}>
              Our Story
            </span>
            <h2
              className="gold-foil font-bold mt-3 mb-6"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              More Than Music —<br />An Experience
            </h2>
            {/* ── Replace this bio with the real band bio ── */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Laura Roberts Entertainment was born from a simple belief: that music is a universal language that brings people together, transcends barriers, and leaves souls transformed. Founded by the extraordinary Laura Roberts, our company has grown into a full-scale entertainment production powerhouse.
              </p>
              <p>
                With a repertoire that spans soul, R&B, jazz, gospel, afrobeat, and pop, Laura and her world-class band craft unforgettable live experiences. Whether it's an intimate corporate dinner, a festival stage, or a grand concert hall, we bring the same dedication, energy, and artistry to every performance.
              </p>
              <p>
                We believe everyone deserves to feel the power of live music — and we make sure everyone in the room does.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8" style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}>
              {[
                { num: '500+', label: 'Live Shows' },
                { num: '50K+', label: 'Fans Worldwide' },
                { num: '12',   label: 'Original Albums' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold gold-foil" style={{ fontFamily: 'var(--font-heading)' }}>{num}</div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════
          MUSIC SECTION
         ══════════════════════════════════════════════════════ */}
      <SectionWrapper id="music" className="py-24 px-4" style={{ backgroundColor: 'var(--bg-black)' } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold-primary)' }}>
              Discography
            </span>
            <h2
              className="gold-foil font-bold mt-3"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              The Music
            </h2>
          </div>

          {/* Track grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRACKS.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setActiveTrack(track)}
              >
                {/* Cover art */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--gold-primary)' }}
                    >
                      <Play size={22} fill="black" className="text-black ml-1" />
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{track.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{track.genre} · {track.year}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spotify / full catalogue CTA */}
          <div className="text-center mt-12">
            {/* Replace # with your Spotify artist/album URL */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn text-black font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2"
            >
              <Music size={17} />
              Full Catalogue on Spotify
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── YouTube embed modal ── */}
      <AnimatePresence>
        {activeTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={() => setActiveTrack(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(212,175,55,0.3)' }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="aspect-video">
                {/* YouTube embed — videoId is set per track above */}
                <iframe
                  src={`https://www.youtube.com/embed/${activeTrack.videoId}?autoplay=1&rel=0`}
                  title={activeTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setActiveTrack(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-black cursor-pointer border-none"
                  style={{ backgroundColor: 'var(--gold-primary)' }}
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          LIVE TEASER / CTA SECTION
         ══════════════════════════════════════════════════════ */}
      <SectionWrapper
        className="py-24 px-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-dark)' } as React.CSSProperties}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6 px-4 py-2 rounded-full"
            style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)', backgroundColor: 'rgba(239,68,68,0.08)' }}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 live-pulse inline-block" />
            Watch Us Live
          </div>

          <h2
            className="gold-foil font-bold mb-6"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Join the Live Experience
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-10 leading-relaxed">
            Stream our performances live on YouTube and Facebook. Never miss a moment — from studio sessions to full concert broadcasts.
          </p>

          <button
            onClick={() => navigate('/live')}
            className="gold-btn text-black font-bold px-10 py-4 rounded-full flex items-center gap-3 mx-auto cursor-pointer border-none text-lg"
          >
            <Radio size={22} />
            Go to Live Hub
            <ChevronRight size={20} />
          </button>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════
          UPCOMING SHOWS SECTION
         ══════════════════════════════════════════════════════ */}
      <SectionWrapper id="shows" className="py-24 px-4" style={{ backgroundColor: 'var(--bg-black)' } as React.CSSProperties}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold-primary)' }}>
              On Tour
            </span>
            <h2
              className="gold-foil font-bold mt-3"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Upcoming Shows
            </h2>
          </div>

          <div className="space-y-4">
            {SHOWS.map((show, i) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Date badge */}
                <div
                  className="text-sm font-bold px-4 py-2 rounded-lg text-black shrink-0"
                  style={{ backgroundColor: 'var(--gold-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  {show.date}
                </div>

                {/* Venue info */}
                <div className="flex-1">
                  <div className="font-semibold text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
                    {show.venue}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {show.city}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {show.time}</span>
                  </div>
                </div>

                {/* Ticket button */}
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-btn text-black text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shrink-0"
                  style={{ textDecoration: 'none' }}
                >
                  <Ticket size={14} />
                  Get Tickets
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════
          GALLERY SECTION
         ══════════════════════════════════════════════════════ */}
      <SectionWrapper id="gallery" className="py-24 px-4" style={{ backgroundColor: 'var(--bg-dark)' } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold-primary)' }}>
              Behind the Scenes
            </span>
            <h2
              className="gold-foil font-bold mt-3"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Gallery
            </h2>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-xl overflow-hidden group cursor-pointer"
                style={{ aspectRatio: i % 3 === 1 ? '4/5' : '4/3' }}
              >
                {/* Replace these picsum URLs with your actual gallery photos */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                  <span className="text-xs text-gray-200">{img.alt}</span>
                </div>
                {/* Gold border hover effect */}
                <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ border: '1px solid rgba(212,175,55,0.5)' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════
          NEWSLETTER SECTION
         ══════════════════════════════════════════════════════ */}
      <SectionWrapper className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-black)' } as React.CSSProperties}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center bottom, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
        <div className="max-w-xl mx-auto text-center relative z-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold-primary)' }}>
            Stay Connected
          </span>
          <h2
            className="gold-foil font-bold mt-3 mb-3"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
          >
            Join Our Inner Circle
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Be first to know about new releases, tour dates, exclusive behind-the-scenes content, and VIP offers.
          </p>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-8"
              >
                <CheckCircle2 size={48} style={{ color: 'var(--gold-primary)' }} />
                <p className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  You're on the list!
                </p>
                <p className="text-sm text-gray-400">Thank you for subscribing. Check your inbox for a welcome note.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                    className="w-full px-5 py-3.5 rounded-full text-white outline-none focus:ring-1 text-sm"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: emailError ? '1px solid #ef4444' : '1px solid rgba(212,175,55,0.3)',
                      caretColor: 'var(--gold-primary)',
                    }}
                    aria-label="Email address"
                  />
                  {emailError && <p className="text-red-400 text-xs mt-1.5 text-left pl-2">{emailError}</p>}
                </div>
                <button
                  type="submit"
                  className="gold-btn text-black font-semibold px-7 py-3.5 rounded-full flex items-center gap-2 cursor-pointer border-none shrink-0"
                >
                  <Send size={15} />
                  Subscribe
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime. Your privacy matters to us.</p>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════
          CONTACT / BOOKING SECTION
         ══════════════════════════════════════════════════════ */}
      <SectionWrapper id="contact" className="py-24 px-4" style={{ backgroundColor: 'var(--bg-dark)' } as React.CSSProperties}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold-primary)' }}>
            Let's Work Together
          </span>
          <h2
            className="gold-foil font-bold mt-3 mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Book Your Event
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            From corporate events and private parties to festival stages and concert halls — we bring the show to you. Fill out the form below and our team will be in touch within 24 hours.
          </p>

          {/* Simple booking form */}
          <form
            className="space-y-4 text-left"
            onSubmit={(e) => {
              e.preventDefault()
              // TODO: connect to your booking backend, Formspree, or similar service
              alert('Thanks! We\'ll be in touch shortly.')
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="px-5 py-3.5 rounded-xl text-white outline-none text-sm w-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.25)' }}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="px-5 py-3.5 rounded-xl text-white outline-none text-sm w-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.25)' }}
              />
            </div>
            <input
              type="text"
              placeholder="Event Type (e.g. Corporate Gala, Wedding, Concert)"
              className="px-5 py-3.5 rounded-xl text-white outline-none text-sm w-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.25)' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="Event Date"
                className="px-5 py-3.5 rounded-xl text-white outline-none text-sm w-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.25)', colorScheme: 'dark' }}
              />
              <input
                type="text"
                placeholder="Event Location / City"
                className="px-5 py-3.5 rounded-xl text-white outline-none text-sm w-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.25)' }}
              />
            </div>
            <textarea
              placeholder="Tell us more about your event..."
              rows={4}
              className="px-5 py-3.5 rounded-xl text-white outline-none text-sm w-full resize-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.25)' }}
            />
            <button
              type="submit"
              className="gold-btn text-black font-semibold px-10 py-4 rounded-full w-full cursor-pointer border-none text-base"
            >
              Send Booking Inquiry
            </button>
          </form>
        </div>
      </SectionWrapper>
    </>
  )
}
