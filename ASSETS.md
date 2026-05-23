# 🎨 Guide des Assets & Visuels — Beeclou

## 📸 Images Recommandées

### 1. Hero Image (Desktop & Mobile)
- **Nom**: `hero-mobile.jpg` (mobile) et `hero-desktop.jpg` (desktop)
- **Dimensions**: 
  - Mobile: 1080 × 1200px (aspect ratio: 9:10)
  - Desktop: 1200 × 800px (aspect ratio: 3:2)
- **Poids**: < 300 KB
- **Style**: Cycliste urbain détendu, vélo élégant, lumière naturelle douce, scène apaisée
- **Palette**: Vert sauge, blanc cassé, noir doux
- **Vibe**: Liberté, légèreté, fluidité

```html
<!-- À ajouter dans index.html -->
<img 
    src="assets/images/hero-mobile.jpg" 
    alt="Beeclou - Vélo urbain"
    class="hero-image"
>
```

### 2. Section Problème
- **Nom**: `problem.jpg`
- **Dimensions**: 1200 × 800px
- **Poids**: < 250 KB
- **Style**: Rue urbaine bondée, embouteillage ou transports saturés, atmosphère stressée
- **Palette**: Gris urbain foncé, noir, touches de fatigue visuelle
- **Vibe**: Chaos urbain, stress, saturation

### 3. Section Vision
- **Nom**: `vision.jpg`
- **Dimensions**: 1200 × 800px
- **Poids**: < 250 KB
- **Style**: Rue urbaine calme, lumière de fin de journée, personne souriante sur vélo, fluidité
- **Palette**: Vert sauge, beige clair, lumière dorée
- **Vibe**: Sérénité, liberté retrouvée, apaisement

### 4. Section Expérience
- **Nom**: `experience.jpg`
- **Dimensions**: 1200 × 600px (aspect ratio: 2:1)
- **Poids**: < 300 KB
- **Style**: 
  - Détail du vélo Beeclou
  - Top case discret premium
  - Vélo en action, circulation fluide
  - Personnage souriant sans pose excessive
- **Palette**: Noir doux, vert sauge, touche jaune discrète
- **Vibe**: Élégance, pratique, confiance

### 5. Section Approche (Démarche Terrain)
- **Nom**: `approach.jpg`
- **Dimensions**: 1200 × 800px
- **Poids**: < 250 KB
- **Style**: 
  - Observations terrain
  - Rencontres avec cyclistes urbains
  - Discussions authentiques
  - Ambiance collaborative, bienveillante
- **Palette**: Vert sauge, blanc, teintes chaudes
- **Vibe**: Authenticité, human-centered, empathie

## 🎨 Direction Artistique

### Palette Couleur

```
Off-white:     #faf9f7  (fond principal)
Soft Black:    #1a1a1a  (texte)
Urban Gray:    #6b6b6b  (texte secondaire)
Sage Green:    #6b9b84  (accent principal)
Beeclou Yellow: #F4C430 (CTA, highlights)
Light Beige:   #f5f3f0  (sections alternées)
```

### Inspirations Visuelles

**Pinterest Boards:**
- "Urban mobility lifestyle"
- "Premium bike design"
- "Minimal lifestyle photography"
- "Calm city photography"

**Marques de Référence:**
1. **Apple** → Épure, minimalisme, lumière naturelle
2. **Citymapper** → Fluidité urbaine, design épuré
3. **Cowboy** → Élégance premium, vélos sophistiqués
4. **Notion** → Minimalisme, respirabilité visuelle

### Style Photographique

✅ **À privilégier:**
- Lumière naturelle douce
- Scènes authentiques (pas de poses forcées)
- Fluidité des mouvements
- Ambiance calme et apaisée
- Cyclistes vrais, pas modèles publicitaires excessifs
- Détails pertinents (top case, rangement)
- Perspective urbaine apaisée
- Couleurs douces et cohérentes

❌ **À éviter:**
- Style startup fake/trop énergique
- Clichés corporate (poignée de main, bureau)
- Visuels trop sportifs/compétitifs
- Ambiance "Uber Eats" livraison
- Filtres agressifs
- Surcharge visuelle
- Poses publicitaires excessives

