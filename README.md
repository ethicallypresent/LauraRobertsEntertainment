# Laura Roberts Entertainment — Website

A production-ready website for Laura Roberts Entertainment, built with **Vite + React 19 + TypeScript**, Tailwind CSS, React Router v6, and Framer Motion.

---

## Quick Start (Local Development)

```bash
npm install        # install all dependencies
npm run dev        # start development server → http://localhost:5173
npm run build      # build for production → ./dist
npm run preview    # preview the production build locally
```

---

## Project Structure

```
├── public/
│   └── CNAME                         # Custom domain file (edit before deploying)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Sticky navbar — logo, links, mobile menu
│   │   ├── Footer.tsx                # Footer — links, social icons, contact info
│   │   └── SectionWrapper.tsx        # Scroll-triggered fade-up animation wrapper
│   ├── pages/
│   │   ├── Home.tsx                  # Homepage — all sections
│   │   └── LiveHub.tsx               # Live streaming hub (/live → /#/live)
│   ├── App.tsx                       # Router (HashRouter) + page transitions
│   ├── main.tsx                      # React entry point
│   └── index.css                     # Tailwind + gold foil CSS + CSS variables
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Actions — auto-deploy on push to main
├── index.html                        # HTML shell (loads Google Fonts)
├── package.json                      # Scripts incl. predeploy / deploy
└── vite.config.ts                    # Vite config with base path + chunk splitting
```

---

## Deploying to GitHub Pages

There are **two ways** to deploy — pick whichever suits you:

### Option A — One Command (Manual)

```bash
npm run deploy
```

That's it. `predeploy` runs the build automatically, then `gh-pages` pushes
`./dist` to the `gh-pages` branch of your repository.

**First-time setup:**
1. Make sure the repo is pushed to GitHub.
2. Go to **Settings → Pages** in your GitHub repo.
3. Set **Source** → `Deploy from a branch` → Branch: `gh-pages` / folder: `/ (root)`.
4. Run `npm run deploy`.
5. Your site will be live at `https://USERNAME.github.io/LauraRobertsEntertainment`
   (or your custom domain — see below).

---

### Option B — Automatic via GitHub Actions (Recommended)

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and
deploys the site automatically — no local deploy command needed.

**First-time setup:**
1. Go to **Settings → Pages** in your GitHub repo.
2. Set **Source** → `GitHub Actions`.
3. Push a commit to `main`. The workflow runs and deploys automatically.
4. Check the **Actions** tab to watch the progress.

---

## Custom Domain Setup

### Step 1 — Edit `public/CNAME`

Open `public/CNAME` and replace `yourdomain.com` with your actual domain:

```
laurarobertsentertainment.com
```

The CNAME file is copied into `./dist` during build, so GitHub Pages will read
it automatically on every deploy.

### Step 2 — Edit `package.json`

Update the `"homepage"` field to your real domain:

```json
"homepage": "https://laurarobertsentertainment.com"
```

### Step 3 — Edit `vite.config.ts`

Keep `base: '/'` (already set) for a custom domain or user/org root site.

> **Project site without a custom domain?**  
> If your site lives at `https://USERNAME.github.io/LauraRobertsEntertainment/`,
> change `base` to `'/LauraRobertsEntertainment/'`.

### Step 4 — Configure DNS records

Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add:

| Type  | Name | Value                    | Purpose             |
|-------|------|--------------------------|---------------------|
| A     | @    | `185.199.108.153`        | GitHub Pages IP     |
| A     | @    | `185.199.109.153`        | GitHub Pages IP     |
| A     | @    | `185.199.110.153`        | GitHub Pages IP     |
| A     | @    | `185.199.111.153`        | GitHub Pages IP     |
| CNAME | www  | `USERNAME.github.io`     | www redirect        |

> **Cloudflare users:** Set the DNS records to **DNS only** (grey cloud), not
> proxied, to avoid conflicts with GitHub Pages SSL certificates.

### Step 5 — Enable HTTPS in GitHub

1. Go to **Settings → Pages** in your GitHub repo.
2. Under **Custom domain**, enter your domain and click **Save**.
3. Wait a few minutes for DNS propagation, then tick **Enforce HTTPS**.

---

## Routing Notes (HashRouter)

This site uses **HashRouter** so GitHub Pages never returns a 404 for deep links.
URLs look like:

```
https://yourdomain.com/#/        → Home page
https://yourdomain.com/#/live    → Live Hub
```

### Switching to BrowserRouter (non-GitHub-Pages hosts)

If you move to Netlify, Vercel, or a server that handles redirects:

1. In `src/App.tsx`, change `HashRouter` → `BrowserRouter`.
2. Remove the `#` from any hardcoded anchor links if you add them.
3. Add a redirect rule on your host so all paths serve `index.html`:
   - **Netlify** — create `public/_redirects` with: `/* /index.html 200`
   - **Vercel** — create `vercel.json` with a rewrite rule.

