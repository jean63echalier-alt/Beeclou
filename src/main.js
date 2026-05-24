/* ============================================================================
   BEECLOU V1 — Main JavaScript
   Interactions légères, animations, liens configurables
   ============================================================================ */

/* Configuration — MODIFIEZ CES LIENS */
const CONFIG = {
  googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true',
  instagramUrl: 'https://instagram.com/beeclou',
  contactEmail: 'hello@beeclou.com',
  contactForm: 'https://docs.google.com/forms/d/e/YOUR_TESTER_FORM_ID/viewform?embedded=true'
}

/* ============================================================================
   Initialize on DOM ready
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  setupButtonEvents()
  setupSmoothScroll()
  observeLazyImages()
})

/* ============================================================================
   Button Events Setup
   Relie tous les boutons CTA aux URLs configurables
   ============================================================================ */

function setupButtonEvents() {
  // Hero section buttons
  const ctaSurvey = document.getElementById('cta-survey')
  const ctaTester = document.getElementById('cta-tester')
  const ctaInstagram = document.getElementById('cta-instagram')

  // Participation section buttons
  const partSurvey = document.getElementById('part-survey')
  const partTester = document.getElementById('part-tester')
  const partInstagram = document.getElementById('part-instagram')

  // Footer links
  const footerInstagram = document.getElementById('footer-instagram')
  const footerContact = document.getElementById('footer-contact')

  // Sondage (Google Form)
  if (ctaSurvey) {
    ctaSurvey.addEventListener('click', () => {
      openLink(CONFIG.googleFormUrl)
    })
  }

  if (partSurvey) {
    partSurvey.addEventListener('click', () => {
      openLink(CONFIG.googleFormUrl)
    })
  }

  // Devenir testeur (Google Form)
  if (ctaTester) {
    ctaTester.addEventListener('click', () => {
      openLink(CONFIG.contactForm)
    })
  }

  if (partTester) {
    partTester.addEventListener('click', () => {
      openLink(CONFIG.contactForm)
    })
  }

  // Instagram
  if (ctaInstagram) {
    ctaInstagram.addEventListener('click', () => {
      openLink(CONFIG.instagramUrl)
    })
  }

  if (partInstagram) {
    partInstagram.addEventListener('click', () => {
      openLink(CONFIG.instagramUrl)
    })
  }

  if (footerInstagram) {
    footerInstagram.href = CONFIG.instagramUrl
    footerInstagram.target = '_blank'
  }

  if (footerContact) {
    footerContact.href = `mailto:${CONFIG.contactEmail}`
  }
}

/* ============================================================================
   Helper: Open external links safely
   ============================================================================ */

function openLink(url) {
  if (!url || url.startsWith('https://docs.google.com/forms/d/e/YOUR')) {
    console.warn('⚠️  Veuillez configurer les URLs dans src/main.js')
    alert('Veuillez configurer les URLs des formulaires dans le code.')
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

/* ============================================================================
   Smooth Scroll Behavior
   Navigation fluide vers les sections
   ============================================================================ */

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href')
      if (href === '#') return

      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}

/* ============================================================================
   Lazy Loading Images
   Améliore la performance des images responsives
   ============================================================================ */

function observeLazyImages() {
  if (!('IntersectionObserver' in window)) {
    // Fallback pour les anciens navigateurs
    loadAllImages()
    return
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        loadImage(img)
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img)
  })
}

function loadImage(img) {
  const src = img.dataset.src
  if (src) {
    img.src = src
    img.removeAttribute('loading')
  }
}

function loadAllImages() {
  document.querySelectorAll('img[loading="lazy"]').forEach(loadImage)
}

/* ============================================================================
   Section In-View Animation
   Animations subtiles quand les sections deviennent visibles
   ============================================================================ */

function setupSectionObserver() {
  if (!('IntersectionObserver' in window)) return

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      }
    })
  }, {
    threshold: 0.1
  })

  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section)
  })
}

// Initialize section observer
document.addEventListener('DOMContentLoaded', setupSectionObserver)

/* ============================================================================
   Performance: Reduce layout thrashing
   ============================================================================ */

window.addEventListener('load', () => {
  // Optimizations après le chargement
  document.body.classList.add('loaded')
})

/* ============================================================================
   Accessibility: Keyboard Navigation
   ============================================================================ */

document.addEventListener('keydown', (e) => {
  // ESC: Ferme les dropdowns (si besoin)
  if (e.key === 'Escape') {
    // Logique future si nécessaire
  }
})

/* ============================================================================
   Analytics: Track basic events (optionnel)
   À connecter à Vercel Analytics ou Google Analytics
   ============================================================================ */

function trackEvent(eventName, eventData = {}) {
  // Exemple : envoyer à Google Analytics
  // window.gtag('event', eventName, eventData);

  // Pour maintenant, log en console en développement
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Event: ${eventName}`, eventData)
  }
}

// Track button clicks
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    trackEvent('button_click', {
      button_text: e.target.textContent,
      button_class: e.target.className
    })
  }
})
