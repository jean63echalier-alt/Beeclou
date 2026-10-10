# Mise à jour SEO du site en ligne (beeclou.fr)

Ces fichiers sont les versions **corrigées du site actuellement en ligne** (hébergé chez Hostinger),
qui n'est pas dans la branche `main` de ce dépôt (ancienne version).

À téléverser à la racine du site (Hostinger, gestionnaire de fichiers) en remplaçant les fichiers existants :
`index.html`, `accueil-mobile.html`, `cycliste.html`, `annonceur.html`, `sitemap.xml`, `robots.txt`, `llms.txt`.

Changements :
- `cycliste.html` / `annonceur.html` : titre et description orientés recherche, balise canonique,
  Open Graph, Twitter, données structurées (FAQ, offres 600/3 300/7 500 €, fil d'Ariane).
- `index.html` / `accueil-mobile.html` : données structurées Organization + WebSite, Twitter,
  et liens dans le pied de page vers les pages Cyclistes et Annonceurs (elles n'étaient liées
  depuis aucune page).
- `index.html` : le titre H1 contient désormais "publicité locale à vélo" (texte masqué visuellement, design inchangé).
- `sitemap.xml` : dates `lastmod` ajoutées. `llms.txt` : résumé du site pour les assistants IA.

Ensuite : dans Google Search Console, soumettre `https://beeclou.fr/sitemap.xml`.
