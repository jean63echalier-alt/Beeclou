# 🏗️ Architecture Beeclou V1

Documentation technique du site Beeclou — structure, dépendances, et patterns.

## 📦 Stack

| Component | Tech | Version | Purpose |
|-----------|------|---------|---------|
| **Build** | Vite | ^5.0.0 | Build system ultra-rapide |
| **Runtime** | Node.js | 16+ | Environnement d'exécution |
| **Markup** | HTML5 | - | Structure sémantique |
| **Styling** | CSS3 | - | Design responsive |
| **Interactions** | ES6+ JS | - | Comportements légers |
| **Minifier** | Terser | ^5.31 | Minification JS |
| **Package Manager** | npm | 10+ | Gestion des dépendances |

## 🎯 Design Philosophy

### Principes

1. **Zero Dependencies** (sauf Vite)
   - Pas de React, Vue, Angular
   - Vanilla HTML/CSS/JS
   - Moins de 6 KB après gzip

2. **Mobile-First**
   - Conception desktop secondaire
   - Responsive from 320px+

3. **Performance First**
   - Critical rendering path optimisé
   - Lazy loading images
   - CSS/JS minifiés et bundlés

4. **Accessibility**
   - Semantic HTML
   - WCAG 2.1 AA compliant
   - Keyboard navigation

5. **SEO Friendly**
   - Meta tags
   - Open Graph
   - Structured data ready

---

## 📁 Project Structure

```
Beeclou/
├── index.html              # HTML principal (point d'entrée)
├── package.json            # npm configuration
├── vite.config.js          # Configuration Vite
├── vercel.json             # Configuration Vercel deployment
│
├── src/
│   ├── main.js             # Point d'entrée JS
│   │   ├── CONFIG (liens)
│   │   ├── Events setup
│   │   ├── Smooth scroll
│   │   └── Lazy loading
│   │
│   └── styles.css          # Styles complets
│       ├── Reset & base
│       ├── Component styles
│       ├── Sections
│       ├── Responsive (mobile-first)
│       └── Utilities
│
├── public/
│   ├── favicon.svg         # Favicon
│   └── assets/
│       ├── images/         # Images compressées
│       └── fonts/          # Custom fonts (optionnel)
│
├── dist/                   # Build output (généré)
│   ├── index.html
│   ├── favicon.svg
│   └── assets/
│       ├── *.css (bundled)
│       └── *.js (bundled)
│
├── .editorconfig           # Code style consistency
├── .env.example            # Env vars template
├── .gitignore              # Git ignore rules
│
└── Documentation/
    ├── README.md           # Overview & getting started
    ├── QUICKSTART.md       # 5-min setup guide
    ├── DEPLOYMENT.md       # Vercel deployment details
    ├── CUSTOMIZATION.md    # How to personalize
    ├── ARCHITECTURE.md     # This file
    └── CONTRIBUTING.md     # (Future)
```

---

## 🔄 Data Flow

### Build Pipeline

```
src/main.js
src/styles.css
index.html
   ↓ (Vite build)
   ↓
dist/assets/index-xxxxx.js   (hashed)
dist/assets/index-xxxxx.css  (hashed)
dist/index.html              (references above)
   ↓ (Push to GitHub)
   ↓ (GitHub webhook)
   ↓ (Vercel webhook)
Vercel rebuild
   ↓ (Deploy)
   ↓
Live on https://beeclou.fr
```

### Runtime Flow (Browser)

```
1. Load index.html
   ↓
2. Load favicon.svg
   ↓
3. Parse HTML
   ↓
4. Load CSS (render blocking)
   ↓
5. Render page (PAINT)
   ↓
6. Load JS (defer)
   ↓
7. Execute main.js
   - Setup event listeners
   - Setup intersection observers
   ↓
8. User interactions
   - Click buttons → Opens links
   - Smooth scroll
   - Lazy load images
```

---

## 🧩 Component Breakdown

### HTML Structure

