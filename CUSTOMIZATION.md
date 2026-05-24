# 🎨 Guide de Personnalisation Beeclou

Comment adapter le site à votre contexte spécifique.

## 📝 Modifier les Textes

Tous les textes sont dans **`index.html`**. Facile à chercher et remplacer.

### Sections principales

**Hero Section** (Lignes 23-34)

```html
<h1 class="hero-title">Des déplacements urbains plus libres...</h1>
<p class="hero-subtitle">Beeclou explore une nouvelle manière...</p>
```

**Titre des sections** (Lignes 43, 59, 71, etc.)

```html
<h2>La ville fatigue</h2>
<h2>Le vrai enjeu n'est pas seulement d'aller plus vite.</h2>
```

**Footer** (Ligne 172)

```html
<p>Beeclou — mobilité urbaine plus libre...</p>
```

### Conseils

- Garder la hiérarchie des titres (H1 → H2 → H3)
- Ne pas modifier les `id=""` et `class=""` (utilisés par CSS et JS)
- Tester sur mobile après modification (responsive!)

---

## 🎨 Modifier les Couleurs

Tous les styles sont dans **`src/styles.css`**

### Palette de couleurs (Ligne 8)

```css
:root {
  --color-bg: #f5f3f0;              /* Fond principal */
  --color-bg-light: #fefdfb;        /* Fond clair */
  --color-text-dark: #2a2520;       /* Texte principal */
  --color-text-gray: #8b8680;       /* Texte secondaire */
  --color-accent-beige: #e8dfd8;    /* Zones/cards */
  --color-accent-green: #a8b8a0;    /* Accent vert sauge */
  --color-accent-yellow: #f4c430;   /* Yellow Beeclou */
  --color-border: #d9d1c8;          /* Bordures */
  --color-white: #ffffff;           /* Blanc pur */
}
```

### Comment changer

1. Ouvrir `src/styles.css`
2. Trouver `:root { ... }`
3. Modifier les valeurs hex

**Exemples:**

```css
/* Changer le fond */
--color-bg: #f5f3f0;  →  --color-bg: #ffffff;

/* Changer l'accent vert */
--color-accent-green: #a8b8a0;  →  --color-accent-green: #4a7c59;

/* Changer le texte principal */
--color-text-dark: #2a2520;  →  --color-text-dark: #000000;
```

### Outils pour les couleurs