## 📁 Organisation des Fichiers

```
assets/
├── images/
│   ├── hero-mobile.jpg      (1080 × 1200, < 300 KB)
│   ├── hero-desktop.jpg     (1200 × 800, < 300 KB)
│   ├── problem.jpg          (1200 × 800, < 250 KB)
│   ├── vision.jpg           (1200 × 800, < 250 KB)
│   ├── experience.jpg       (1200 × 600, < 300 KB)
│   ├── approach.jpg         (1200 × 800, < 250 KB)
│   └── favicon.ico          (32 × 32, optionnel)
└── fonts/                   (optionnel)
    └── custom-font.woff2    (si font custom)
```

## 🖼️ Outils Recommandés pour Créer/Editer

### Génération d'Images IA (Recommandé)
- **Midjourney** → Qualité premium, cohérence style
- **DALL-E 3** → Précis, style Apple-like
- **Stable Diffusion** → Local, flexible

**Prompt Beeclou:**
```
Ultra-premium urban mobility photography, calm city lifestyle,
minimalist aesthetic, soft natural light, golden hour mood,
cyclist on elegant bike in peaceful city, Scandinavian vibes,
Apple x Citymapper x Cowboy style, color palette: soft blacks,
sage green, off-white, Beeclou yellow accents, serene
professional photography, lifestyle authentic scene.
```

### Optimisation Images
- **TinyPNG.com** → Compresse PNG/JPG sans perte (recommandé)
- **ImageOptim** (Mac) → Batch optimization
- **OptiPNG** → CLI optimization
- **Squoosh** → Google's online tool

### Édition Graphique
- **Figma** → Design collaboratif
- **Photoshop** → Pro editing
- **Affinity Photo** → Alternative légère
- **Pixlr** → Online editor
- **Canva** → Designs templates (pour infographiques)

## 💡 Astuces Intégration

### Responsive Images (Modern)
```html
<picture>
    <source 
        media="(max-width: 768px)"
        srcset="assets/images/hero-mobile.jpg"
    >
    <img 
        src="assets/images/hero-desktop.jpg" 
        alt="Beeclou Hero"
        class="hero-image"
    >
</picture>
```

### Lazy Loading
```html
<img 
    src="assets/images/lazy.jpg" 
    loading="lazy"
    alt="Description"
>
```

### Web Optimized Formats
```html
<picture>
    <source 
        srcset="image.webp" 
        type="image/webp"
    >
    <img 
        src="image.jpg" 
        alt="Fallback"
    >
</picture>
```

## 🎯 Checklist Création Visuels

- [ ] 5 images principales créées (hero, problem, vision, experience, approach)
- [ ] Dimensions et poids OK (< 300 KB chacune)
- [ ] Palette couleur cohérente
- [ ] Style authentique et apaisé
- [ ] Aucun cliché corporate
- [ ] Compressées via TinyPNG
- [ ] Uploadées dans `assets/images/`
- [ ] Intégrées dans index.html
- [ ] Test responsive sur mobile & desktop
- [ ] Lighthouse score OK

## 📊 Dimensions Récapitulatif

| Image | Dimensions | Ratio | Poids Max | Contexte |
|-------|-----------|-------|-----------|----------|
| Hero Mobile | 1080 × 1200 | 9:10 | 300 KB | Hero section |
| Hero Desktop | 1200 × 800 | 3:2 | 300 KB | Hero section |
| Problem | 1200 × 800 | 3:2 | 250 KB | Section problème |
| Vision | 1200 × 800 | 3:2 | 250 KB | Section vision |
| Experience | 1200 × 600 | 2:1 | 300 KB | Expérience |
| Approach | 1200 × 800 | 3:2 | 250 KB | Démarche terrain |

## 🎬 Alternative: Vidéo Courte

Si budget permet, courte vidéo background (< 500 KB) pour hero:

```html
<video 
    autoplay 
    muted 
    loop 
    class="hero-video"
>
    <source src="assets/hero.mp4" type="video/mp4">
</video>
```

---

**Questions sur les visuels?** Consulte DEPLOYMENT.md pour plus de détails.
