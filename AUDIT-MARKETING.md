# Audit Marketing : Beeclou
**URL :** https://www.beeclou.fr (redirige en 301 vers https://beeclou.fr)
**Date :** 26 octobre 2026
**Type de business :** Marketplace à deux faces (annonceurs locaux ↔ cyclistes porteurs de boîtes publicitaires), en phase pilote
**Score Marketing Global : 69/100 (Note : C)**

> Méthode : suite `mounra/ai-marketing` (`/market audit`). Pages analysées : accueil, `annonceur.html`, `cycliste.html`, plus `robots.txt` et `sitemap.xml`. Les 5 volets d'agents ont été appliqués en une seule passe, pas en sous-agents parallèles. Les performances de chargement n'ont pas été mesurées (pas de PageSpeed). Les comparaisons concurrentielles s'appuient sur le contenu du site, pas sur un scan live des concurrents.

---

## Résumé exécutif

Beeclou obtient **69/100 (C)**. Le message est net, l'offre est chiffrée et le site est propre techniquement. Il manque surtout de la **preuve** : pour un produit encore en phase pilote, on promet beaucoup et on démontre peu.

**Plus grand atout.** La proposition de valeur tient en une phrase (« La pub qui fait rouler la ville »). La page annonceurs est excellente : elle compare 5 000 € investis chez Beeclou, en panneau 4×3, en Meta et en flyers. Les 4 packs sont clairs (270 € à 1 100 €/mois et plus). Le tarif est affiché, ce qui est rare en publicité locale. Le fonctionnement est expliqué étape par étape, et l'honnêteté sur les limites (« un maximum, pas un revenu garanti », « bientôt disponible ») crée de la confiance.

**Plus grande lacune.** Le site n'a **aucun mesurage** (ni analytics, ni pixel de conversion) et **aucune preuve sociale** (ni témoignage, ni photo de campagne réelle, ni nom d'annonceur, ni lien réseau social). La seule statistique de la home est une étude de 2022 (Intervista AG). L'application de mesure, argument central pour l'annonceur, est « bientôt disponible ». Il est donc impossible de savoir aujourd'hui d'où viennent les demandes ni lesquelles aboutissent.

**3 actions prioritaires :**
1. Installer un outil d'analytics respectueux de la vie privée (Plausible, Matomo) et suivre l'envoi des deux formulaires.
2. Publier des preuves du pilote : photos du premier vélo, chiffres réels, premier annonceur ou citation du cycliste.
3. Raccourcir la méta description (211 caractères), ajouter des données structurées (FAQ, Offer) et publier 3 à 5 pages de contenu local.

**Impact estimé :** en phase pilote, le volume est trop faible pour une projection fiable. Les montants ci-dessous sont des ordres de grandeur à valider avec vos vrais chiffres de trafic.

---

## Décomposition des scores

| Catégorie | Score | Poids | Pondéré | Constat clé |
|---|---|---|---|---|
| Contenu & Messages | 78/100 | 25 % | 19,5 | Message clair, pages annonceur et cycliste très abouties |
| Optimisation Conversion | 68/100 | 20 % | 13,6 | CTA bien placés et formulaires courts, mais zéro preuve et aucun suivi |
| SEO & Visibilité | 66/100 | 20 % | 13,2 | Base saine (canonical, OG, sitemap), mais site de 3 pages sans contenu éditorial |
| Positionnement concurrentiel | 70/100 | 15 % | 10,5 | Comparatif chiffré efficace, mais ce n'est pas la question que se pose l'annonceur au départ |
| Marque & Confiance | 62/100 | 10 % | 6,2 | Identité forte, mais pas de réseaux, pas d'équipe, pas de références |
| Croissance & Stratégie | 58/100 | 10 % | 5,8 | Un seul canal d'entrée (formulaire), pas de parrainage ni de contenu |
| **TOTAL** | | **100 %** | **68,8 ≈ 69** | **Note C** |

---

## Gains rapides (cette semaine)

