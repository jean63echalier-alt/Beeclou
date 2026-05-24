# ⚡ Quick Start Beeclou V1

**5 minutes pour avoir le site live sur vercel.fr!**

## 1️⃣ Vérifier que c'est prêt (1 min)

```bash
# Terminal dans Beeclou/
npm install          # Dépendances (already done)
npm run build        # Build (déjà fait)
npm run preview      # Voir le build (optionnel)
```

✅ Si aucune erreur → **Pas de build issues**

## 2️⃣ Pousser sur GitHub (1 min)

```bash
# Code déjà pushé sur :
git log --oneline | head -3

# Vérifier la branche
git branch
# Doit être : * claude/beeclou-v1-site-57bFG

# Si modifications locales à pousser :
git add .
git commit -m "Update: [votre message]"
git push origin claude/beeclou-v1-site-57bFG
```

✅ Code visibile sur GitHub

## 3️⃣ Importer dans Vercel (2 min)

**Aller sur [vercel.com](https://vercel.com)**

1. **Sign in** avec GitHub (OAuth)
2. **Import Project**
3. Chercher et sélectionner : `jean63echalier-alt/Beeclou`
4. Branch: `claude/beeclou-v1-site-57bFG`
5. Vercel auto-détecte Vite ✅
6. Cliquer **Deploy**

**Attendre 2-3 minutes...**

✅ Site live sur `https://beeclou.vercel.app`

## 4️⃣ Connecter le domaine beeclou.fr (BONUS - 1 min)

**Option simple :**

1. Vercel → Project Settings → Domains
2. Ajouter `beeclou.fr`
3. Vercel vous donne les **nameservers**
4. Aller sur votre registrar DNS (OVH, Namecheap, etc.)
5. Remplacer les nameservers par ceux de Vercel

**Attendre 24-48h pour propagation DNS**

✅ Domaine configuré

## 🔧 Configuration Rapide

**Avant de pousser :**

Éditer `src/main.js` (lignes 5-11) :

```javascript
const CONFIG = {
  googleFormUrl: 'https://docs.google.com/forms/...YOUR_ID...',
  instagramUrl: 'https://instagram.com/beeclou',
  contactEmail: 'hello@beeclou.com',
  contactForm: 'https://docs.google.com/forms/...YOUR_TESTER_ID...'
}
```

Puis :

```bash
git add src/main.js
git commit -m "config: Set production URLs"
git push origin claude/beeclou-v1-site-57bFG
```

Vercel rebuilde automatiquement → Site mis à jour!

## 📋 Checklist (copy-paste)

```
☐ npm install OK
☐ npm run build OK (no errors)
☐ Code sur GitHub
☐ Vercel project créé et déployé
☐ URLs dans src/main.js configurées
☐ Site live sur beeclou.vercel.app
☐ (BONUS) Domaine beeclou.fr configuré
```

## 🚀 C'est tout!

À partir de maintenant :

```bash
# Modifier le code
vim index.html       # ou nimporte quel fichier

# Commit
git add .
git commit -m "Update: cool new feature"

# Push
git push origin claude/beeclou-v1-site-57bFG

# ✅ Vercel rebuilde automatiquement
# ✅ Site updated en 2 minutes
# 🎉 Nouveau site live!
```

## 📚 Pour plus de détails

- **Déploiement complet** → `DEPLOYMENT.md`
- **Personnalisation** → `CUSTOMIZATION.md`
- **Structure** → `README.md`

---

**Questions?** Voir les guides ou contacter support Vercel.

*Made with 🐝*
