// ─────────────────────────────────────────────────────────────────────────────
//  App.tsx — Root component with routing
//
//  WHY HashRouter FOR GITHUB PAGES?
//  GitHub Pages is a static file host. When a user visits a deep URL like
//  https://yourdomain.com/live directly (or refreshes the page), GitHub Pages
//  looks for a file at /live/index.html — which doesn't exist — and returns
//  a 404.
//
//  HashRouter uses the URL hash (#) for routing instead:
//    https://yourdomain.com/#/        → Home page
//    https://yourdomain.com/#/live    → Live Hub page
//
//  The hash portion is never sent to the server, so GitHub Pages always
//  serves the root index.html and React Router handles the rest. No 404s.
//
//  SWITCHING BACK TO BrowserRouter:
//  If you ever move to a host that supports server-side redirects (Netlify,
//  Vercel, a custom server), you can swap HashRouter back to BrowserRouter:
//    1. Replace `import { HashRouter, ... }` with `import { BrowserRouter, ... }`
//    2. Replace `<HashRouter>` with `<BrowserRouter>`
//    3. Remove the hash (#) from any hardcoded links
//    4. Add a redirect rule on your host (e.g. Netlify _redirects: /* /index.html 200)
// ─────────────────────────────────────────────────────────────────────────────

import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import LiveHub from './pages/LiveHub'

// Smooth fade + slight slide transition between pages
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/live"
          element={
            <PageTransition>
              <LiveHub />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    // HashRouter keeps GitHub Pages happy — see the comment at the top of this file
    <HashRouter>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-black)' }}>
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