- [color-hex.com](https://www.color-hex.com) → Convertir RGB ↔ Hex
- [coolors.co](https://coolors.co) → Générer des palettes
- [contrast-ratio.com](https://contrast-ratio.com) → Vérifier l'accessibilité

---

## 🖼️ Ajouter des Images

### Placer les images

1. Créer un dossier : `public/assets/images/`
2. Placer les images dedans (formats: JPG, PNG, WebP)
3. **Important** : Compresser les images avant

### Utiliser dans le HTML

```html
<!-- Image simple -->
<img src="/assets/images/hero.jpg" alt="Description">

<!-- Image lazy loading (optimise perfs) -->
<img src="/assets/images/section.jpg" alt="Description" loading="lazy">

<!-- Image responsif (à venir) -->
<picture>
  <source srcset="/assets/images/hero.webp" type="image/webp">
  <img src="/assets/images/hero.jpg" alt="Description">
</picture>
```

### Compresser les images

**Gratuit en ligne :**
- [tinypng.com](https://tinypng.com) → PNG/JPG
- [cloudconvert.com](https://cloudconvert.com) → Convertir en WebP

**Ou en CLI :**

```bash
# Avec ImageMagick
convert input.jpg -quality 80 output.jpg

# Avec FFmpeg
ffmpeg -i input.jpg -q:v 6 output.jpg
```

**Taille recommandée :**
- Hero image: 600px wide (mobile) → 1200px (desktop)
- Section images: 300-500px
- Viser max 100-200 KB par image

---

## 🔗 Configurer les Liens Externes

**Fichier à éditer** : `src/main.js` (Lignes 5-11)

```javascript
const CONFIG = {
  googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true',
  instagramUrl: 'https://instagram.com/beeclou',
  contactEmail: 'hello@beeclou.com',
  contactForm: 'https://docs.google.com/forms/d/e/YOUR_TESTER_FORM_ID/viewform?embedded=true'
}
```

### Google Form

1. Créer un formulaire : [forms.google.com](https://forms.google.com)
2. Cliquer **Envoyer** → **< >** (Intégrer)
3. Copier le lien `src="..."`
4. Coller dans `googleFormUrl`

**Exemple :**

```
https://docs.google.com/forms/d/e/1FAIpQLScX...ZvmA/viewform?embedded=true
                                      ↑
                                  Cet ID
```

### Instagram

Créer le compte et remplacer :

```javascript
instagramUrl: 'https://instagram.com/votreprofilici'
```

### Email de contact

Utiliser votre email :

```javascript
contactEmail: 'votre.email@example.com'
```

---

## 🔐 Ajouter Google Analytics

### Créer un compte

1. Aller sur [analytics.google.com](https://analytics.google.com)
2. Créer un compte pour `beeclou.fr`
3. Obtenir l'ID (format : `G-XXXXXXXXXX`)

### Ajouter le code

Dans `index.html`, avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ID');
</script>
```

Remplacer `G-YOUR_ID` par votre ID Google Analytics.

---

## 🎯 Modifier les Sections

Chaque section a un `id=""` pour le scroll fluide.

### Ajouter une section

1. Copier un `<section>` existant dans `index.html`
2. Modifier le contenu
3. Ajouter un style correspondant dans `src/styles.css` si besoin

**Exemple :**

```html
<!-- Nouvelle section -->
<section class="ma-section" id="ma-section">
  <div class="section-header">
    <h2>Mon titre</h2>
  </div>
  <div class="section-content">
    <p>Mon contenu</p>
  </div>
</section>
```

Puis ajouter dans CSS :

```css
.ma-section {
  background-color: var(--color-white);
  padding: var(--spacing-2xl) var(--spacing-lg);
}
```

### Modifier l'ordre des sections

Éditer `index.html` directement. Le CSS s'adapte (flexbox/grid).

---

## 📱 Adapter le Responsive

Breakpoints dans `src/styles.css` (Lignes 370+)

```css
@media (max-width: 768px) {
  /* Tablette et petit écran */
}

@media (max-width: 480px) {
  /* Mobile */
}
```

### Ajouter un breakpoint personnalisé

```css
@media (max-width: 1200px) {
  /* Grands écrans */
}

@media (max-width: 600px) {
  /* Petit mobile */
}
```

### Tester

```bash
# Local
npm run dev
# Ouvrir http://localhost:5173
# Chrome DevTools → Ctrl+Shift+M (Mode responsive)
```

---

## 🌙 Mode Sombre

Déjà implémenté! CSS gère automatiquement.

La préférence utilisateur (système) est respectée :

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1a1a1a;
    /* ... */
  }
}
```

Pour forcer le mode sombre:

```css
color-scheme: dark;
```

---

## ⚡ Performance & Optimisation

### Lazy loading images

```html
<img src="/assets/image.jpg" loading="lazy" alt="Description">
```

### Compresser le CSS/JS

Vite le fait automatiquement lors du build :

```bash
npm run build
```

### Vérifier les perfs

```bash
# Local
npm run build

# Voir les sizes
ls -lh dist/assets/

# Ou utiliser Lighthouse
Chrome DevTools → Lighthouse
```

---

## 🔤 Polices (Fonts)

Actuellement : **System fonts** (très rapide)

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Ajouter Google Fonts

1. Aller sur [fonts.google.com](https://fonts.google.com)
2. Choisir une police (ex: Inter, Poppins)
3. Copier le `<link>`
4. Ajouter dans `<head>` dans `index.html`
5. Utiliser dans CSS

**Exemple :**

```html
<!-- Dans <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Inter', -apple-system, sans-serif;
}
```

---

## 🧪 Tester les Changements

### En local

```bash
npm run dev
# http://localhost:5173
# Actualiser à chaque changement
```

### Sur mobile

```bash
# Voir l'adresse IP locale
npm run dev
# Vous verrez : http://192.168.x.x:5173

# Sur téléphone (même réseau Wi-Fi) :
# Ouvrir 192.168.x.x:5173 dans le navigateur
```

### Avant de pousser

```bash
# Build final
npm run build

# Vérifier dist/
ls dist/

# Preview
npm run preview
# http://localhost:4173
```

---

## 📋 Checklist Personnalisation

- [ ] Textes adaptés à votre contexte
- [ ] Couleurs matches votre brand
- [ ] Images compressées ajoutées
- [ ] Liens Google Forms configurés
- [ ] Email de contact correct
- [ ] Instagram/réseaux sociaux
- [ ] Analytics connecté (optionnel)
- [ ] Testé sur mobile (npm run dev)
- [ ] Build réussi (`npm run build`)
- [ ] Lighthouse score 90+

---

## 🚀 Pousser les changements

```bash
# Tester en local
npm run dev

# Commit
git add .
git commit -m "Update: [description de changement]"

# Push
git push origin claude/beeclou-v1-site-57bFG

# ✅ Vercel rebuilde automatiquement
# ✅ Site mis à jour en 2 minutes
```

---

**Besoin d'aide ?**

Tous les fichiers sont commentés. Consultez :
- `index.html` → Structure HTML
- `src/styles.css` → Styles et breakpoints
- `src/main.js` → Interactions et config

Made with 🐝 for better urban mobility.
