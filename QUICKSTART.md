# ⚡ Quickstart — Beeclou en 5 minutes

## 🚀 Démarrage Rapide

### 1. Télécharger le projet
```bash
git clone <repo> Beeclou
cd Beeclou
```

### 2. Tester en local (développement)
```bash
python3 -m http.server 8000
```
Puis: **http://localhost:8000**

### 3. Déployer sur Hostinger
1. Accéder à **Hostinger Control Panel**
2. **File Manager** → **public_html**
3. Uploader le dossier complet `Beeclou/`
4. Accéder à `https://votredomaine.com/beeclou/`

---

## ✏️ Personnalisations Essentielles (15 min)

### À faire OBLIGATOIREMENT :

1. **index.html** — Modifier les 3 points:
   ```html
   <!-- Ligne ~74: Lien Instagram -->
   <a href="https://instagram.com/YOUR_HANDLE">Instagram</a>
   
   <!-- Ligne ~73: Email -->
   <a href="mailto:your@email.com">Contact</a>
   ```

2. **config.js** — Configurer:
   ```javascript
   social: {
       instagram: 'https://instagram.com/beeclou',
       email: 'hello@beeclou.com',
   }
   ```

3. **Google Form** (optionnel mais recommandé):
   - Créer un Google Form: https://forms.google.com
   - Partager → Obtenir code d'intégration
   - Remplacer dans index.html vers ligne 278:
   ```html
   <iframe src="https://docs.google.com/forms/d/e/YOUR_ID/viewform?embedded=true"...>
   ```

---

## 🎨 Ajouter des Images (Optionnel mais Recommandé)

### Créer les images

1. Utiliser **Midjourney**, **DALL-E 3** ou images libres
2. Optimiser via **TinyPNG.com** (< 300 KB)
3. Placer dans `assets/images/`

### Intégrer dans HTML

Remplacer les sections `.visual-placeholder` par:

```html
<!-- À la place du placeholder hero -->
<img 
    src="assets/images/hero.jpg" 
    alt="Beeclou - Mobilité urbaine"
    class="hero-image"
>
```

**Voir ASSETS.md pour détails complets des dimensions.**

---

## ✅ Checklist Avant Lancement

- [ ] Textes personnalisés (nom, email, instagram)
- [ ] Google Form intégré (optionnel)
- [ ] Images ajoutées (optionnel)
- [ ] Testé sur iPhone Safari
- [ ] Testé sur Android Chrome
- [ ] Déployé sur Hostinger
- [ ] Domain fonctionne

---

## 📱 Test Rapide

Ouvrir sur iPhone/Android et vérifier:
- ✓ Textes lisibles
- ✓ Boutons cliquables
- ✓ Sections fluides
- ✓ Pas de scroll horizontal
- ✓ Formulaire fonctionnel

---

## 🆘 Problèmes Courants

### Le site ne charge pas
→ Vérifier que les fichiers sont dans **public_html**
→ Vérifier l'extension **.html** correcte

### Images cassées
→ Vérifier chemin relatif: `assets/images/file.jpg`
→ Vérifier fichier existe vraiment

### Formulaire ne soumet pas
→ Remplir tous les champs obligatoires
→ Vérifier la console navigateur (F12)

### Layout cassé sur mobile
→ Vérifier viewport meta tag dans `<head>`
→ Tester avec Chrome DevTools responsive

---

## 📚 Documentation Complète

- **DEPLOYMENT.md** — Guide déploiement détaillé
- **ASSETS.md** — Guide complet des images et design
- **config.js** — Paramètres centralisés
- **README.md** — Vue d'ensemble du projet

---

## 🎯 Résumé

| Fichier | Rôle | À Personnaliser? |
|---------|-----|------------------|
| index.html | Page web | ✓ Oui (textes, liens) |
| style.css | Design | Optional (couleurs) |
| script.js | Interactions | Non (fonctionne) |
| config.js | Configuration | ✓ Oui (liens, forms) |
| assets/ | Images | ✓ Oui (à ajouter) |

---

**Besoin d'aide? Voir DEPLOYMENT.md ou ASSETS.md 🐝**
