# 🐝 Beeclou MVP - Démo Streamlit

## 🚀 Lancer la démo

```bash
cd /home/user/Beeclou
streamlit run streamlit_demo.py
```

**URL**: `http://localhost:8502`

---

## 📱 Pages interactives (iOS mobile format)

### 1️⃣ Landing Page
```
                    [04:53 🌙] [📶 5G 🔋]
                    
                           🐝
                        BEECLOU
         Transforme tes déplacements en 
         revenus et avantages locaux
         
         ┌─────────────────────────────────┐
         │ ⚡ SE DÉPLACER                  │
         │ À vélo, marche, mobilité douce  │
         └─────────────────────────────────┘
         
         ┌─────────────────────────────────┐
         │ 🏆 GAGNER                       │
         │ Des points & récompenses locales │
         └─────────────────────────────────┘
         
         ┌─────────────────────────────────┐
         │ 👥 COMMUNAUTÉ                   │
         │ Rejoins ta ville & invite amis  │
         └─────────────────────────────────┘
         
              [➡️ COMMENCER]
          [🤝 JE SUIS PARTENAIRE]
          
         Paris et Clermont-Ferrand
         
         [🏠] [⚡] [🎯] [👥] [👤]  <- Bottom Nav
```

---

### 2️⃣ Login
```
                    [04:53 🌙] [📶 5G 🔋]
                    
                    🐝 BIENVENUE
                    
        ┌─────────────────────────────────┐
        │ 📧 TON EMAIL                    │
        │ ┌─────────────────────────────┐ │
        │ │ toi@exemple.fr              │ │
        │ └─────────────────────────────┘ │
        │                                 │
        │ [✨ ENVOYER LIEN MAGIQUE]      │
        └─────────────────────────────────┘
```

---

### 3️⃣ Onboarding (3 étapes)
```
ÉTAPE 1/3 (🔵🔵⚪)

          Quelle est ta ville?
          
          ○ Paris
          ○ Clermont-Ferrand
          
                [➡️ SUIVANT]
```

```
ÉTAPE 2/3 (🔵🔵⚪)

      Ton mode de transport préféré?
      
      ○ Vélo
      ○ Marche
      ○ Trottinette
      ○ Skateboard
      
      [⬅️ RETOUR]  [➡️ SUIVANT]
```

```
ÉTAPE 3/3 (🔵🔵🔵)

            Tes objectifs?
            
      ○ Gagner des points
      ○ Découvrir des lieux
      ○ Aider la planète
      ○ Socialiser
      
      [⬅️ RETOUR]  [✅ TERMINER]
```

---

### 4️⃣ Dashboard
```
                    [04:53 🌙] [📶 5G 🔋]
                    
         ┌───────────────────────────────┐
         │  POINTS TOTAUX                │
         │         2450                  │
         └───────────────────────────────┘
         
         ┌───────────────────────────────┐
         │ 🏆 NIVEAU 7                   │
         │ Vers le niveau 8              │
         │ 2450/3000 ████████░░░░ 82%    │
         └───────────────────────────────┘
         
         ACTIONS RAPIDES
         ┌──────────────┬──────────────┐
         │ ⚡           │  🎯          │
         │ TRAJETS      │  MISSIONS    │
         ├──────────────┼──────────────┤
         │ 📱           │  👥          │
         │ SCANNER      │  PARRAINER   │
         └──────────────┴──────────────┘
         
         📊 ACTIVITÉ RÉCENTE
         ┌───────────────────────────────┐
         │ 3.2 km (Aujourd'hui)          │
         │                   +32 pts     │
         ├───────────────────────────────┤
         │ 5.1 km (Hier)                 │
         │                   +51 pts     │
         ├───────────────────────────────┤
         │ 2.8 km (22 mai)               │
         │                   +28 pts     │
         └───────────────────────────────┘
         
         [🏠] [⚡] [🎯] [👥] [👤]
```

---

