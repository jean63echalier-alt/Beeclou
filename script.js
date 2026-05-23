/* ============================================
   BEECLOU — JavaScript Léger
   Interactions minimalistes et fluides
   ============================================ */

// VALIDATION FORMULAIRE
const testeurForm = document.getElementById('testeur-form');

if (testeurForm) {
    testeurForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupérer les données
        const nom = document.querySelector('input[name="nom"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const ville = document.querySelector('select[name="ville"]').value;
        const conditions = document.querySelector('input[name="conditions"]').checked;

        // Validation basique
        if (!nom || !email || !ville) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }

        if (!conditions) {
            alert('Veuillez accepter de recevoir les informations.');
            return;
        }

        // Simuler l'envoi (en prod, utiliser fetch vers backend)
        console.log('Données du formulaire:', {
            nom,
            email,
            ville,
            conditions
        });

        // Message de succès
        showSuccessMessage();

        // Réinitialiser le formulaire
        testeurForm.reset();
    });
}

// VALIDATION EMAIL
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// MESSAGE DE SUCCÈS
function showSuccessMessage() {
    const form = testeurForm;
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        border: 1px solid #c3e6cb;
    `;
    successMsg.innerHTML = '✓ Merci ! Nous vous contacterons très bientôt. 🐝';

    form.insertBefore(successMsg, form.firstChild);

    // Retirer le message après 5 secondes
    setTimeout(() => {
        successMsg.style.opacity = '0';
        successMsg.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => successMsg.remove(), 300);
    }, 5000);
}

// SCROLL VERS LE HAUT
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('scroll-to-top')) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// SMOOTH SCROLL NATIF (navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#survey-form' || href === '#' || href === '#testeurs' ||
            href === '#vision' || href === '#experience') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// LAZY LOADING IMAGES (optionnel, si tu ajoutes des images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ANALYTICS BASIQUE (tracking des clics)
function trackEvent(eventName, eventData = {}) {
    // En production, envoyer vers Google Analytics ou autre service
    console.log('Event:', eventName, eventData);
}

// Tracker clics sur CTA
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('cta_click', {
            text: this.textContent,
            type: this.className
        });
    });
});

// DARK MODE (optionnel - pour plus tard)
function initDarkModeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDark.matches && localStorage.getItem('theme') !== 'light') {
        document.documentElement.style.colorScheme = 'dark';
    }

    prefersDark.addEventListener('change', (e) => {
        document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
    });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
    console.log('Beeclou — Site chargé ✓');
});

// MOBILE MENU (si besoin d'ajouter un burger menu plus tard)
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            this.classList.toggle('active');
        });

        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

// Performance - Log Core Web Vitals (optionnel)
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
            }
        });

        perfObserver.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
    } catch (e) {
        console.log('Performance Observer not available');
    }
}
