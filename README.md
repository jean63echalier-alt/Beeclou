# 🐝 Beeclou V1 — Mobilité Urbaine Plus Libre, Plus Fluide, Plus Agréable

**Des déplacements urbains sans surcharge mentale.**

Site statique ultra-moderne pour Beeclou, construit avec Vite. Déploiement simple sur GitHub + Vercel. Stack minimaliste : HTML/CSS/JavaScript vanilla, aucun back-end.

## ✨ Caractéristiques

- **Vite** : Build system moderne et rapide
- **Mobile-First** : Design optimisé pour les petits écrans
- **Vanilla Stack** : HTML/CSS/JavaScript pur — zéro dépendances lourdes
- **Ultra Rapide** : ~50 KB (après build + gzip)
- **Design Premium** : Inspiré Apple × Cowboy × Citymapper × Notion
- **Déploiement Automatique** : Git push → Vercel déploie automatiquement
- **100% Statique** : Pas de back-end, pas de base de données

## 🎨 Design & Couleurs

**Palette:**
- Off-white: `#f5f3f0` (fond)
- Noir doux: `#2a2520` (texte)
- Gris urbain: `#8b8680` (texte secondaire)
- Vert sauge: `#a8b8a0` (accent)
- Beige clair: `#e8dfd8` (zones)
- **Jaune Beeclou**: `#f4c430` (highlights)

**Style:**
- Minimalisme lumineux
- Beaucoup d'espace blanc
- Animations subtiles
- Premium accessible
- Focus sur la lisibilité

## 📁 Structure du Projet

```
Beeclou/
├── index.html              # HTML principal
├── package.json            # Dépendances (Vite)
├── vite.config.js          # Config Vite
├── README.md               # Ce fichier
├── src/
│   ├── main.js             # JavaScript interactif
│   └── styles.css          # Styles complets
├── public/
│   ├── assets/             # Images, icônes
│   └── favicon.svg         # Favicon
├── dist/                   # Build output (généré)
└── .gitignore              # Fichiers à ignorer
```

## 🚀 Démarrage Rapide

### Installation & Développement

```bash
# Clone et installation
git clone https://github.com/jean63echalier-alt/beeclou.git
cd beeclou
npm install

# Démarrage en développement (http://localhost:5173)
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

### Variables d'environnement

Créer un fichier `.env.local` (optionnel) :

```env
VITE_GOOGLE_FORM_ID=YOUR_FORM_ID
VITE_INSTAGRAM_URL=https://instagram.com/beeclou
VITE_CONTACT_EMAIL=hello@beeclou.com
```

## 🔧 Configuration (Important!)

**Modifier les liens dans `src/main.js` :**

```javascript
const CONFIG = {
  googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true',
  instagramUrl: 'https://instagram.com/beeclou',
  contactEmail: 'hello@beeclou.com',
  contactForm: 'https://docs.google.com/forms/d/e/YOUR_TESTER_FORM_ID/viewform?embedded=true'
}
```

Remplacer :
- `YOUR_FORM_ID` → ID de votre Google Form (sondage)
- `YOUR_TESTER_FORM_ID` → ID du formulaire testeurs
- `instagram.com/beeclou` → Votre profil Instagram
- `hello@beeclou.com` → Email de contact

## 📱 Sections du Site

1. **Hero** — Titre principal + CTA
2. **La ville fatigue** — Problématiques urbaines
3. **Le vrai enjeu** — Positionnement (calme > vitesse)
4. **Le vélo est désiré mais freiné** — Obstacles identifiés
5. **Vision** — Mission Beeclou
6. **Expérience Beeclou** — 6 avantages clés
7. **Collective Intelligence** — Vision partagée
8. **Keyline** — Phrase clé en full dark
9. **Démarche terrain** — Méthodologie
10. **Participation** — Appels à l'action
11. **Footer** — Liens et légal

## 🌐 Déploiement sur Vercel

### Étape 1 : Créer un repo GitHub

```bash
# Initialiser repo (si pas encore fait)
git init
git add .
git commit -m "Initial commit: Beeclou V1 site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/beeclou.git
git push -u origin main
```

### Étape 2 : Connecter à Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. S'identifier avec GitHub
3. **Import Project** → Sélectionner le repo `beeclou`
4. Vercel détecte automatiquement Vite
5. Cliquer **Deploy**

**Résultat :** Site accessible sur `https://beeclou.vercel.app`

### Étape 3 : Ajouter le domaine beeclou.fr

1. Dans Vercel → Project Settings → Domains
2. Ajouter `beeclou.fr` et `www.beeclou.fr`
3. Vercel vous donne les nameservers

