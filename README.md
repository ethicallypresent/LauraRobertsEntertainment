# Laura Roberts Entertainment — Website

A production-ready website for Laura Roberts Entertainment, built with Vite + React 18 + TypeScript, Tailwind CSS, React Router v6, and Framer Motion.

---

## Quick Start

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build → ./dist
npm run preview    # preview the production build locally
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Sticky navbar with gold logo, links, mobile menu
│   ├── Footer.tsx          # Footer with links, social icons, contact info
│   └── SectionWrapper.tsx  # Scroll-triggered fade-up animation wrapper
├── pages/
│   ├── Home.tsx            # Full homepage (Hero → About → Music → Live → Shows → Gallery → Newsletter → Contact)
│   └── LiveHub.tsx         # Live streaming hub (/live)
├── App.tsx                 # Router + page transitions
├── main.tsx                # React entry point
└── index.css               # Tailwind + gold foil CSS effects + CSS variables
index.html                  # HTML shell (Google Fonts loaded here)
vite.config.ts              # Vite + Tailwind plugin config
```

---

## How to Update Live Streams

Open `src/pages/LiveHub.tsx` and find the `PLATFORM_CONFIG` object near the top of the file:

```ts
const PLATFORM_CONFIG = {
  youtube: {
    videoId: 'YOUR_VIDEO_ID',   // ← paste the YouTube video ID here
    isLive: false,              // ← set to true while streaming
    ...
  },
  facebook: {
    embedUrl: '...',            // ← paste your Facebook embed URL here
    isLive: false,              // ← set to true while streaming
    ...
  },
}
```

### YouTube Live
1. Start your YouTube live stream.
2. Copy the video URL, e.g. `https://www.youtube.com/watch?v=ABC123`
3. Paste only the video ID (`ABC123`) into `youtube.videoId`.
4. Set `youtube.isLive: true`.
5. Save the file and deploy.

### Facebook Live
1. Start your Facebook live video.
2. Click **Share** and copy the video link.
3. Paste the full URL (URL-encoded) into `facebook.embedUrl`.
4. Set `facebook.isLive: true`.
5. Save and deploy.

### After the stream ends
- Set `isLive` back to `false`.
- Add the recording to the `PAST_STREAMS` array so fans can watch the replay.

---

## How to Add Real Images

All placeholder images use [picsum.photos](https://picsum.photos). To replace them:

| File | What to replace | Where |
|------|----------------|-------|
| `Home.tsx` | Hero background | `style={{ backgroundImage: "url('...')" }}` in the Hero section |
| `Home.tsx` | About photo | `<img src="..." alt="Laura Roberts..." />` in the About section |
| `Home.tsx` | Track cover art | `cover:` field in the `TRACKS` array |
| `Home.tsx` | Gallery photos | `src:` fields in the `GALLERY_IMAGES` array |
| `LiveHub.tsx` | Replay thumbnails | `thumbnail:` fields in the `PAST_STREAMS` array |

For YouTube replay thumbnails, you can use the auto-generated thumbnail:
```
https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
```

---

## Color Customization

All brand colors are defined as CSS custom properties in `src/index.css`:

```css
:root {
  --gold-primary:  #D4AF37;
  --gold-light:    #E8C547;
  --gold-dark:     #C9A227;
  --gold-pale:     #F5E27A;
  --gold-deep:     #A8852A;
  --bg-black:      #0a0a0a;
  --bg-dark:       #111111;
  /* ... */
}
```

Change these values to re-theme the entire site instantly.

---

## Replacing Placeholder Content

| What | Where in code |
|------|--------------|
| Band bio | `Home.tsx` — About section |
| Show dates & venues | `SHOWS` array in `Home.tsx` |
| Track titles & YouTube IDs | `TRACKS` array in `Home.tsx` |
| Contact email & phone | `Footer.tsx` |
| Social media URLs | `Navbar.tsx` + `Footer.tsx` |
| Spotify link | Music section CTA in `Home.tsx` |
| YouTube channel URL | `LiveHub.tsx` → "View All Streams" link |
| Facebook page URL | `LiveHub.tsx` → "Follow on Facebook" link |

---

## Deployment

### Netlify (recommended)
```bash
npm run build
# Drag the ./dist folder into Netlify drop zone
# Or connect your GitHub repo and set build command to: npm run build
```

### Vercel
```bash
npx vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push ./dist to the gh-pages branch
```

> **Note:** Because this app uses React Router, configure your host to redirect all requests to `index.html`. On Netlify, add a `public/_redirects` file with `/* /index.html 200`.

---

## Tech Stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [React Router v6](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/) — page transitions + scroll animations
- [lucide-react](https://lucide.dev/) — icons
- Google Fonts: Playfair Display + Inter
