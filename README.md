# Beeclou MVP

**Transforme tes déplacements en revenus et avantages locaux.**

Une application web mobile communautaire de mobilité et d'économie locale.

## 🚀 Démarrage

### Installation

```bash
npm install --legacy-peer-deps
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 📱 Pages implémentées

### Pages publiques
- **`/`** - Landing page avec présentation
- **`/login`** - Authentification par magic link email
- **`/onboarding`** - Questionnaire d'intégration (3 étapes)
- **`/partner`** - Présentation partenaires

### Pages utilisateur (routes protégées à configurer)
- **`/dashboard`** - Vue d'ensemble avec points, niveau, actions rapides
- **`/trips`** - Suivi GPS trajets en temps réel avec points
- **`/missions`** - Missions locales des partenaires
- **`/rewards`** - Récompenses à débloquer
- **`/referral`** - Parrainage avec code unique
- **`/leaderboard`** - Classement ville
- **`/scan`** - Scanner QR code partenaire
- **`/profile`** - Profil utilisateur

### Pages partenaire
- **`/partner/setup`** - Formulaire création établissement (3 étapes)

## 🎨 Design

### Couleurs Beeclou
- **Background**: `#FFF8D6` (beige chaleureux)
- **Accent Yellow**: `#FFD83D` (jaune énergique)
- **Text**: `#111111` (noir)
- **Cards**: `#FFFFFF` (blanc)

### Composants réutilisables
- `BeeButton` - Boutons jaune ou secondaire
- `BeeCard` - Cartes blanches arrondie 3xl
- `BottomNav` - Navigation mobile fixe basse

## 🏗️ Stack technique

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **UI**: lucide-react, qrcode.react
- **Backend** (à configurer): Supabase
  - PostgreSQL
  - Auth (magic link + OAuth)
  - RLS (Row Level Security)
- **Géolocalisation**: Navigator.geolocation, Haversine formula
- **Déploiement**: Vercel ready

## 📊 Système de points

```
Distance km × 10         = points trajet
Visite partenaire        = 50 points (QR + GPS valides)
Mission complétée        = 100 points
Parrainage ami          = 150 points pour parrain
```

## 📦 Structure fichiers

```
src/
├── app/
│   ├── page.tsx              # Landing
│   ├── login/
│   ├── onboarding/
│   ├── dashboard/
│   ├── trips/
│   ├── missions/
│   ├── referral/
│   ├── leaderboard/
│   ├── scan/
│   ├── profile/
│   ├── partner/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── BottomNav.tsx
│   └── ui/
│       ├── BeeButton.tsx
│       ├── BeeCard.tsx
│       └── index.ts
└── lib/                      # À implémenter
    ├── supabase.ts
    ├── geocode.ts
    └── points.ts
```

## ✨ Prochaines étapes

### Phase 1: Intégration Supabase
- [ ] Schéma DB (7 tables + RLS)
- [ ] Auth magic link + Google OAuth
- [ ] Helpers: client/server/middleware Supabase

### Phase 2: Fonctionnalités utilisateur
- [ ] GPS tracking trajets (watchPosition)
- [ ] Calcul points automatique
- [ ] QR scan validation
- [ ] Classement en temps réel
- [ ] Système parrainage

### Phase 3: Partenaires
- [ ] Dashboard partenaire
- [ ] CRUD missions/récompenses
- [ ] Génération QR code
- [ ] Analytics performances

### Phase 4: Déploiement & optimisation
- [ ] Vercel deploy
- [ ] PWA manifests
- [ ] Optimisation mobile
- [ ] CI/CD pipeline

## 🛠️ Commands

```bash
npm run dev       # Démarrer dev
npm run build     # Build production
npm start         # Serveur production
npm run lint      # Linter
npm run typecheck # TypeScript strict
```