### Étape 4 : Configurer les DNS

Aller sur votre registrar (OVH, Namecheap, etc.) :

1. Créer des records **CNAME** :
   - `beeclou.fr` → ALIAS vers `beeclou.vercel.app`
   - `www.beeclou.fr` → CNAME `beeclou.vercel.app`

2. Ou des records **NS** pointant vers Vercel

*Délai de propagation : 24-48h (parfois instantané)*

### Étape 5 : Déploiement Automatique

Une fois configuré :

```bash
# Chaque push déclenche un build automatique
git push origin main
# → Vercel rebuild et déploie automatiquement
# → Site live sur beeclou.fr en ~2 minutes
```

## ✏️ Personnalisation

### Modifier les textes

Éditer `index.html` directement (sections commentées).

### Changer les couleurs

Éditer `:root` dans `src/styles.css` :

```css
:root {
  --color-bg: #f5f3f0;
  --color-text-dark: #2a2520;
  --color-accent-green: #a8b8a0;
  /* ... etc */
}
```

### Ajouter des images

1. Placer images dans `public/assets/`
2. Référencer dans HTML : `<img src="/assets/image.jpg" alt="Description">`
3. **Important** : Optimiser les images (format WebP recommandé)

### Intégrer Google Form

1. Créer un formulaire sur [Google Forms](https://forms.google.com)
2. Cliquer **Envoyer** → **< >** (embed)
3. Copier l'URL du formulaire
4. Coller dans `CONFIG.googleFormUrl` dans `src/main.js`

## ⚡ Performance

- **Lighthouse Score** : 95+ (objectif)
- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 2s
- **Bundle Size** : ~50 KB (gzip)

Tester : Lighthouse (Chrome DevTools) ou [pagespeed.web.dev](https://pagespeed.web.dev)

## 📐 Responsive Design

Testé et optimisé pour :
- **Mobile** (< 480px)
- **Tablette** (480px - 768px)
- **Desktop** (> 768px)

Breakpoints dans `src/styles.css` :
```css
@media (max-width: 768px) { /* Tablette/mobile */ }
@media (max-width: 480px) { /* Mobile */ }
```

## 🔍 SEO

- ✅ Meta tags (title, description)
- ✅ Open Graph (réseaux sociaux)
- ✅ Favicon
- ✅ Hiérarchie H1 → H2 → H3
- ✅ Alt text sur images
- ✅ Structured data (optionnel)

## 🔐 Bonnes Pratiques

- ✅ Aucune clé d'API en public
- ✅ `.gitignore` configuré
- ✅ Linting & formatting (optionnel : ajouter ESLint/Prettier)
- ✅ Build optimisé pour production

## 📋 Checklist Avant Lancement

- [ ] Configuration URLs dans `src/main.js`
- [ ] Textes personnalisés
- [ ] Images optimisées
- [ ] Logo et favicon
- [ ] Forms Google intégrés
- [ ] Liens sociaux corrects
- [ ] Testé sur iOS et Android
- [ ] Lighthouse score 90+
- [ ] Domaine pointant vers Vercel

## 🎯 Prochaines Étapes

1. **MVP** : Site statique + formulaires
2. **Analytics** : Ajouter Vercel Analytics ou Google Analytics
3. **Blog** : Ajouter section actualités (MDX optionnel)
4. **API** : Si besoin backend (serverless Vercel)
5. **Email** : Intégration Mailchimp/Brevo pour newsletter

## 🆘 Troubleshooting

**Vercel dit "Build failed"**
- Vérifier `npm run build` en local fonctionne
- Vérifier `dist/` est bien généré
- Vérifier `.gitignore` n'exclut pas `dist/`

**Site vide après déploiement**
- Vérifier URLs absolues (toujours `/` à la racine)
- Vérifier assets path : `/assets/...` pas `assets/...`

**Lenteur au build**
- Vérifier images sont compressées
- Vérifier aucune grosse vidéo
- Optimiser CSS/JS

## 📦 Technologies

| Tech | Version | Usage |
|------|---------|-------|
| Vite | ^5.0.0 | Build system |
| Node.js | 16+ | Runtime |
| HTML5 | - | Markup |
| CSS3 | - | Styling |
| JavaScript | ES6+ | Interactivity |

## 📄 Licence

Propriétaire Beeclou. Tous droits réservés.

## 📧 Support

Pour questions/bugs :
- Email : hello@beeclou.com
- Instagram : @beeclou

---

**Made with 🐝 for better urban mobility.**  
*Beeclou — Des déplacements urbains plus libres, plus fluides, plus agréables.*