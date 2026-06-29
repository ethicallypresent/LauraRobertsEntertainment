import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tv, Share2, Radio, ExternalLink, Clock, Play } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'

// ─────────────────────────────────────────────────────────────────────────────
//  ██████  HOW TO UPDATE LIVE STREAMS  ██████
//
//  Before going live, update the IDs/URLs in the PLATFORM_CONFIG below.
//
//  YOUTUBE LIVE:
//    1. Start your YouTube livestream.
//    2. Copy the video URL, e.g. https://www.youtube.com/watch?v=ABC123XYZ
//    3. Paste only the video ID (the part after "v=") into youtubeVideoId below.
//    4. Set isLive: true when you are actually streaming.
//
//  FACEBOOK LIVE:
//    1. Start your Facebook livestream.
//    2. Copy the share link of the live video.
//    3. Paste the FULL URL (URL-encoded) into facebookEmbedUrl below.
//    4. Set isLive: true when you are actually streaming.
//
//  When the stream ends, set isLive back to false and optionally update
//  the PAST_STREAMS array with the replay link.
// ─────────────────────────────────────────────────────────────────────────────

/** ── UPDATE THIS OBJECT BEFORE EVERY STREAM ── */
const PLATFORM_CONFIG = {
  youtube: {
    // Replace with your live stream video ID (from youtube.com/watch?v=THIS_PART)
    // Example: 'jfKfPfyJRdk' for a lofi stream, 'dQw4w9WgXcQ' for a test
    videoId: 'dQw4w9WgXcQ',

    // Set to true while you are actively streaming
    isLive: false,

    // Label shown on the status pill when live
    liveLabel: 'LIVE on YouTube',

    // Label shown when not live
    nextStreamLabel: 'Next stream: Check our socials!',
  },
  facebook: {
    // Replace with your Facebook live video URL (the full share link)
    // Facebook embed format: https://www.facebook.com/plugins/video.php?href=ENCODED_URL
    // Example href value: https%3A%2F%2Fwww.facebook.com%2FYourPage%2Fvideos%2F123456789
    embedUrl:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=false&width=734',

    isLive: false,
    liveLabel: 'LIVE on Facebook',
    nextStreamLabel: 'Follow us on Facebook!',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAST STREAMS / REPLAYS
//  Add your replay videos here after each live stream.
//  Replace videoId and thumbnail with real values.
// ─────────────────────────────────────────────────────────────────────────────
const PAST_STREAMS = [
  {
    id: 1,
    title: 'Summer Solstice Live Concert 2025',
    date: 'Jun 21, 2025',
    duration: '1h 42m',
    // Replace with the YouTube video ID of the recorded stream
    videoId: 'dQw4w9WgXcQ',
    // Replace with a real thumbnail URL or YouTube's auto-thumb:
    // https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
    thumbnail: 'https://picsum.photos/seed/stream1/640/360',
    views: '12.4K views',
  },
  {
    id: 2,
    title: 'New Year\'s Eve Countdown Special',
    date: 'Dec 31, 2024',
    duration: '3h 05m',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/stream2/640/360',
    views: '31.8K views',
  },
  {
    id: 3,
    title: 'Acoustic Sessions — Vol. 3',
    date: 'Nov 14, 2024',
    duration: '58m',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/stream3/640/360',
    views: '8.9K views',
  },
  {
    id: 4,
    title: 'Studio Rehearsal — Behind the Scenes',
    date: 'Oct 5, 2024',
    duration: '45m',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/stream4/640/360',
    views: '5.2K views',
  },
]

// ─────────────────────────────────────────────────────────────────────────────

type Platform = 'youtube' | 'facebook'

export default function LiveHub() {
  const [activePlatform, setActivePlatform] = useState<Platform>('youtube')

  const ytConfig = PLATFORM_CONFIG.youtube
  const fbConfig = PLATFORM_CONFIG.facebook
  const isAnyLive = ytConfig.isLive || fbConfig.isLive
  const currentIsLive = activePlatform === 'youtube' ? ytConfig.isLive : fbConfig.isLive
  const currentLabel = currentIsLive
    ? (activePlatform === 'youtube' ? ytConfig.liveLabel : fbConfig.liveLabel)
    : (activePlatform === 'youtube' ? ytConfig.nextStreamLabel : fbConfig.nextStreamLabel)

  // Build the embed URL for the active platform
  const embedSrc =
    activePlatform === 'youtube'
      ? `https://www.youtube.com/embed/${ytConfig.videoId}?rel=0&modestbranding=1&autoplay=0`
      : fbConfig.embedUrl

  return (
    <>
      {/* ── Page header ─────────────────────────────────────────── */}
      <div
        className="pt-32 pb-16 px-4 text-center relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-dark)' }}
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Live status pill */}
          <div className="flex justify-center mb-6">
            {isAnyLive ? (
              <div
                className="live-pulse inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest px-5 py-2.5 rounded-full"
                style={{
                  color: '#ef4444',
                  border: '1px solid rgba(239,68,68,0.5)',
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  letterSpacing: '0.18em',
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                LIVE NOW
              </div>
            ) : (
              <div
                className="inline-flex items-center gap-2.5 text-sm font-medium px-5 py-2.5 rounded-full"
                style={{
                  color: 'var(--gold-primary)',
                  border: '1px solid rgba(212,175,55,0.35)',
                  backgroundColor: 'rgba(212,175,55,0.07)',
                }}
              >
                <Radio size={14} />
                Next Stream Coming Soon
              </div>
            )}
          </div>

          <h1
            className="gold-foil font-bold"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Live Hub
          </h1>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto leading-relaxed">
            Watch Laura Roberts Entertainment live on YouTube and Facebook. Switch between platforms below.
          </p>
        </motion.div>
      </div>

      <div className="gold-divider" />

      {/* ── Main player section ──────────────────────────────────── */}
      <SectionWrapper
        className="py-16 px-4"
        style={{ backgroundColor: 'var(--bg-black)' } as React.CSSProperties}
      >
        <div className="max-w-5xl mx-auto">

          {/* Platform selector tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {/* YouTube tab */}
            <button
              onClick={() => setActivePlatform('youtube')}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer border"
              style={{
                backgroundColor: activePlatform === 'youtube' ? 'var(--gold-primary)' : 'transparent',
                color: activePlatform === 'youtube' ? '#000' : 'var(--gold-primary)',
                borderColor: activePlatform === 'youtube' ? 'var(--gold-primary)' : 'rgba(212,175,55,0.4)',
              }}
            >
              <Tv size={18} />
              YouTube Live
              {ytConfig.isLive && (
                <span className="w-2 h-2 rounded-full bg-red-500 live-pulse" />
              )}
            </button>

            {/* Facebook tab */}
            <button
              onClick={() => setActivePlatform('facebook')}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer border"
              style={{
                backgroundColor: activePlatform === 'facebook' ? 'var(--gold-primary)' : 'transparent',
                color: activePlatform === 'facebook' ? '#000' : 'var(--gold-primary)',
                borderColor: activePlatform === 'facebook' ? 'var(--gold-primary)' : 'rgba(212,175,55,0.4)',
              }}
            >
              <Share2 size={18} />
              Facebook Live
              {fbConfig.isLive && (
                <span className="w-2 h-2 rounded-full bg-red-500 live-pulse" />
              )}
            </button>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: currentIsLive ? '#ef4444' : 'var(--gold-primary)' }}
            >
              {currentIsLive ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500 live-pulse" />
                  {currentLabel}
                </>
              ) : (
                <>
                  <Clock size={14} />
                  {currentLabel}
                </>
              )}
            </div>

            {/* Open in new tab */}
            <a
              href={
                activePlatform === 'youtube'
                  ? `https://www.youtube.com/watch?v=${ytConfig.videoId}`
                  : 'https://facebook.com'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <ExternalLink size={13} />
              Open in {activePlatform === 'youtube' ? 'YouTube' : 'Facebook'}
            </a>
          </div>

          {/* ── THE MAIN VIDEO PLAYER ─────────────────────────────
              This iframe updates automatically when you click a tab.
              To go live:
               - Set the correct videoId / embedUrl in PLATFORM_CONFIG above
               - Switch the isLive flag to true
          ──────────────────────────────────────────────────────── */}
          <motion.div
            key={activePlatform}           // re-mounts when platform changes
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(212,175,55,0.25)',
              boxShadow: '0 0 60px rgba(212,175,55,0.06)',
            }}
          >
            <div className="aspect-video bg-black">
              <iframe
                src={embedSrc}
                title={`${activePlatform === 'youtube' ? 'YouTube' : 'Facebook'} Live Player`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>

          {/* Platform info card */}
          <div
            className="mt-6 p-5 rounded-xl flex items-start gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.12)' }}
          >
            {activePlatform === 'youtube' ? (
              <Tv size={22} style={{ color: '#FF0000', flexShrink: 0, marginTop: 2 }} />
            ) : (
              <Share2 size={22} style={{ color: '#1877F2', flexShrink: 0, marginTop: 2 }} />
            )}
            <div>
              <p className="text-sm font-medium text-white">
                {activePlatform === 'youtube' ? 'YouTube Live' : 'Facebook Live'}
              </p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {activePlatform === 'youtube'
                  ? 'Subscribe to our YouTube channel and hit the bell icon to get notified whenever we go live. You can also chat with us and other fans in the live chat!'
                  : 'Follow our Facebook page to get notified when we go live. Join the conversation in the comments and share the stream with your friends!'}
              </p>
              <a
                href={
                  activePlatform === 'youtube'
                    ? 'https://youtube.com' // Replace with your YouTube channel URL
                    : 'https://facebook.com' // Replace with your Facebook page URL
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold mt-3 hover:underline"
                style={{ color: 'var(--gold-primary)' }}
              >
                <ExternalLink size={12} />
                {activePlatform === 'youtube' ? 'Subscribe on YouTube' : 'Follow on Facebook'}
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Past Streams / Replays ───────────────────────────────── */}
      <SectionWrapper
        className="py-16 px-4"
        style={{ backgroundColor: 'var(--bg-dark)' } as React.CSSProperties}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold-primary)' }}>
              Watch Again
            </span>
            <h2
              className="font-bold mt-2 text-white"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Past Streams & Replays
            </h2>
          </div>

          {/* Replay grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAST_STREAMS.map((stream, i) => (
              <motion.a
                key={stream.id}
                href={`https://www.youtube.com/watch?v=${stream.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="glass-card rounded-xl overflow-hidden group block"
                style={{ textDecoration: 'none' }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  {/* Replace with YouTube auto-thumbnail: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg */}
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--gold-primary)' }}
                    >
                      <Play size={18} fill="black" className="text-black ml-0.5" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div
                    className="absolute bottom-2 right-2 text-xs font-medium px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff' }}
                  >
                    {stream.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <div
                    className="text-sm font-medium text-white leading-snug group-hover:text-yellow-400 transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stream.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                    <Clock size={10} />
                    {stream.date}
                    <span>·</span>
                    {stream.views}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Link to full YouTube channel */}
          <div className="text-center mt-10">
            <a
              href="https://youtube.com"  // Replace with your YouTube channel URL
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn text-black font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2"
              style={{ textDecoration: 'none' }}
            >
              <Tv size={17} />
              View All Streams on YouTube
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
