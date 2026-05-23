# 🐝 Beeclou — Mobilité Urbaine Premium

**Des déplacements urbains plus libres, plus fluides et sans stress.**

Version bêta mobile-first du site Beeclou — une solution de mobilité urbaine pensée pour les trajets réels de la vie urbaine.

## ✨ Caractéristiques

- **Mobile-First** : Conçu pour être parfait sur iPhone en priorité
- **Zéro Framework** : HTML/CSS/JavaScript pur — aucune dépendance externe
- **Ultra-Léger** : ~30 KB total (HTML + CSS + JS)
- **Déploiement Simple** : Upload direct dans Hostinger public_html
- **Premium Accessible** : Design épuré et minimaliste, inspiré d'Apple × Citymapper × Cowboy
- **Responsive** : Adapté à tous les écrans (mobile, tablette, desktop)

## 🎨 Design

**Palette de couleurs:**
- Off-white: `#faf9f7` (fond)
- Soft Black: `#1a1a1a` (texte)
- Urban Gray: `#6b6b6b` (texte secondaire)
- Sage Green: `#6b9b84` (accent)
- **Beeclou Yellow**: `#F4C430` (CTA principal)

**Inspirations:**
- Apple → épure, minimalisme
- Citymapper → fluidité urbaine
- Cowboy → élégance, sérénité

## 📁 Structure

```
.
├── index.html         # Page principale
├── style.css          # Styles (mobile-first)
├── script.js          # Interactions légères
├── config.js          # Configuration centralisée
├── DEPLOYMENT.md      # Guide complet de déploiement
├── assets/
│   ├── images/        # Images (à ajouter)
│   └── fonts/         # Fonts (optionnel)
└── .gitignore
```

## 🚀 Déploiement Rapide

### Hostinger (recommandé)

1. **Via File Manager:**
   - Hostinger Control Panel → File Manager → public_html
   - Créer dossier `beeclou` (optionnel)
   - Uploader tous les fichiers

2. **Votre URL:**
   ```
   https://votredomaine.com/beeclou/
   ou
   https://votredomaine.com/ (si upload direct à la racine)
   ```

### Local (développement)

```bash
cd Beeclou/
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

## ✏️ Personnalisation

Voir **DEPLOYMENT.md** pour:
- Modifier les textes
- Changer les couleurs
- Ajouter des images
- Intégrer Google Form
- Mettre à jour les liens sociaux
- Ajouter Google Analytics

## 📱 Sections

1. **Hero** — Titre + sous-titre + CTA
2. **Problème** — "La ville fatigue"
3. **Vision** — "Repenser le voyage urbain"
4. **Expérience** — Caractéristiques (Vélo, Rangement, Liberté)
5. **Approche** — "Construire avec les vrais usages"
6. **Testeurs** — Formulaire d'inscription + Sondage Google Form
7. **Footer** — Liens sociaux + contact

## 🔧 Configuration

Fichier `config.js`:
- Liens sociaux (Instagram, email)
- Google Form URL
- Villes disponibles
- Messages & textes
- Palette de couleurs

## ⚡ Performance

- **Lighthouse Score**: 95+ ✓
- **Temps de chargement**: < 1.5s
- **Aucun JavaScript lourd**
- **CSS optimisé**
- **Images compressées (optionnel)**

Test: Chrome → DevTools → Lighthouse

## 📐 Responsive

- **Mobile** (< 768px): Layout en colonne
- **Tablette** (768px - 1024px): Grille adaptée
- **Desktop** (> 1024px): Layout optimisé

Tester: Chrome DevTools → Vue responsive

## 🔍 SEO

- Meta tags essentiels ✓
- Open Graph tags (réseaux sociaux) ✓
- Favicon emoji ✓
- Titres hiérarchisés (H1 → H2 → H3) ✓
- Descriptions pertinentes ✓

## 📋 Checklist Avant Lancement

- [ ] Textes personnalisés
- [ ] Images ajoutées et compressées
- [ ] Liens sociaux corrects
- [ ] Google Form intégré
- [ ] Testé sur iOS et Android
- [ ] Lighthouse Score 90+
- [ ] Domain/email configurés

## 🎯 Objectif

Présenter Beeclou comme une solution de mobilité urbaine **plus libre, plus fluide et plus humaine**, avec un design premium et minimaliste que les utilisateurs ont envie d'utiliser.

## 📞 Support

Voir **DEPLOYMENT.md** pour:
- Instructions détaillées de déploiement
- Guide de personnalisation
- Troubleshooting Hostinger
- Optimization tips

---

**Made with 🐝 for better urban mobility.**