### 5️⃣ Trajets (GPS Tracking)
```
INACTIF:
         ┌───────────────────────────────┐
         │           🚴                  │
         │  COMMENCE UN TRAJET           │
         │ Mesure ta distance et gagne   │
         │        des points             │
         │  [📍 DÉMARRER LE GPS]         │
         └───────────────────────────────┘

ACTIF (Simulation):
         ┌───────────────────────────────┐
         │ 🔴 TRAJET ACTIF               │
         │ DISTANCE: 2.45 km             │
         │ POINTS: +24 pts               │
         │ [⏹️ TERMINER LE TRAJET]        │
         └───────────────────────────────┘

HISTORIQUE:
         ┌───────────────────────────────┐
         │ 4.5 km (23 mai, 18h30)        │
         │ 32 min                +45 pts │
         ├───────────────────────────────┤
         │ 3.2 km (22 mai, 17h00)        │
         │ 24 min                +32 pts │
         ├───────────────────────────────┤
         │ 5.8 km (21 mai, 19h00)        │
         │ 38 min                +58 pts │
         └───────────────────────────────┘
```

---

### 6️⃣ Missions
```
         🎯 MISSIONS LOCALES
         
         ┌───────────────────────────────┐
         │ Visite la Boulangerie du Cœur │
         │ Scanne le QR code             │
         │ 📍 Boulangerie du Cœur • 0.8km│
         │           [✅ ACCEPTER]       │
         │                    +100 pts   │
         └───────────────────────────────┘
         
         ┌───────────────────────────────┐
         │ Découvre la Librairie Locale  │
         │ Visite le lieu                │
         │ 📍 Librairie L'Oasis • 1.2 km │
         │           [✅ ACCEPTER]       │
         │                    +150 pts   │
         └───────────────────────────────┘
         
         ┌───────────────────────────────┐
         │ Gym à Ciel Ouvert             │
         │ 5 trajets cette semaine       │
         │ 📍 Parc du Cèdre              │
         │        ✓ COMPLÉTÉE            │
         │                    +200 pts   │
         └───────────────────────────────┘
```

---

### 7️⃣ Parrainage
```
         👥 PARRAINAGE
         
      ┌─────────────────────────────┐
      │  TON CODE DE PARRAINAGE     │
      │     BEE8F2K1               │
      │  [📋 COPIER LE CODE]        │
      └─────────────────────────────┘
      
      STATS:
      ┌──────────────┬──────────────┐
      │ AMIS INVITÉS │ POINTS GAGNÉS│
      │      3       │     +450     │
      └──────────────┴──────────────┘
      
      🎁 AMIS PARRAINÉS:
      ┌─────────────────────────────┐
      │ Marie (15 mai)       +150 pts│
      ├─────────────────────────────┤
      │ Thomas (10 mai)      +150 pts│
      ├─────────────────────────────┤
      │ Sophie (5 mai)       +150 pts│
      └─────────────────────────────┘
```

---

### 8️⃣ Scanner QR
```
INACTIF:
      ┌─────────────────────────────┐
      │           📱                │
      │  POINTE TON TÉLÉPHONE       │
      │  vers le QR code            │
      │   [🔍 SIMULER UN SCAN]       │
      └─────────────────────────────┘

ACTIF (Après scan):
      ┌─────────────────────────────┐
      │           ✨                │
      │   VISITE VALIDÉE!           │
      │  Boulangerie du Cœur        │
      │      +50 PTS                │
      │  [🔄 SCANNER UN AUTRE QR]    │
      └─────────────────────────────┘
```

---

### 9️⃣ Profil
```
         ┌───────────────────────────────┐
         │            👤                │
         │           JEAN               │
         │          PARIS               │
         └───────────────────────────────┘
         
         STATS:
         ┌──────┬──────┬──────┐
         │ POINTS │ NIVEAU │ TRAJETS │
         │  2450  │   7   │   24   │
         └──────┴──────┴──────┘
         
         INFOS:
         📧 jean@exemple.fr
         🏙️ Paris
         🚴 Vélo
         
         [⚙️ PARAMÈTRES]
         [🚪 SE DÉCONNECTER]
```

---