---

## How to Update Live Streams

Open `src/pages/LiveHub.tsx` and find `PLATFORM_CONFIG` near the top:

```ts
const PLATFORM_CONFIG = {
  youtube: {
    videoId: 'YOUR_VIDEO_ID',   // ← paste the YouTube video ID here
    isLive: false,              // ← set to true while you are streaming
    ...
  },
  facebook: {
    embedUrl: '...',            // ← paste your Facebook embed URL here
    isLive: false,              // ← set to true while you are streaming
    ...
  },
}
```

### YouTube Live
1. Start your YouTube live stream.
2. Copy the video URL, e.g. `https://www.youtube.com/watch?v=ABC123XYZ`
3. Paste only the video ID (`ABC123XYZ`) into `youtube.videoId`.
4. Set `youtube.isLive: true`.
5. **Save → deploy:** `npm run deploy`

### Facebook Live
1. Start your Facebook live video.
2. Click **Share** and copy the video link.
3. URL-encode the link and paste it into `facebook.embedUrl`.
4. Set `facebook.isLive: true`.
5. **Save → deploy:** `npm run deploy`

### After the stream ends
- Set `isLive` back to `false`.
- Add the recording to the `PAST_STREAMS` array so fans can watch the replay.
- **Deploy again:** `npm run deploy`

---

## How to Add Real Images

All placeholder images come from [picsum.photos](https://picsum.photos).
Replace them with your real photos:

| Section           | File          | What to change |
|-------------------|---------------|----------------|
| Hero background   | `Home.tsx`    | `backgroundImage: "url('...')"` in the Hero section |
| About photo       | `Home.tsx`    | `<img src="..."` in the About section |
| Track cover art   | `Home.tsx`    | `cover:` fields in the `TRACKS` array |
| Gallery photos    | `Home.tsx`    | `src:` fields in the `GALLERY_IMAGES` array |
| Replay thumbnails | `LiveHub.tsx` | `thumbnail:` fields in the `PAST_STREAMS` array |

> **Tip:** For YouTube replay thumbnails use the auto-generated URL:  
> `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`

---

## Color Customization

All colors are CSS custom properties in `src/index.css`:

```css
:root {
  --gold-primary:  #D4AF37;   /* main gold */
  --gold-light:    #E8C547;
  --gold-dark:     #C9A227;
  --gold-pale:     #F5E27A;
  --gold-deep:     #A8852A;
  --bg-black:      #0a0a0a;   /* page background */
  --bg-dark:       #111111;   /* alternate section background */
}
```

Changing these values re-themes the entire site instantly.

---

## Replacing Other Placeholder Content

| What | Where |
|------|-------|
| Band bio | `Home.tsx` — About section |
| Show dates & venues | `SHOWS` array in `Home.tsx` |
| Track titles & YouTube IDs | `TRACKS` array in `Home.tsx` |
| Contact email & phone | `Footer.tsx` |
| Social media URLs | `Navbar.tsx` and `Footer.tsx` |
| Spotify link | Music section CTA in `Home.tsx` |
| YouTube channel URL | "View All Streams" link in `LiveHub.tsx` |
| Facebook page URL | "Follow on Facebook" link in `LiveHub.tsx` |

---

## Common Issues & Fixes

| Problem | Cause | Fix |
|---------|-------|-----|
| **Blank page after deploy** | Wrong `base` in `vite.config.ts` | Use `base: '/'` for custom domain; `base: '/RepoName/'` for project site |
| **404 on page refresh** | Using BrowserRouter on GitHub Pages | Already fixed — this repo uses HashRouter |
| **Old version showing** | Browser cache | Hard refresh: `Ctrl+Shift+R` / `Cmd+Shift+R` |
| **CNAME disappears** | Not in `public/` folder | Keep `CNAME` in `public/` — Vite copies it to `dist/` automatically |
| **Custom domain not working** | DNS not propagated | Wait 24–48 hours; verify with `dig yourdomain.com` |
| **HTTPS not available** | Certificate pending | Wait ~15 min after setting custom domain in GitHub Settings → Pages |
| **Live stream not showing** | Wrong video ID | Check `PLATFORM_CONFIG.youtube.videoId` in `LiveHub.tsx` |

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| [Vite](https://vitejs.dev/) | 8.x | Build tool |
| [React](https://react.dev/) | 19.x | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 6.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first styling |
| [React Router](https://reactrouter.com/) | 7.x | Client-side routing (HashRouter) |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animations & transitions |
| [lucide-react](https://lucide.dev/) | 1.x | Icons |
| [gh-pages](https://github.com/tschaub/gh-pages) | 6.x | Deploy to GitHub Pages |
