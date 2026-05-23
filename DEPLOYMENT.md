# Beeclou — Déploiement et Configuration

## 📦 Structure du Projet

```
Beeclou/
├── index.html          # Page principale (à modifier)
├── style.css           # Styles (mobile-first)
├── script.js           # Interactions JavaScript
├── assets/
│   ├── images/         # Dossier pour les images
│   └── fonts/          # Dossier pour les fonts (optionnel)
└── DEPLOYMENT.md       # Ce fichier
```

---

## 🚀 Déploiement sur Hostinger

### Étape 1 : Préparer les fichiers

1. Créer un dossier `beeclou` (ou le nom que tu veux)
2. Y ajouter tous les fichiers:
   - `index.html`
   - `style.css`
   - `script.js`
   - Dossier `assets/` avec ses sous-dossiers

### Étape 2 : Upload via Hostinger

#### Via File Manager (GUI) :
1. Accéder à **Hostinger Control Panel**
2. Aller à **File Manager** → **public_html**
3. Créer un dossier `beeclou` (ou uploader directement à la racine)
4. Uploader tous les fichiers (drag & drop possible)
5. L'URL sera: `https://votredomaine.com/beeclou/` (ou à la racine si direct)

#### Via FTP :
1. Récupérer les credentials FTP depuis Hostinger
2. Utiliser FileZilla ou Cyberduck
3. Se connecter et aller dans **public_html**
4. Uploader le dossier **Beeclou** complètement
5. URL: `https://votredomaine.com/beeclou/`

#### Via Terminal (SSH) :
```bash
# Si accès SSH disponible
scp -r ./Beeclou/ user@votredomaine.com:/home/xxx/public_html/
```

### Étape 3 : Vérifier

- Accéder à `https://votredomaine.com/beeclou/`
- Tester sur mobile (iPhone et Android)
- Tester les formulaires et liens

---

## ✏️ Personnalisation

### 1️⃣ Modifier les Textes

Tous les textes sont dans **index.html**. Chercher et remplacer:

```html
<!-- Exemple: Changer le titre hero -->
<h1 class="hero-title">
    Des déplacements urbains plus libres...
</h1>
```

### 2️⃣ Remplacer les Couleurs

Modifier dans **style.css** à la section `:root`:

```css
:root {
    --color-beeclou-yellow: #F4C430;  /* Changer la couleur jaune */
    --color-sage-green: #6b9b84;      /* Changer le vert */
    --color-soft-black: #1a1a1a;      /* Changer le noir doux */
}
```

### 3️⃣ Ajouter des Images

#### Images locales (recommandé):
1. Placer les images dans `assets/images/`
2. Dans le HTML, remplacer les `.visual-placeholder` par:

```html
<img src="assets/images/hero.jpg" alt="Description">
```

#### Images optimisées:
- Utiliser JPG pour les photos (format: 1200x800px min)
- Utiliser PNG pour les icônes transparentes
- Compresser via TinyPNG.com avant upload

### 4️⃣ Ajouter le Formulaire Google Form

Dans `index.html`, chercher:
```html
<div id="survey-form" class="survey-placeholder">
    <!-- Remplacer par Google Form -->
</div>
```

Remplacer par:
```html
<iframe
    src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
    width="100%"
    height="600"
    frameborder="0"
    marginheight="0"
    marginwidth="0">
    Chargement…
</iframe>
```

(Obtenir `YOUR_FORM_ID` depuis ton Google Form: Partage → Obtenir le code d'intégration)

### 5️⃣ Mettre à Jour les Liens

Remplacer dans le **footer** et partout nécessaire:

```html
<!-- Instagram -->
<a href="https://instagram.com/beeclou" target="_blank">Instagram</a>

<!-- Email -->
<a href="mailto:hello@beeclou.com">Contact</a>
```

### 6️⃣ Ajouter Google Analytics (optionnel)

Ajouter avant `</head>` dans index.html:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

---

## 🎨 Guide de Couleurs

**Palette Beeclou:**
- **Off-white**: `#faf9f7` (fond principal)
- **Soft Black**: `#1a1a1a` (texte)
- **Urban Gray**: `#6b6b6b` (texte secondaire)
- **Sage Green**: `#6b9b84` (accent)
- **Beeclou Yellow**: `#F4C430` (CTA)
- **Light Beige**: `#f5f3f0` (section alternée)

---

## 📱 Points de Rupture Responsive

Le site s'adapte automatiquement:
- **Mobile**: < 768px
- **Tablette**: 768px à 1024px
- **Desktop**: > 1024px

Tester avec Chrome DevTools: `F12` → Vue responsive

---

## ⚡ Performance

Le site est optimisé pour être **ultra-rapide**:
- Aucun framework (vanilla HTML/CSS/JS)
- CSS minimal et efficace
- JS léger (< 10 KB)
- Images doivent être compressées

**Performance Target:**
- Lighthouse Score: 90+
- Temps de chargement: < 2s

Tester: Chrome → DevTools → Lighthouse

---

## 🔍 SEO Basique

Meta tags pré-configurés dans `<head>`:
- Title
- Meta description
- OG tags (réseaux sociaux)
- Favicon emoji

À personnaliser avec:
- Vrai domain
- Description pertinente
- Image social (og:image)

---

## 📞 Support Hostinger

Si problème d'upload/accès:
1. Vérifier les permissions (755 pour dossiers, 644 pour fichiers)
2. Vérifier l'extension `.html` est autorisée
3. Vider le cache navigateur (Ctrl+Maj+Suppr)
4. Contacter support Hostinger si besoin

---

## ✅ Checklist Avant Lancement

- [ ] Tous les textes personnalisés
- [ ] Images uploadées et compressées
- [ ] Liens sociaux/email corrects
- [ ] Google Form intégré
- [ ] Testé sur iOS et Android
- [ ] Testé sur desktop
- [ ] Lighthouse Score OK
- [ ] Meta tags pertinents

---

## 📝 Notes

- Le site est **statique** (HTML/CSS/JS)
- Aucun backend requis
- Formulaire de testeur: à intégrer à Zapier/email en prod
- Support navigateurs: tous les navigateurs modernes (> 2020)

---

**🐝 Beeclou — Mobilité urbaine plus libre, plus fluide, plus humaine.**
