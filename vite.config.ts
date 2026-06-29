import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ─────────────────────────────────────────────────────────────────────────────
//  VITE CONFIGURATION — GitHub Pages + Custom Domain
// ─────────────────────────────────────────────────────────────────────────────
//
//  BASE PATH RULES:
//  ┌──────────────────────────────────────────────────────────┐
//  │  Deployment target                │  base value          │
//  ├──────────────────────────────────────────────────────────┤
//  │  Custom domain  (yourdomain.com)  │  '/'   ← current    │
//  │  GitHub user site (user.github.io)│  '/'                 │
//  │  GitHub project (user.github.io/  │                      │
//  │    LauraRobertsEntertainment)     │  '/LauraRobertsentertainment/' │
//  └──────────────────────────────────────────────────────────┘
//
//  If you are deploying to a PROJECT site (not a custom domain and not a
//  user/org root site), change base below to match your repository name:
//    base: '/LauraRobertsEntertainment/',
//
//  If you are using a custom domain (CNAME file in /public), keep base: '/'
// ─────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Set to '/' for custom domain or user/org root site.
  // Change to '/YourRepoName/' for a project site without a custom domain.
  base: '/',

  build: {
    // Output directory (gh-pages deploys from here)
    outDir: 'dist',

    // Generate source maps for easier debugging in production
    sourcemap: false,

    // Rollup options — split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor'
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router')) {
            return 'router'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion'
          }
        },
      },
    },
  },

  // Ensure assets are referenced correctly under the base path
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
})

