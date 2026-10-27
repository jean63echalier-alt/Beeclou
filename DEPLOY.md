# Publier beeclou v3 sur Hostinger (non fait, en attente de validation de Jean)

Aperçu local : `node <skill>/scripts/serve.mjs --root builds/beeclou-v3 --port 4700` puis http://localhost:4700/

Fichiers à envoyer dans `public_html` (un par un, jamais d'archive complète : elle écraserait `nouveau/`, `blog/`, `assets/`, `.htaccess`, `send.php`) :
- `index.html`, `annonceur.html`, `cycliste.html` (remplacent les versions en ligne ; sauvegarder d'abord)
- `beeclou.css`, `beeclou.js`, `og-beeclou-v3.jpg`
- le dossier `site-assets/` (nouveau, aucun conflit avec `assets/`)
- `mentions-legales.html` et `confidentialite.html` : inchangés, ne pas toucher ceux du serveur
- `send.php` du serveur est réutilisé tel quel (POST : Email, _subject, website = piège à robots)

Après publication : `accueil-mobile.html` et `proposition-mobile.html` ne sont plus utilisés (le site est responsive). Vérifier avec curl, pas avec le panneau navigateur (beeclou.fr y est bloqué).
Images en cache 1 an : si une image de `site-assets/` est remplacée sous le même nom, ajouter `?v=AAAAMMJJ` dans le HTML.

## Suivi des clics (prêt, non branché)
`beeclou.js` envoie `cta_click` et `form_submit` à Plausible, GA4 ou `dataLayer` s'ils sont présents. Pour activer : ajouter dans le `<head>` des 3 pages le script Plausible de ton compte (ou GA4). Rien n'est envoyé sans ça.

## À fournir par Jean (non inventé dans le site)
kilomètres du pilote, vues estimées, témoignage cycliste, logo d'un annonceur ou magasin partenaire, comparatif de coût (4×3, flyer, Meta Ads), grille hebdomadaire des contrats, réponses FAQ (assurance, vol, durée de pose, résiliation), exemple de calcul en km pour « jusqu'à 25 € », numéro WhatsApp / lien Cal.com, nom et photo du fondateur, tarif et nombre de places « fondateur ».
