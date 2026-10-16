# Reels Beeclou : production

Pipeline : images IA de Jean → vidéos 9:16 (Remotion) + légendes + planning.
Plan éditorial : 61 reels, un tous les 3 jours, du 16 octobre 2026 au 14 avril 2027.

## 1. Déposer les images

```
reels/assets/reel-NN/plan-1.png   (NN = 01 à 61)
reels/assets/reel-NN/plan-2.png
reels/assets/reel-NN/plan-3.png   (le reel 08 va jusqu'à plan-6.png)
```

9:16, idéalement 1080×1920 ou plus, **sans texte** dans l'image (le texte est ajouté au montage).
Les prompts de chaque plan sont dans `data/reels.json` (champ `prompt`).
Image déjà validée : `IMG_3504.png` → à copier en `assets/reel-01/plan-1.png`.

Optionnel : `assets/brand/logo.png` (logo, sinon logo du site), `assets/music/` (une piste libre de droits).

## 2. Rendre les vidéos

```bash
cd reels && npm install
npm run render -- --reel 1,8        # certains reels
npm run render -- --all             # les 61
npm run render -- --reel 8 --placeholders   # aperçu même sans images (fichier *-apercu.mp4)
npm run studio                      # aperçu interactif
```

Sortie : `out/reel-NN.mp4` (H.264, 1080×1920, 30 fps). Un reel dont des images manquent est ignoré.
Si Chrome n'est pas trouvé : `BROWSER_EXECUTABLE=/chemin/vers/chrome-headless-shell`.

Montage : hook en grand dès la 1re seconde, texte de chaque plan, zoom/déplacement lent sur chaque
image, fondu de 0,2 s, zone sûre Instagram (150 px haut, 250 px bas), logo + beeclou.fr sur la dernière image.

## 3. Données, légendes, planning

`python3 tools/build_data.py` régénère `data/reels.json`, `out/reel-NN-legende.txt` (61),
`out/planning.csv` (créneaux 12 h 30 / 18 h 30 en alternance, à tester) et `out/a-verifier.md`.

**Avant chaque publication** : lire `out/a-verifier.md`. Les reels 10, 20, 40, 50 et 61 contiennent
des chiffres à mettre à jour. Sans modifier le code, créez `data/overrides.json` :

```json
{ "10": { "plans": { "2": "17 cyclistes nous ont rejoints." } } }
```

(clés possibles par reel : `hook`, `plans` {n° du plan: texte}, `legende`). Les reels 41 (incubateur)
et 47 (marques locales) ne sont à publier que si c'est vrai à la date prévue.

## Règles de marque
Voir `SKILL.md` : palette du site (`beeclou.css`), rémunération des cyclistes = objectif conditionnel
(« jusqu'à 25 €/mois »), « jusqu'à » pour les vélos, « Estimations indicatives » sur les reels avec prix
(8, 53, 58), aucune marque réelle, « Personnage et décor générés par IA » sur les portraits.

Licence Remotion : gratuite pour les petites structures, voir remotion.dev/license.
