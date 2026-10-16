---
name: beeclou-reels
description: Produit les reels Instagram de Beeclou (publicité sur vélos urbains, Clermont-Ferrand) à partir d'images IA et de motion design uniquement. Utiliser pour écrire un script de reel, ses hooks, les prompts d'images, la légende, ou la spec Remotion d'un reel du calendrier éditorial.
---

# Beeclou : production de reels

## Règles de marque (non négociables)
- **Aucune marque réelle** (logo, nom, y compris Working Bicycle) dans les visuels ou textes. Logos fictifs : « Banque Exemple », « Marché Exemple », etc.
- **Rémunération des cyclistes : toujours une promesse à venir** (« jusqu'à 25 €/mois une fois les annonceurs trouvés »), jamais un fait acquis. Aucun cycliste n'est rémunéré aujourd'hui.
- **Pilote à Clermont-Ferrand.** Ne jamais écrire « partout en France ».
- **« jusqu'à 83 vélos »** = budget théorique de 5 000 € à 60 €/vélo/mois, pas le réseau actuel (15 cyclistes).
- Tout visuel avec des prix ou comparatifs porte l'overlay **« Estimations indicatives »**.
- Le **top case** (boîte publicitaire rectangulaire, bois clair + plastique recyclé) apparaît dans un maximum de reels.
- Ton : engagé, pragmatique, local. Pas de sponsoring pour l'instant.
- Palette : crème `#F7F3EA`, vert sauge `#8FA68A`, or/miel `#D9A927`, noir `#17130F` (valeurs de `beeclou.css`).

## Structure d'un reel (15-30 s, 9:16)
1. **Hook 0-3 s** : visuel fort dès l'image 1 + phrase courte à l'écran, lisible sans le son. Patterns : chiffre précis, erreur courante, opinion tranchée, question, avant/après.
2. **2 à 4 beats** de 4-6 s : une idée par plan, texte à l'écran de 12 mots maximum, mouvement à chaque plan (zoom lent, parallaxe, texte animé).
3. **CTA final** 1-2 s : « beeclou.fr » (+ « Dès 600 € » côté annonceurs, « Rejoins-nous » côté cyclistes).

Pour chaque reel, proposer **3 à 4 variantes de hook** sur le même corps de script, puis comparer le taux de vue au-delà de 3 s dans Instagram Insights.

## Livrables pour un reel
1. Un fichier `reels/specs/NN-slug.json` (voir `specs/01-5000-euros.json` pour le format).
2. 1 prompt d'image par plan (style « photo réaliste », lumière naturelle, Clermont-Ferrand, palette cohérente).
3. Légende + hashtags (`#Beeclou #PubliciteMobile #ClermontFerrand`).
4. Liste de contrôle des règles de marque ci-dessus, cochée.

## Outils
Remotion (+ skill officiel remotion-dev/skills) pour le montage ; Gemini ou autre générateur pour les images ; les specs JSON alimentent un template Remotion unique.
