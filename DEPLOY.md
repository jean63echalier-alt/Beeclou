# 🚀 BEECLOU - GUIDE DE DÉPLOIEMENT

## 📱 DÉPLOYER LA DÉMO STREAMLIT SUR STREAMLIT CLOUD

### Étape 1: Prérequis
- ✅ Compte GitHub (gratuit)
- ✅ Compte Streamlit (gratuit)
- ✅ Repo poussé sur GitHub

### Étape 2: Accéder à Streamlit Cloud

1. Allez sur **https://share.streamlit.io**
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur **"New app"**

### Étape 3: Configurer le déploiement

```
Repository: jean63echalier-alt/Beeclou
Branch: claude/beeclou-mvp-setup-8QYrp
Main file path: streamlit_demo.py
App URL: beeclou-demo.streamlit.app (auto-généré)
```

### Étape 4: Déployer!

Streamlit Cloud va:
- Clone le repo
- Installer `requirements.txt`
- Lancer `streamlit_demo.py`
- Générer une URL publique

---

## 🌐 DÉPLOYER LE SITE NEXT.JS SUR VERCEL

### Étape 1: Connecter Vercel

1. Allez sur **https://vercel.com**
2. Connectez-vous avec GitHub
3. Cliquez **"Import Project"**

### Étape 2: Configurer

```
Git Repository: jean63echalier-alt/Beeclou
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Start Command: npm start
```

### Étape 3: Ajouter variables d'env (à faire plus tard)

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Étape 4: Déployer!

Vercel va:
- Déployer sur un domaine `*.vercel.app`
- Auto-redéployer à chaque push sur `main`
- SSL/HTTPS automatique

---

## 📊 RÉSUMÉ DÉPLOIEMENT

| Plateforme | Type | URL | Gratuit |
|-----------|------|-----|---------|
| **Streamlit Cloud** | Démo iOS | `beeclou-demo.streamlit.app` | ✅ |
| **Vercel** | Site web | `beeclou.vercel.app` | ✅ |
| **Supabase** | Backend DB | Soon... | ✅ |

---

## ✨ LIEN PUBLIC (une fois déployé)

### 📱 Démo Streamlit
```
https://beeclou-demo.streamlit.app
```

### 🌐 Site Web
```
https://beeclou.vercel.app
```

---

## 🔧 TROUBLESHOOTING

### Streamlit Cloud
**Erreur**: `streamlit_demo.py not found`
- Solution: Vérifiez que le fichier est à la racine du repo

**Erreur**: `ModuleNotFoundError: No module named 'streamlit'`
- Solution: Vérifiez `requirements.txt` est à la racine

### Vercel
**Erreur**: `Build failed`
- Solution: Vérifiez `npm run build` fonctionne localement

**Erreur**: `Missing environment variables`
- Solution: Ajoutez dans Vercel Dashboard → Settings → Environment Variables

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ Créer compte Streamlit Cloud
2. ✅ Créer compte Vercel
3. ✅ Déployer démo Streamlit
4. ✅ Déployer site Next.js
5. ✅ Configurer Supabase backend
6. ✅ Connecter domaine personnalisé

---

**Prêt à partager le Beeclou MVP avec le monde! 🐝🚀**