1. **Installer un analytics sans cookie** (Plausible/Matomo). Aucun outil n'est détecté sur le site. Suivre : clic sur « Commander », « Réserver ma boîte », envoi des formulaires, source de trafic.
2. **Raccourcir la méta description** de la home : 211 caractères, contre 150 à 160 affichés par Google. Proposition : « Une pub sur le vélo d'un habitant, vue dans son quartier. Dès 270 € pour 3 vélos pendant 1 mois. Proposition sous 24 h. »
3. **Mettre à jour la preuve chiffrée.** Les « 55 % voient les boîtes publicitaires » viennent d'une étude de 2022. Ajouter votre propre chiffre du pilote, même modeste (« 1er vélo en circulation depuis [date], [X] km parcourus »).
4. **Ajouter les liens de vos réseaux sociaux** (LinkedIn, Instagram) dans le pied de page. Aucun lien n'est détecté. Ajouter aussi `sameAs` dans le schéma `Organization`.
5. **Ajouter l'attribut `alt` manquant** (1 image sur 8 sans alt) et vérifier que les images clés ont un texte descriptif.
6. **Réactiver la transparence sur le pilote.** « Phase pilote 2025 à 2026 » dans le pied de page est ambigu à la fin d'octobre 2026. Indiquer la date de fin ou le statut actuel.
7. **Corriger l'ambiguïté du CTA principal.** Le premier lien du bandeau (« Nous contacter ») pointe vers `#proposition`. Distinguer clairement les deux parcours dès le haut de la page (« Je suis annonceur » / « Je suis cycliste » existe déjà, c'est bien : en faire le CTA principal, sans « Nous contacter » en concurrence).
8. **Remplacer le `method="GET"` des formulaires par POST** (ou vérifier qu'ils sont bien envoyés en JavaScript). L'analyse détecte `GET` avec action vide : si un envoi tombe en GET, l'adresse e-mail du visiteur se retrouve dans l'URL.

## Recommandations stratégiques (ce mois)

1. **Construire un dossier de preuves du pilote** : galerie de photos du vélo en circulation, citation du premier cycliste, témoignage du premier commerçant partenaire ou annonceur, étude de cas d'une campagne avec chiffres. C'est le levier de conversion n° 1 d'un produit nouveau.
2. **Ajouter un bloc FAQ avec balisage `FAQPage`** : la page annonceur contient déjà 5 questions. Les baliser rend le site éligible aux résultats enrichis et aux réponses des assistants IA.
3. **Créer des pages locales** (`/publicite-velo-lyon`, etc.). Votre exemple de formulaire cite Lyon. Les annonceurs cherchent « publicité vélo + ville » : une page par ville de lancement capte cette recherche.
4. **Lancer un blog ou des guides** : « Combien coûte une pub locale ? », « Panneau 4×3 vs publicité sur vélo », « Comment mesurer une campagne locale ». Le comparatif 5 000 € de la page annonceur est déjà un excellent contenu à décliner.
5. **Séquencer l'acquisition des deux faces séparément.** Côté cyclistes : magasins de cycle partenaires, groupes locaux, associations de vélo. Côté annonceurs : commerces de quartier, restaurants, salles de sport, événements. Prévoir un e-mail de suivi automatique dans les 24 h promises.
6. **Ajouter un parrainage cycliste** (un cycliste en parraine un autre) : le coût d'acquisition cycliste est faible et le produit s'y prête.

## Initiatives à long terme (ce trimestre)

1. **Publier l'application et un tableau de bord annonceur démo.** La mesure est l'argument différenciant ; tant qu'elle est « bientôt disponible », montrer une maquette ou des captures concrètes.
2. **Programme de références annonceurs** avec logos, chiffres et rapports de diffusion types.
3. **Stratégie d'avis et de presse locale** : presse quotidienne régionale, médias vélo, mairies et communautés d'agglomération.
4. **Découpage par secteur** (restauration, immobilier, événementiel) avec offres et pages dédiées.

---

## Analyse détaillée par catégorie

### Contenu & Messages — 78/100

| Dimension | Note |
|---|---|
| Clarté du titre | 8/10 |
| Proposition de valeur | 8/10 |
| Persuasion du copy | 7/10 |
| Profondeur du contenu | 8/10 |
| Efficacité des CTA | 8/10 |

**Points forts**
- H1 mémorable et lisible. Pitch en 3 étapes : cycliste, marque locale, ville.
- Page annonceurs (≈ 950 mots) : parcours en 7 étapes, FAQ, packs détaillés avec prix mensuel, prix par vélo et coûts annexes.
- Page cyclistes (≈ 620 mots) : honnêteté sur le revenu (« un maximum, pas un revenu garanti »), conditions claires (3 jours et 10 km par semaine, caution 40 €).
- Sérieux sur la vie privée : données agrégées, début et fin de trajet ignorés.

**Corrections à fort impact**
- La home (329 mots) ne répond pas à « combien de personnes verront ma pub ? » : l'estimation d'audience est reportée à l'application. Donner au moins un ordre de grandeur (impressions estimées par vélo et par mois, avec la méthode).
- « Phase pilote ouverte » apparaît plusieurs fois sans date de début ni de fin.

**Réécritures avant / après**

*Home, chapô*
- Avant : « Une boîte sur le vélo d'un habitant. La marque est vue, le cycliste touche un forfait par semaine de campagne. »
- Après : « Votre pub sur un vélo d'habitant, vue chaque jour dans votre quartier. À partir de 270 € pour 3 vélos pendant 1 mois. »
- Pourquoi : met le bénéfice annonceur et le prix en premier. Le mécanisme de rémunération est un détail pour le cycliste.

*CTA annonceur*
- Avant : « Commander »
- Après : « Recevoir ma proposition en 24 h »
- Pourquoi : « Commander » promet un achat immédiat, alors que le visiteur demande en réalité un devis. Le bénéfice et le délai rassurent.

**Éléments manquants** : témoignages, photos de campagne réelle, exemple de visuel de pub posé sur une boîte, vidéo de 30 secondes.

### Optimisation de la conversion — 68/100

| Dimension | Note |
|---|---|
| Stratégie de CTA | 8/10 |
| Preuve sociale | 2/10 |
| Friction | 8/10 |
| Signaux de confiance | 5/10 |
| Urgence et rareté | 5/10 |

**Parcours** : home, choix « Annonceur / Cycliste », formulaire de 3 champs (annonceur) ou 3 champs (cycliste), réponse sous 24 h ou 24 à 48 h.

**Points forts** : formulaires très courts (3 champs obligatoires), exemple de saisie dans le champ « Ville et budget » (« Ex. : Lyon, 480 € par mois »), 4 à 5 CTA répartis sur la page, promesse de délai de réponse, lien vers la confidentialité sous chaque formulaire.

**Fuites détectées**
- **Aucune preuve sociale** : le visiteur annonceur ne voit ni client, ni témoignage, ni chiffre du pilote.
- **Pas de suivi** : impossible de mesurer le taux de conversion visiteur, formulaire envoyé, proposition acceptée.
- **Délai de rappel du cycliste de 24 à 48 h** puis choix d'un magasin : parcours long. Afficher la liste ou la carte des magasins partenaires dès la page pour rassurer.
- **L'application n'existe pas encore** alors qu'elle est un pilier du produit (mesure côté annonceur, rémunération côté cycliste).

**Gains rapides CRO** : ajouter 1 photo de campagne réelle près du premier CTA, afficher le nombre de places restantes dans le pilote (si vrai), proposer un téléphone ou un rendez-vous en plus du formulaire pour les annonceurs au budget plus élevé.

**Hypothèses de tests A/B**
1. CTA « Commander » vs « Recevoir ma proposition en 24 h ».
2. Prix dès 270 € dans le H1 vs dans le sous-titre.
3. Photo du vélo en circulation vs illustration actuelle.

### SEO & Visibilité — 66/100

| Dimension | Note |
|---|---|
| Structure de page | 8/10 |
| Crawlabilité | 8/10 |
| Performance | non mesurée |
| Mobile | 8/10 (viewport présent) |

**Constats**
- Balise title de 41 caractères, correcte. Canonical et balises Open Graph présentes, 1 seul H1 par page.
- `robots.txt` correct, `sitemap.xml` déclaré (3 URL : accueil, cyclistes, annonceurs).
- Redirection `www` vers apex en 301 : correct, mais vérifier que les liens internes et le sitemap utilisent bien la version finale (c'est le cas).
- **Méta description trop longue** (211 caractères) sur la home.
- **Données structurées** : seulement `Organization`. Ajouter `FAQPage`, `Offer` (packs) et `LocalBusiness` si adresse.
- **Aucun lien social, aucun backlink détecté** depuis le site.
- 8 images dont 1 sans `alt`, 4 en chargement différé : bien.
- Scripts tiers : GSAP et vanilla-tilt chargés depuis cdnjs, plus 3 scripts maison. Mesurer le poids réel avec PageSpeed Insights ; les animations peuvent peser sur le LCP mobile.
- **Contenu éditorial absent** : 3 pages au total, un seul mot-clé évident (« publicité vélo »). Opportunité forte sur les requêtes locales.
- Tracking : 0 outil détecté.

**Gains rapides SEO** : méta description, `alt`, balisage FAQ, liens sociaux, 1 page par ville de lancement.

### Positionnement concurrentiel — 70/100

| Dimension | Note |
|---|---|
| Clarté du positionnement | 8/10 |
| Compétitivité des prix | 8/10 |
| Messagerie des fonctionnalités | 6/10 |
| Conscience du marché | 7/10 |
| Autorité de contenu | 4/10 |

**Concurrents de référence (catégories)** : affichage 4×3, publicité Meta/Google locale, distribution de flyers, autres supports mobiles (bus, vélos-taxis, véhicules). Pas de scan live des acteurs précis dans cet audit.

**Positionnement** : « pub locale, à l'échelle du quartier, portée par des habitants ». Le comparatif de la page annonceur est le point le plus fort du site : il traduit 5 000 € en volume de présence pour chaque canal.

**Faiblesse** : la comparaison en annonces (« 55 à 90 vélos » contre « 250 000 à 500 000 apparitions ») met côte à côte des unités différentes. Le site le reconnaît honnêtement (« ces supports ne se mesurent pas de la même façon »). Pour convaincre, il faudra à terme un coût par personne touchée.

**Opportunités** : se positionner comme **la publicité locale mesurable et à impact social** (le cycliste est payé), et occuper tôt les requêtes régionales avant l'arrivée d'autres acteurs.

### Marque & Confiance — 62/100

| Dimension | Note |
|---|---|
| Cohérence de marque | 8/10 |
| Architecture de confiance | 5/10 |
| Signaux d'autorité | 4/10 |

- Identité visuelle cohérente (typographie DM Sans + Playfair Display, ton direct).
- Page À propos absente : pas d'équipe, pas d'histoire, pas de visages. Pour un service qui demande à un cycliste de porter une boîte et à un annonceur de payer à l'avance, c'est le principal frein de confiance.
- Contact : une seule adresse e-mail. Pas de téléphone, pas d'adresse, pas de lien réseau social.
- Mentions légales et confidentialité présentes.
- Le site mentionne un widget de chat (script `beeclou-chat.js`) : à vérifier qu'il est bien actif et utile.

### Croissance & Stratégie — 58/100

| Dimension | Note |
|---|---|
| Stratégie de tarification | 8/10 |
| Canaux d'acquisition | 3/10 |
| Fidélisation et expansion | 5/10 |

- **Tarification** : l'un des points les plus aboutis. Grille à 4 paliers (Éclair, Visibilité, Impact, Premium), prix décroissant avec le volume (90 → 55 €/vélo), frais annexes détaillés (création 150 €, offerte dès 3 mois ; impression et pose 15 €/vélo ; rapport 100 €, inclus dès Impact).
- **Acquisition** : un seul canal visible, le formulaire. Aucun blog, réseau social, parrainage, programme d'affiliation ou partenariat affiché (hormis les magasins de cycle).
- **Fidélisation** : prévoir le renouvellement de campagne et la montée en pack (Éclair → Visibilité) avec un rapport final automatique.
- **Équilibre des deux faces** : si l'offre cycliste monte plus vite que la demande annonceur (ou l'inverse), le pilote s'enraye. Définir un seuil de lancement par quartier.

---

## Comparaison concurrentielle

| Support | Budget type | Ce que l'on obtient | Mesure |
|---|---|---|---|
| Panneau 4×3 | ≈ 500 €/face/semaine | 1 emplacement fixe | Estimation d'audience |
| Pub Meta | 10 à 20 € / 1 000 apparitions | Ciblage fin, écran de téléphone | Précise |
| Flyers | 65 à 95 € / 1 000 | Distribution en plus | Faible |
| **Beeclou** | 55 à 90 €/vélo/mois | Présence mobile dans le quartier | Application « bientôt » |

*(Chiffres tirés de la page annonceurs de Beeclou, estimations déclarées « indicatives » par le site.)*

---

## Résumé de l'impact sur les revenus

Estimations très prudentes, à recalibrer avec vos vrais chiffres de trafic une fois l'analytics en place.

| Recommandation | Impact mensuel estimé | Confiance | Délai |
|---|---|---|---|
| Analytics et suivi des conversions | Indirect (permet d'optimiser tout le reste) | Élevée | 1 semaine |
| Preuves du pilote (photos, témoignage, étude de cas) | +20 à 40 % de demandes annonceurs | Moyenne | 2 à 4 semaines |
| CTA et méta description réécrits | +5 à 15 % de clics | Moyenne | 1 semaine |
| Pages locales et contenu SEO | 5 à 15 demandes qualifiées/mois à 3 à 6 mois | Faible à moyenne | 8 à 12 semaines |
| Parrainage cyclistes | Réduction du coût d'acquisition cycliste | Moyenne | 4 semaines |
| **Potentiel total** | **à chiffrer après 30 jours de données** | | |

Une conversion de la demande en campagne à un pack Éclair (270 €) ou Visibilité (1 440 € sur 3 mois) donne l'échelle : chaque annonceur supplémentaire gagné vaut entre 270 € et plus de 2 000 €.

---

## Prochaines étapes

1. Installer Plausible ou Matomo, et suivre l'envoi des deux formulaires.
2. Rassembler les premières preuves du pilote (photos, chiffres, citation) et les placer sous le H1 de la home.
3. Réécrire la méta description et le CTA principal, ajouter les liens sociaux et le balisage FAQ.

*Généré par la Suite Marketing IA — `/market audit`*
