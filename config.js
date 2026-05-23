/* ============================================
   BEECLOU — Configuration Centralisée
   Modifier les paramètres ici
   ============================================ */

const CONFIG = {
    // LIENS & RÉSEAUX
    social: {
        instagram: 'https://instagram.com',  // À personnaliser
        email: 'hello@beeclou.com',          // À personnaliser
        phone: '+33 1 23 45 67 89'           // Optionnel
    },

    // FORMULAIRE DE CONTACT
    form: {
        // À configurer avec Zapier, Formspree, ou autre service
        submitUrl: 'https://formspree.io/f/YOUR_FORM_ID',  // Remplacer par ton ID
        successMessage: 'Merci ! Nous vous contacterons très bientôt. 🐝',
        errorMessage: 'Une erreur est survenue. Réessaye ou contacte-nous directement.'
    },

    // GOOGLE ANALYTICS (optionnel)
    analytics: {
        enabled: false,
        gtag: 'G-XXXXXXX'  // À remplacer par ton ID Google Analytics
    },

    // GOOGLE FORM SONDAGE
    googleForm: {
        enabled: false,
        // Récupérer l'ID de ton Google Form
        // Partage → Obtenir le code d'intégration
        // URL: https://docs.google.com/forms/d/e/YOUR_ID/viewform?embedded=true
        embedUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true'
    },

    // VILLES DISPONIBLES POUR LE FORMULAIRE
    cities: [
        { value: 'paris', label: 'Paris' },
        { value: 'lyon', label: 'Lyon' },
        { value: 'marseille', label: 'Marseille' },
        { value: 'toulouse', label: 'Toulouse' },
        { value: 'bordeaux', label: 'Bordeaux' },
        { value: 'nice', label: 'Nice' },
        { value: 'nantes', label: 'Nantes' },
        { value: 'lille', label: 'Lille' },
        { value: 'strasbourg', label: 'Strasbourg' },
        { value: 'autre', label: 'Autre' }
    ],

    // MESSAGES & TEXTES
    messages: {
        welcomeTitle: 'Des déplacements urbains plus libres, plus fluides et sans stress.',
        welcomeSubtitle: 'Beeclou imagine une mobilité quotidienne plus humaine, pratique et agréable, pensée pour les trajets réels de la vie urbaine.',

        problemTitle: 'La ville fatigue.',
        problemText: 'Bouchons, bruit, retards, transports saturés, stress et perte de temps transforment trop souvent les trajets quotidiens en contrainte.',

        visionTitle: 'Repenser le voyage urbain quotidien.',
        visionText: 'Beeclou veut aider chacun à retrouver de la liberté, du calme et du plaisir dans ses déplacements.',

        experienceTitle: 'Une mobilité simple, utile et rassurante.',
        experienceText: 'Vélo pratique, top case sécurisé, rangement pour les affaires du quotidien, trajets plus fluides et sensation de liberté.',

        approachTitle: 'Construire avec les vrais usages.',
        approachText: 'Beeclou se construit à partir d\'observations terrain, de retours utilisateurs et d\'expériences réelles de cyclistes urbains.',

        testerTitle: 'Participez aux premiers tests.',
        testerText: 'Vous utilisez le vélo en ville ou souhaitez vous y mettre ? Aidez-nous à imaginer une mobilité plus agréable.',

        footerText: 'Mobilité urbaine plus libre, plus fluide, plus humaine.'
    },

    // STYLE & PALETTE
    colors: {
        primary: '#F4C430',      // Jaune Beeclou
        secondary: '#6b9b84',    // Vert Sauge
        background: '#faf9f7',   // Off-white
        dark: '#1a1a1a',         // Soft black
        muted: '#6b6b6b'         // Urban gray
    },

    // MÉTADONNÉES
    site: {
        name: 'Beeclou',
        tagline: 'Mobilité urbaine plus libre, plus fluide, plus humaine',
        domain: 'beeclou.com',   // À personnaliser
        language: 'fr'
    }
};

// À ajouter en production:
// - Google Analytics tracking
// - Form submission handling
// - Error logging service

export default CONFIG;