### 🔟 Leaderboard
```
         🏆 CLASSEMENT PARIS
         
         ┌──────────────────────────────┐
         │ 🥇 Antoine    4850 pts Lv.10 │
         ├──────────────────────────────┤
         │ 🥈 Claire     4320 pts Lv.9  │
         ├──────────────────────────────┤
         │ 🥉 Thomas     3950 pts Lv.9  │
         ├──────────────────────────────┤
         │ 🚀 Jean       2450 pts Lv.7  │
         ├──────────────────────────────┤
         │ Marie         2100 pts Lv.6  │
         ├──────────────────────────────┤
         │ Sophie        1850 pts Lv.5  │
         └──────────────────────────────┘
```

---

### 1️⃣1️⃣ Partner (Présentation)
```
         🤝 DEVENIR PARTENAIRE
      
    Générez du trafic local et boostez
           votre clientèle
           
    🏪 AUGMENTEZ VOTRE VISIBILITÉ
       Atteignez des milliers d'utili...
       
    ⚡ CRÉEZ DES MISSIONS
       Engagez clients avec défis
       
    📊 DASHBOARD ANALYTICS
       Suivez performances en temps réel
       
    [✅ CRÉER MON COMPTE PARTENAIRE]
    [📋 VOIR LES TARIFS]
```

---

### 1️⃣2️⃣ Partner Setup (Formulaire 3 étapes)
```
ÉTAPE 1/3: Infos établissement
    ┌──────────────────────────────┐
    │ Nom:                         │
    │ [Boulangerie du Cœur       ] │
    │ Catégorie: [Restauration ▼] │
    │ Ville: [Paris ▼]            │
    │ Adresse:                     │
    │ [123 Rue de la Paix, Paris ] │
    │               [➡️ SUIVANT]  │
    └──────────────────────────────┘

ÉTAPE 2/3: Contact
    ┌──────────────────────────────┐
    │ Email:                       │
    │ [contact@boulangerie.fr    ] │
    │ Téléphone:                   │
    │ [+33 1 23 45 67 89         ] │
    │ [⬅️ RETOUR] [➡️ SUIVANT]    │
    └──────────────────────────────┘

ÉTAPE 3/3: Confirmation
    ┌──────────────────────────────┐
    │           🎉                │
    │   VOUS ÊTES PRÊT!            │
    │ Générez votre code QR et     │
    │ créez vos missions           │
    │ [⬅️ RETOUR] [✅ TERMINER]    │
    └──────────────────────────────┘
```

---

## 🎨 Design System Appliqué

✅ **Couleurs**:
- Background: `#FFF8D6` ☀️
- Buttons: `#FFD83D` ⚡
- Text: `#111111` 🖤
- Cards: `#FFFFFF` ☁️

✅ **Composants**:
- Cards arrondie 24px
- Boutons full-width
- Navigation fixe bottom
- Status bar iOS

✅ **Layout**:
- Mobile-first (400px width)
- Responsive grid
- Shadow subtile
- Spacing généreux

---

## 🛠️ Tech Stack

```
Streamlit    - App interactif
Python 3     - Backend
HTML/CSS     - Styling iOS
Session State- Navigation
```

---

## 🚀 Fonctionnalités démo

✅ Navigation fluide entre 12 pages
✅ Onboarding interactif 3 étapes
✅ Dashboard avec stats en temps réel
✅ GPS tracking simulé
✅ Scanner QR interactif
✅ Formulaires partner 3 étapes
✅ Responsive design iOS
✅ Bottom nav fixe

---

## 📊 Stats démo

- **Pages**: 12 pages interactives
- **Composants**: 50+ éléments Streamlit
- **Lignes de code**: ~650 lignes Python
- **Design**: 100% conforme Beeclou brand
- **Format**: iOS mobile 400px

---

## ✨ Prochaines étapes

1. **Backend réel**: Intégrer Supabase
2. **Auth vrai**: Magic link + OAuth Google
3. **GPS réel**: navigator.geolocation API
4. **Base données**: 7 tables + RLS
5. **Deploy**: Vercel + Streamlit Cloud

---

**Créé le**: 2026-05-23  
**Branch**: `claude/beeclou-mvp-setup-8QYrp`  
**URL Démo**: `http://localhost:8502`