```html
index.html
├── Meta tags (SEO, OG)
├── Link to CSS
├── Body
│   ├── <section id="hero">
│   ├── <section id="fatigue">
│   ├── <section id="real-issue">
│   ├── <section id="bike-friction">
│   ├── <section id="vision">
│   ├── <section id="experience">
│   ├── <section id="collective">
│   ├── <section id="keyline">
│   ├── <section id="field-approach">
│   ├── <section id="participation">
│   └── <footer>
└── Script (type=module src=/src/main.js)
```

**No build-time rendering**, pure static HTML.

### CSS Architecture

**Variables** (`:root`)
```css
Colors, spacing, fonts, transitions
```

**Reset & Base**
```css
* margin/padding reset
html scroll-behavior
body fonts/colors
```

**Components**
```css
.btn (primary, secondary, tertiary)
Sections (hero, fatigue, etc.)
Responsive grids
```

**Utilities**
```css
.container, .large-text
Focus visible, lazy load styles
@media queries
```

**Pattern**: BEM-inspired but light
```
.section-name { }
.section-item { }
.section-item:hover { }
```

### JavaScript Module

**Entry point**: `src/main.js` (ES6 module)

**Exports**: None (side effects only)

**Functions**:
```
setupButtonEvents()
  → Connect CTA buttons to CONFIG URLs
  
setupSmoothScroll()
  → Add smooth scroll to all #hash links
  
observeLazyImages()
  → Lazy load images with IntersectionObserver
  
setupSectionObserver()
  → In-view animations (future)
  
trackEvent()
  → Analytics tracking (optional)
```

**No dependencies**, just vanilla JS APIs:
- Event listeners
- IntersectionObserver
- fetch (if needed)

---

## 🚀 Build & Deployment

### Local Development

```bash
npm run dev
  → Vite dev server on http://localhost:5173
  → Hot module replacement
  → Source maps
  → No minification
```

### Production Build

```bash
npm run build
  → Vite bundle
  → Minify CSS/JS
  → Hash assets
  → Output to dist/
```

**Build output:**

```
dist/
├── index.html                    8.3 KB
├── favicon.svg                   0.2 KB
└── assets/
    ├── index-Bw39IrnQ.css        9.6 KB (CSS)
    └── index-BjMpCfpF.js         3.1 KB (JS)
```

**Gzipped total**: ~5.6 KB ✅

### Preview Build

```bash
npm run preview
  → Serve dist/ locally
  → See exactly what gets deployed
```

### Vercel Deployment

**Auto-detected configuration:**

```
Framework: Vite
Build Command: npm run build
Output Directory: dist/
Install Command: npm install
```

**Environment Variables:**
```
VITE_GOOGLE_FORM_ID=...
VITE_INSTAGRAM_URL=...
VITE_CONTACT_EMAIL=...
```

**Deployment flow:**
```
Git push
  ↓ (GitHub webhook)
Vercel receives push
  ↓
npm install
npm run build
  ↓
Upload dist/ to CDN
  ↓
Live on https://beeclou.fr
```

---

## 🎨 Design System

### Color Palette

```css
--color-bg: #f5f3f0             /* Beige clair (fond) */
--color-bg-light: #fefdfb       /* Blanc cassé */
--color-text-dark: #2a2520      /* Noir doux */
--color-text-gray: #8b8680      /* Gris urbain */
--color-accent-beige: #e8dfd8   /* Beige accent */
--color-accent-green: #a8b8a0   /* Vert sauge */
--color-accent-yellow: #f4c430  /* Jaune Beeclou */
--color-border: #d9d1c8         /* Bordure douce */
--color-white: #ffffff          /* Blanc pur */
```

### Spacing Scale

```
--spacing-xs: 0.5rem    (8px)
--spacing-sm: 1rem      (16px)
--spacing-md: 1.5rem    (24px)
--spacing-lg: 2rem      (32px)
--spacing-xl: 3rem      (48px)
--spacing-2xl: 4rem     (64px)
```

### Typography

```
Font: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
     (System fonts - ultra rapide)

H1: clamp(2rem, 8vw, 4rem)
H2: clamp(1.75rem, 6vw, 3.5rem)
H3: clamp(1.25rem, 4vw, 2rem)

Body: 1.6 line-height
```

### Breakpoints

```css
Mobile:     < 480px
Tablet:     480px - 768px
Desktop:    > 768px
```

---

## 🔐 Security Considerations

### What's NOT in this project

- ❌ User authentication
- ❌ Database
- ❌ Form submissions (server-side)
- ❌ API keys in code
- ❌ Third-party scripts (except Google Analytics)

### Security practices

- ✅ No inline scripts
- ✅ Content Security Policy ready
- ✅ HTTPS enforced (Vercel)
- ✅ No sensitive data in HTML
- ✅ Input validation (form submission)

### Environment Variables

```
.env.local          (ignored - local secrets)
.env.example        (template - safe to commit)
VITE_* prefix       (safe for client)
```

Only public URLs in `VITE_` variables.

---

## 📈 Performance Checklist

### Critical Rendering Path

- [x] HTML minimal and semantic
- [x] CSS loads early (before JS)
- [x] JS deferred (`type="module"`)
- [x] Images lazy loaded
- [x] No render-blocking scripts

### Metrics

```
First Contentful Paint (FCP): < 1.2s
Largest Contentful Paint (LCP): < 2.5s
Cumulative Layout Shift (CLS): < 0.1
Time to Interactive (TTI): < 3s
```

**Target Lighthouse Score: 95+**

### Optimizations

```
- CSS minified by Vite
- JS minified & tree-shaken
- Assets hash-named (cache-busting)
- Gzip compression (Vercel)
- CDN delivery (Vercel edge)
```

---

## 🧪 Testing

### Manual Testing

```bash
# Local development
npm run dev
# Open http://localhost:5173
# Test on mobile: DevTools → Responsive mode

# Production build
npm run build
npm run preview
# Test dist/ locally
```

### Automated Checks

**Browser Dev Tools:**
```
Lighthouse (Performance, Accessibility, SEO)
Network tab (assets, size, waterfall)
Coverage tab (unused CSS/JS)
```

**Performance tools:**
```
https://pagespeed.web.dev
https://lighthouse.codepoint.dev
```

### Monitoring

**Vercel Analytics:**
```
Core Web Vitals
Traffic patterns
Performance trends
```

---

## 🔄 Maintenance

### Regular Tasks

```
Weekly:
  - Monitor Lighthouse scores
  - Check for broken links
  - Review analytics

Monthly:
  - Update npm dependencies (npm update)
  - Verify Google Forms still work
  - Test forms on mobile
  
Quarterly:
  - Review design trends
  - Update content
  - Audit performance
```

### Dependency Updates

```bash
npm outdated              # See what's outdated
npm update               # Update safely
npm audit                # Check vulnerabilities
npm audit fix            # Auto-fix vulnerabilities
```

**Keep Vite & Terser updated** (but not too frequently).

---

## 🚨 Troubleshooting

### Build fails locally

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Build succeeds but site is broken

```bash
npm run preview
# Check dist/ in browser
# Look for 404 errors in DevTools
```

### Vercel deployment fails

```
Check:
- vercel.json exists
- dist/ folder is not in .gitignore
- Environment variables configured
- Build command matches package.json
```

### Performance issues

```bash
# Analyze bundle
npm run build
# Check dist/assets/ sizes
# Use Lighthouse → Coverage tab
```

---

## 📚 Further Reading

### Official Docs

- [Vite Docs](https://vitejs.dev)
- [Vercel Docs](https://vercel.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)

### Articles

- "Mobile-First Responsive Design"
- "CSS Custom Properties at Scale"
- "Web Performance 101"

### Tools

- Chrome DevTools
- Lighthouse
- WebPageTest
- PageSpeed Insights

---

## 🤝 Contributing

Future guidelines for contributors:

```
1. Fork or clone
2. Create feature branch
3. Follow .editorconfig
4. Test locally
5. Commit with clear message
6. Push and create PR
```

See `CONTRIBUTING.md` (coming soon).

---

## 📝 License

Propriétaire Beeclou. Tous droits réservés.

---

**Made with 🐝 for better urban mobility.**

*Last updated: May 2026*
